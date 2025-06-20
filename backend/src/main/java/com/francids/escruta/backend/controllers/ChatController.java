package com.francids.escruta.backend.controllers;

import com.francids.escruta.backend.dtos.ChatRequest;
import com.francids.escruta.backend.dtos.source.SourceWithContentDTO;
import com.francids.escruta.backend.services.SourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("notebooks/{notebookId}/chat")
@RequiredArgsConstructor
class ChatController {
    private final ChatClient chatClient;
    private final SourceService sourceService;

    private UUID parseUUID(String id) {
        try {
            return UUID.fromString(id);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid UUID: " + id);
        }
    }

    private String sourceTemplate(SourceWithContentDTO source) {
        return "=== SOURCE " + source.title() + " ===" + "\n" +
                "Title: " + source.title() + "\n" +
                "URL: " + source.link() + "\n" +
                "Content: " + source.content() + "\n" +
                "=== END OF THE SOURCE " + source.title() + " ===" + "\n\n";
    }

    private String sourcesContent(List<SourceWithContentDTO> sources) {
        return sources
                .stream()
                .map(source -> source != null ? sourceTemplate(source) : "")
                .filter(content -> !content.isEmpty())
                .collect(Collectors.joining("\n\n"));
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

            String response = this.chatClient.prompt()
                    .system(sp -> sp.param("sources", sourcesContent(sources)))
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
