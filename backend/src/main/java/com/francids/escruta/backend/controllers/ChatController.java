package com.francids.escruta.backend.controllers;

import com.francids.escruta.backend.dtos.ChatRequest;
import com.francids.escruta.backend.dtos.ChatReplyMessage;
import com.francids.escruta.backend.dtos.ExampleQuestions;
import com.francids.escruta.backend.dtos.SummaryResponse;
import com.francids.escruta.backend.repositories.NotebookRepository;
import com.francids.escruta.backend.services.SourceService;
import com.francids.escruta.backend.services.RetrievalService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.document.Document;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("notebooks/{notebookId}")
@RequiredArgsConstructor
class ChatController {
    private static final String UNIFIED_SYSTEM_MESSAGE = """
            You are a helpful AI assistant. Answer questions using ONLY the provided sources.
            
            RULES:
            1. Provide clear, comprehensive answers based on the available sources
            2. Write in a natural, conversational tone
            3. Use simple formatting only: **bold**, *italic*, `code`
            4. Focus on directly answering the user's question with the information from the sources
            """;

    private final SourceService sourceService;
    private final RetrievalService retrievalService;
    private final ChatModel chatModel;
    private final NotebookRepository notebookRepository;

    @PostMapping("summary")
    ResponseEntity<String> generateSummary(@PathVariable UUID notebookId) {
        try {
            if (sourceService.hasSources(notebookId)) {
                SummaryResponse summary = ChatClient.create(chatModel)
                        .prompt()
                        .advisors(retrievalService.getQuestionAnswerAdvisor(notebookId))
                        .system(UNIFIED_SYSTEM_MESSAGE)
                        .user("I want you to summarize the key information in 2 or 3 sentences, and I want that summary to be clear, complete, and free of citations or references.")
                        .call()
                        .entity(SummaryResponse.class);

                assert summary != null;
                notebookRepository.updateSummary(notebookId, summary.summary());
                return ResponseEntity.ok(summary.summary());
            } else {
                return ResponseEntity.badRequest()
                        .body("No sources are available in this notebook to generate a summary.");
            }
        } catch (Exception e) {
            System.out.println("Error during summary generation: " + e.getMessage());
            return ResponseEntity.internalServerError()
                    .body("An error occurred while generating the summary. Please try again.");
        }
    }

    @GetMapping("summary")
    ResponseEntity<String> getSummary(@PathVariable UUID notebookId) {
        try {
            var notebook = notebookRepository.findById(notebookId)
                    .orElse(null);

            if (notebook == null) {
                return ResponseEntity.notFound()
                        .build();
            }

            String summary = notebook.getSummary();
            if (summary == null || summary.trim()
                    .isEmpty()) {
                return ResponseEntity.ok("");
            }

            return ResponseEntity.ok(summary);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("An error occurred while retrieving the summary. Please try again.");
        }
    }

    @GetMapping("example-questions")
    public ResponseEntity<?> getExampleQuestions(@PathVariable UUID notebookId) {
        try {
            if (sourceService.hasSources(notebookId)) {
                ExampleQuestions exampleQuestions = ChatClient.create(chatModel)
                        .prompt()
                        .advisors(retrievalService.getQuestionAnswerAdvisor(notebookId))
                        .user("Based on the provided context, generate three simple, short, and concise questions that can be answered using the sources.")
                        .call()
                        .entity(ExampleQuestions.class);

                return ResponseEntity.ok(exampleQuestions);
            } else {
                return ResponseEntity.badRequest()
                        .body("No sources are available in this notebook to generate a summary.");
            }
        } catch (Exception e) {
            System.out.println("Error during example questions generation: " + e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(List.of());
        }
    }

    @PostMapping("chat")
    ResponseEntity<ChatReplyMessage> generation(
            @PathVariable UUID notebookId,
            @Valid @RequestBody ChatRequest request
    ) {
        try {
            var chatResponse = ChatClient.create(chatModel)
                    .prompt()
                    .advisors(retrievalService.getQuestionAnswerAdvisor(notebookId))
                    .system(UNIFIED_SYSTEM_MESSAGE)
                    .user(request.getUserInput())
                    .call()
                    .chatResponse();

            assert chatResponse != null;
            List<Document> documents = chatResponse.getMetadata()
                    .getOrDefault(QuestionAnswerAdvisor.RETRIEVED_DOCUMENTS, List.of());

            List<ChatReplyMessage.CitedSource> citedSources = documents.stream()
                    .map(doc -> new ChatReplyMessage.CitedSource(
                            UUID.fromString(doc.getMetadata()
                                    .get("sourceId")
                                    .toString()),
                            doc.getMetadata()
                                    .get("title")
                                    .toString()
                    ))
                    .distinct()
                    .toList();

            return ResponseEntity.ok(new ChatReplyMessage(
                    chatResponse.getResult()
                            .getOutput()
                            .getText(), citedSources
            ));
        } catch (Exception e) {
            System.out.println("Error during chat generation: " + e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(new ChatReplyMessage(
                            "An error occurred while processing your request. Please try again.",
                            List.of()
                    ));
        }
    }
}