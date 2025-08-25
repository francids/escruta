package com.francids.escruta.backend.services;

import org.springframework.ai.document.Document;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.francids.escruta.backend.entities.Source;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AsyncVectorIndexingService {
    private final RetrievalService retrievalService;
    
    @Async
    public void indexSourceInVectorStore(UUID notebookId, Source source, String content) {
        try {
            var textSplitter = new TokenTextSplitter(500, 100, 5, 10000, true);
            List<Document> chunks = textSplitter.apply(List.of(new Document(content)));
            for (int i = 0; i < chunks.size(); i++) {
                try {
                    retrievalService.indexSourceChunk(notebookId, source, chunks.get(i), i);
                } catch (Exception e) {
                    // ...
                }
            }
        } catch (Exception e) {
            // ...
        }
    }
}
