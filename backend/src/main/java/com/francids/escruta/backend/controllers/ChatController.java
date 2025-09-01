package com.francids.escruta.backend.controllers;

import com.francids.escruta.backend.dtos.ChatRequest;
import com.francids.escruta.backend.repositories.NotebookRepository;
import com.francids.escruta.backend.services.SourceService;
import com.francids.escruta.backend.services.RetrievalService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.SystemPromptTemplate;
import org.springframework.ai.document.Document;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("notebooks/{notebookId}")
@RequiredArgsConstructor
class ChatController {
    private static final String UNIFIED_SYSTEM_MESSAGE = """
            You are a helpful AI assistant and expert summarizer. Your primary goal is to provide accurate and relevant information based on the context provided. Follow these instructions carefully:
            1. You will be given a set of sources between "--- BEGINNING OF SOURCES ---" and "--- END OF SOURCES ---" markers.
            2. Use only the information from these provided sources to answer questions or generate summaries.
            3. Never use any external knowledge or information you might have. Your responses must be based solely on the provided text.
            4. When you use information from a source, you must cite it by mentioning the source title (e.g., "According to [title]").
            5. If the provided sources do not contain enough information to answer a specific question, you must clearly state that and explain what information is missing.
            6. If you are asked to perform a task that is not related to the provided sources, politely decline and remind the user that you can only work with the given information.
            7. When asked to summarize, create a concise summary of the text provided. The summary should be a single paragraph of 2-3 sentences.
            8. IMPORTANT: Do not include any thinking process or reasoning in your response. Do not use <think> tags. Provide only the final answer or summary.
            9. Always work with the sources provided to you in this conversation. Sources are available unless explicitly stated otherwise.
            10. Format your responses using only basic markdown: **bold**, *italic*, `inline code`, ```code blocks```, and simple lists (- or 1.). You may use bold and italics to highlight important information, depending on the question. Do not use headers, tables, links, or other complex markdown elements.
        """;

    private static final String RAG_PROMPT_TEMPLATE = """
            {system}
            
            Here are the sources for our conversation:
            --- BEGINNING OF SOURCES ---
            {documents}
            --- END OF SOURCES ---
            
            Please use the sources above to answer the user's question.
            """;

    private final SourceService sourceService;
    private final RetrievalService retrievalService;
    private final ChatModel chatModel;
    private final NotebookRepository notebookRepository;

    private UUID parseUUID(String id) {
        try {
            return UUID.fromString(id);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid UUID: " + id);
        }
    }

    private String toSourceTemplate(Document source) {
        String title = (String) source.getMetadata().get("title");
        String link = (String) source.getMetadata().get("link");
        String content = source.getFormattedContent();

        return "### SOURCE: " + title + " ###\n" + "Title: " + title + "\n" + "URL: " + link + "\n" + "Content: " + content + "\n" + "### END SOURCE: " + title + " ###\n\n";
    }

    private String sourcesContent(List<Document> sources) {
        if (sources == null || sources.isEmpty()) {
            return "No sources are available for this request.";
        }
        return sources.stream().map(source -> source != null ? toSourceTemplate(source) : "").filter(content -> !content.isEmpty()).collect(Collectors.joining("\n\n"));
    }

    @PostMapping("summary")
    ResponseEntity<String> generateSummary(@PathVariable String notebookId) {
        try {
            UUID notebookUuid = parseUUID(notebookId);
            var sources = sourceService.getSourcesWithContent(notebookUuid);

            if (sources == null || sources.isEmpty()) {
                return ResponseEntity.ok("No sources available for summary.");
            }

            String sourcesText = sources.stream().map(source -> source != null ? toSourceTemplate(new Document(source.content(), Map.of("title", source.title(), "link", source.link()))) : "").filter(content -> !content.isEmpty()).collect(Collectors.joining("\n\n"));

            if (sourcesText.trim().isEmpty()) {
                return ResponseEntity.ok("The sources are empty, cannot generate a summary.");
            }

            Prompt prompt = getSummaryPrompt(sourcesText);
            ChatResponse chatResponse = chatModel.call(prompt);
            String summary = chatResponse.getResult().getOutput().getText();

            if (summary == null || summary.trim().isEmpty()) {
                return ResponseEntity.ok("Could not generate a summary with the available sources.");
            }

            notebookRepository.updateSummary(notebookUuid, summary);

            return ResponseEntity.ok(summary);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("summary")
    ResponseEntity<String> getSummary(@PathVariable String notebookId) {
        try {
            UUID notebookUuid = parseUUID(notebookId);
            var notebook = notebookRepository.findById(notebookUuid).orElse(null);

            if (notebook == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(notebook.getSummary());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    private static Prompt getSummaryPrompt(String sourcesText) {
        String systemMessageText = UNIFIED_SYSTEM_MESSAGE + """
                Here are the sources you must summarize:
                --- BEGINNING OF SOURCES ---
                """ + sourcesText + """
                --- END OF SOURCES ---
                
                Generate a short summary based on the sources provided above.""";

        String userMessage = """
                Generate a short summary of all the sources provided above.
                The summary should be 1-2 sentences that capture the essential information from all sources.
                Be very concise. Start your response directly with the summary.""";

        return new Prompt(List.of(new SystemMessage(systemMessageText), new UserMessage(userMessage)));
    }

    @PostMapping("chat")
    ResponseEntity<String> generation(@PathVariable String notebookId, @RequestBody ChatRequest request) {
        try {
            UUID notebookUuid = parseUUID(notebookId);
            List<Document> relevantDocuments = retrievalService.retrieveRelevantDocuments(notebookUuid, request.getUserInput());

            if (relevantDocuments == null || relevantDocuments.isEmpty()) {
                return ResponseEntity.ok("No relevant sources found in this notebook to answer your question.");
            }

            String sourcesText = sourcesContent(relevantDocuments);

            var systemPromptTemplate = new SystemPromptTemplate(RAG_PROMPT_TEMPLATE);
            var systemMessage = systemPromptTemplate.createMessage(Map.of("system", UNIFIED_SYSTEM_MESSAGE, "documents", sourcesText));
            UserMessage userMessage = new UserMessage(request.getUserInput());

            var prompt = new Prompt(List.of(systemMessage, userMessage));
            var generation = chatModel.call(prompt).getResult();

            String response = generation.getOutput().getText();

            if (response == null || response.trim().isEmpty()) {
                return ResponseEntity.ok("Could not generate a response based on the available sources.");
            }

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.ok("Could not generate a response based on the available sources.");
        }
    }
}