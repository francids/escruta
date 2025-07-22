package com.francids.escruta.backend.services;

import com.francids.escruta.backend.entities.Source;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.ai.vectorstore.filter.Filter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RetrievalService {
    private final VectorStore vectorStore;

    public List<Document> retrieveRelevantDocuments(UUID notebookId, String userQuery) {
        Filter.Expression filter = new Filter.Expression(
                Filter.ExpressionType.EQ,
                new Filter.Key("notebookId"),
                new Filter.Value(notebookId.toString())
        );

        SearchRequest searchRequest = SearchRequest
                .builder()
                .query(userQuery)
                .topK(4)
                .filterExpression(filter)
                .build();

        return vectorStore.similaritySearch(searchRequest);
    }

    public void deleteIndexedSource(UUID sourceId) {
        try {
            Filter.Expression filterExpression = new Filter.Expression(
                    Filter.ExpressionType.EQ,
                    new Filter.Key("sourceId"),
                    new Filter.Value(sourceId.toString())
            );
            vectorStore.delete(filterExpression);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete indexed source: " + e.getMessage(), e);
        }
    }

    public void indexSourceChunk(UUID notebookId, Source source, Document chunk, int chunkIndex) {
        try {
            Document document = new Document(
                    UUID.randomUUID().toString(),
                    chunk.getFormattedContent(),
                    Map.of(
                            "sourceId", source.getId().toString(),
                            "notebookId", notebookId.toString(),
                            "title", source.getTitle() != null ? source.getTitle() : "Untitled",
                            "link", source.getLink() != null ? source.getLink() : "",
                            "chunkIndex", String.valueOf(chunkIndex)
                    )
            );
            vectorStore.add(List.of(document));
        } catch (Exception e) {
            throw new RuntimeException("Failed to index source chunk: " + e.getMessage(), e);
        }
    }
}
