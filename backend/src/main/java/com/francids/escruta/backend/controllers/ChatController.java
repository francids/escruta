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
    private final SourceService sourceService;
    private final ChatClient chatClient;

    public ChatController(
            ChatClient.Builder chatClientBuilder,
            SourceService sourceService
    ) {
        this.chatClient = chatClientBuilder.build();
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
        String title = source.title() != null ? source.title().replace("{", "\\{").replace("}", "\\}") : "";
        String link = source.link() != null ? source.link().replace("{", "\\{").replace("}", "\\}") : "";
        String content = source.content() != null ? source.content().replace("{", "\\{").replace("}", "\\}") : "";

        return "=== SOURCE " + title + " ===" + "\n" +
                "Title: " + title + "\n" +
                "URL: " + link + "\n" +
                "Content: " + content + "\n" +
                "=== END OF THE SOURCE " + title + " ===" + "\n\n";
    }

    private String sourcesContent(List<SourceWithContentDTO> sources) {
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
            if (sources == null || sources.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            String systemMessage = "You have access to the following sources of information:\n\n" + sourcesContent(sources);

            String summary = this.chatClient.prompt()
                    .system(systemMessage)
                    .user("Generate a short and concise summary of the sources available in this notebook.")
                    .call()
                    .content();

            if (summary == null || summary.trim().isEmpty()) {
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

            if (sources == null || sources.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            String systemMessage = "You have access to the following sources of information:\n\n" + sourcesContent(sources);

            String response = this.chatClient.prompt()
                    .system(systemMessage)
                    .user("User question: " + request.getUserInput() +
                            "\n\nRemember: Only use the provided sources and always cite the specific source.")
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
