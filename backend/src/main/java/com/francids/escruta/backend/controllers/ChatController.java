package com.francids.escruta.backend.controllers;

import com.francids.escruta.backend.dtos.ChatRequest;
import com.francids.escruta.backend.dtos.ChatReplyMessage;
import com.francids.escruta.backend.dtos.SummaryResponse;
import com.francids.escruta.backend.repositories.NotebookRepository;
import com.francids.escruta.backend.services.SourceService;
import com.francids.escruta.backend.services.RetrievalService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.SystemPromptTemplate;
import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.ai.document.Document;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("notebooks/{notebookId}")
@RequiredArgsConstructor
class ChatController {
    private static final String UNIFIED_SYSTEM_MESSAGE = """
            You are a helpful AI assistant. Answer questions using ONLY the provided sources.
            
            RULES:
            1. Provide clear, comprehensive answers based on the available sources
            2. Cite all sources used in your response by including their sourceId in the citedSources array
            3. Write in a natural, conversational tone
            4. Use simple formatting only: **bold**, *italic*, `code`
            5. Focus on directly answering the user's question with the information from the sources
            6. If multiple sources provide information on the same topic, synthesize the information coherently
            7. IMPORTANT: Your response must be in the exact JSON format specified below
            """;

    private static final String RAG_PROMPT_TEMPLATE = """
            {system}
            
            --- BEGINNING OF SOURCES ---
            {documents}
            --- END OF SOURCES ---
            
            {format}
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
        String sourceId = (String) source.getMetadata().get("sourceId");
        String content = source.getFormattedContent();

        return "SOURCE: " + title + "\n" +
                "SourceId: " + sourceId + "\n" +
                "Title: " + title + "\n" +
                "URL: " + link + "\n" +
                "Content: " + content + "\n" +
                "END SOURCE\n\n";
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
                return ResponseEntity.ok("No sources are available in this notebook to generate a summary.");
            }

            String sourcesText = sources.stream()
                .map(source -> source != null ? toSourceTemplate(new Document(source.content(), 
                    Map.of("title", source.title(), "link", source.link(), "sourceId", source.id().toString()))) : "")
                .filter(content -> !content.isEmpty())
                .collect(Collectors.joining("\n\n"));

            if (sourcesText.trim().isEmpty()) {
                return ResponseEntity.ok("The sources in this notebook are empty and cannot be summarized.");
            }

            BeanOutputConverter<SummaryResponse> beanOutputConverter = new BeanOutputConverter<>(SummaryResponse.class);
            String formatInstructions = beanOutputConverter.getFormat();

            Prompt prompt = getSummaryPrompt(sourcesText, formatInstructions);
            org.springframework.ai.chat.model.ChatResponse chatResponse = chatModel.call(prompt);
            String response = chatResponse.getResult().getOutput().getText();

            if (response == null || response.trim().isEmpty()) {
                return ResponseEntity.ok("Unable to generate a summary from the available sources.");
            }

            SummaryResponse summaryResponse = beanOutputConverter.convert(response);
            assert summaryResponse != null;
            String summary = summaryResponse.summary();

            if (summary == null || summary.trim().isEmpty()) {
                return ResponseEntity.ok("Unable to generate a summary from the available sources.");
            }

            notebookRepository.updateSummary(notebookUuid, summary);

            return ResponseEntity.ok(summary);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid notebook ID format");
        } catch (Exception e) {
            System.out.println("Error during summary generation: " + e.getMessage());
            return ResponseEntity.status(500).body("An error occurred while generating the summary. Please try again.");
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

            String summary = notebook.getSummary();
            if (summary == null || summary.trim().isEmpty()) {
                return ResponseEntity.ok("");
            }

            return ResponseEntity.ok(summary);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid notebook ID format");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while retrieving the summary. Please try again.");
        }
    }

    private static Prompt getSummaryPrompt(String sourcesText, String formatInstructions) {
        String systemMessageText = UNIFIED_SYSTEM_MESSAGE + "\n\n" +
                "--- BEGINNING OF SOURCES ---\n" +
                sourcesText +
                "--- END OF SOURCES ---\n\n" +
                formatInstructions;

        String userMessage = "Summarize the key information in 2-3 sentences. " +
                "Write a clear, comprehensive summary without any citations or references. " +
                "Return the response in the exact JSON format specified.";

        return new Prompt(List.of(new SystemMessage(systemMessageText), new UserMessage(userMessage)));
    }

    @PostMapping("chat")
    ResponseEntity<ChatReplyMessage> generation(@PathVariable String notebookId, @RequestBody ChatRequest request) {
        try {
            UUID notebookUuid = parseUUID(notebookId);

            if (request.getUserInput() == null || request.getUserInput().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    new ChatReplyMessage("User input cannot be empty", List.of())
                );
            }

            List<Document> relevantDocuments = retrievalService.retrieveRelevantDocuments(notebookUuid, request.getUserInput());

            if (relevantDocuments == null || relevantDocuments.isEmpty()) {
                return ResponseEntity.ok(
                    new ChatReplyMessage("I don't have any relevant sources in this notebook to answer your question. Please try rephrasing your question or add more sources to the notebook.", List.of())
                );
            }

            String sourcesText = sourcesContent(relevantDocuments);

            if (sourcesText.trim().isEmpty() || sourcesText.equals("No sources are available for this request.")) {
                return ResponseEntity.ok(
                    new ChatReplyMessage("The available sources don't contain enough information to answer your question. Please try a different question or add more relevant sources.", List.of())
                );
            }

            BeanOutputConverter<ChatReplyMessage> beanOutputConverter = new BeanOutputConverter<>(ChatReplyMessage.class);
            String formatInstructions = beanOutputConverter.getFormat();

            var systemPromptTemplate = new SystemPromptTemplate(RAG_PROMPT_TEMPLATE);
            var systemMessage = systemPromptTemplate.createMessage(Map.of(
                "system", UNIFIED_SYSTEM_MESSAGE, 
                "documents", sourcesText,
                "format", formatInstructions
            ));
            UserMessage userMessage = new UserMessage(request.getUserInput());

            var prompt = new Prompt(List.of(systemMessage, userMessage));
            var generation = chatModel.call(prompt).getResult();

            String response = generation.getOutput().getText();

            if (response == null || response.trim().isEmpty()) {
                return ResponseEntity.ok(
                    new ChatReplyMessage("I couldn't generate a response based on the available sources. Please try rephrasing your question.", List.of())
                );
            }

            ChatReplyMessage chatResponse = beanOutputConverter.convert(response);

            assert chatResponse != null;
            List<ChatReplyMessage.CitedSource> validatedSources = chatResponse.citedSources().stream()
                .filter(citedSource -> relevantDocuments.stream()
                    .anyMatch(doc -> citedSource.id().equals(UUID.fromString((String) doc.getMetadata().get("sourceId")))))
                .collect(Collectors.toList());
            
            ChatReplyMessage finalResponse = new ChatReplyMessage(chatResponse.content(), validatedSources);
            
            return ResponseEntity.ok(finalResponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                new ChatReplyMessage("Invalid notebook ID format", List.of())
            );
        } catch (Exception e) {
            System.out.println("Error during chat generation: " + e.getMessage());
            return ResponseEntity.status(500).body(
                new ChatReplyMessage("An error occurred while processing your request. Please try again.", List.of())
            );
        }
    }
}