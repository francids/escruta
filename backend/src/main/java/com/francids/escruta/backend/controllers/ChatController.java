package com.francids.escruta.backend.controllers;

import com.francids.escruta.backend.dtos.ChatRequest;
import com.francids.escruta.backend.dtos.source.SourceWithContentDTO;
import com.francids.escruta.backend.services.SourceService;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("notebooks/{notebookId}/chat")
class ChatController {
    private static final String UNIFIED_SYSTEM_MESSAGE = """
            You are a helpful AI assistant and expert summarizer. Your primary goal is to provide accurate and relevant information based on the context provided. Follow these instructions carefully:
            1. You will be given a set of sources. Use only the information from these sources to answer questions or generate summaries.
            2. Never use any external knowledge or information you might have. Your responses must be based solely on the provided text.
            3. When you use information from a source, you must cite it by mentioning the source title (e.g., "Source: [title]").
            4. If the provided sources do not contain enough information to answer a question, you must clearly state that and explain why. Do not try to guess or infer answers.
            5. If you are asked to perform a task that is not related to the provided sources, politely decline and remind the user that you can only work with the given information.
            6. If no sources are provided, you must state that you cannot answer the question without them.
            7. When asked to summarize, create a concise summary of the text provided. The summary should be a single paragraph of 2-3 sentences.
            8. IMPORTANT: Do not include any thinking process or reasoning in your response. Do not use <think> tags. Provide only the final answer or summary.""";

    private final SourceService sourceService;
    private final ChatClient chatClient;

    public ChatController(
            ChatClient.Builder chatClientBuilder,
            SourceService sourceService
    ) {
        this.chatClient = chatClientBuilder
                .build();
        this.sourceService = sourceService;
    }

    private UUID parseUUID(String id) {
        try {
            return UUID.fromString(id);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid UUID: " + id);
        }
    }

    private String sourceTemplate(SourceWithContentDTO source) {
        String title = source.title() != null ? source.title() : "";
        String link = source.link() != null ? source.link() : "";
        String content = source.content() != null ? source.content() : "";

        return "### SOURCE: " + title + " ###\n" +
                "Title: " + title + "\n" +
                "URL: " + link + "\n" +
                "Content: " + content + "\n" +
                "### END SOURCE: " + title + " ###\n\n";
    }

    private String sourcesContent(List<SourceWithContentDTO> sources) {
        if (sources == null || sources.isEmpty()) {
            return "No sources provided.";
        }
        return sources
                .stream()
                .map(source -> source != null ? sourceTemplate(source) : "")
                .filter(content -> !content.isEmpty())
                .collect(Collectors.joining("\n\n"));
    }

    @GetMapping("summary")
    ResponseEntity<String> summary(@PathVariable String notebookId) {
        try {
            UUID notebookUuid = parseUUID(notebookId);
            var sources = sourceService.getSourcesWithContent(notebookUuid);

            String sourcesText = sourcesContent(sources);

            String userMessage = "Please generate a summary of the following sources:\n\n" +
                    "--- BEGINNING OF SOURCES ---\n" +
                    sourcesText +
                    "--- END OF SOURCES ---\n\n" +
                    "Task: Generate a single paragraph summary (2-3 sentences) of the key information from the sources above. " +
                    "Be extremely concise and direct. Focus only on the most essential points. " +
                    "Do not add any extra information or explanations.";

            String summary = chatClient
                    .prompt()
                    .system(UNIFIED_SYSTEM_MESSAGE)
                    .user(userMessage)
                    .call()
                    .content();

            if (summary == null || summary.trim().isEmpty() || summary.toLowerCase().contains("provide me with the sources")) {
                return ResponseEntity.ok("I can't summarize the sources available in this notebook.");
            }

            return ResponseEntity.ok(summary);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.ok("I can't summarize the sources available in this notebook.");
        }
    }

    @PostMapping
    ResponseEntity<String> generation(
            @PathVariable String notebookId,
            @RequestBody ChatRequest request
    ) {
        try {
            UUID notebookUuid = parseUUID(notebookId);
            var sources = sourceService.getSourcesWithContent(notebookUuid);
            String sourcesText = sourcesContent(sources);

            String systemMessageWithSources = UNIFIED_SYSTEM_MESSAGE + "\n\n" +
                    "Here are the sources for our conversation:\n" +
                    "\n" +
                    "--- BEGINNING OF SOURCES ---\n" +
                    "\n" +
                    sourcesText +
                    "\n" +
                    "--- END OF SOURCES ---\n";

            String userMessage = "Using the sources provided in the system context, please answer the following question: " + request.getUserInput();

            String response = this.chatClient.prompt()
                    .system(systemMessageWithSources)
                    .user(userMessage)
                    .call()
                    .content();

            if (response == null || response.trim().isEmpty()) {
                return ResponseEntity.ok("I can't answer that question with the sources available in this notebook.");
            }

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.ok("I can't answer that question with the sources available in this notebook.");
        }
    }
}
