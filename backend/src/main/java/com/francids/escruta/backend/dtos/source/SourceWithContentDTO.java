package com.francids.escruta.backend.dtos.source;

import com.francids.escruta.backend.entities.Source;

import java.sql.Timestamp;
import java.util.UUID;

public record SourceWithContentDTO(
        UUID id,
        UUID notebookId,
        String icon,
        String title,
        String content,
        String summary,
        String link,
        Timestamp createdAt,
        Timestamp updatedAt
) {
    public SourceWithContentDTO(Source source) {
        this(
                source.getId(),
                source.getNotebook().getId(),
                source.getIcon(),
                source.getTitle(),
                source.getContent(),
                source.getSummary(),
                source.getLink(),
                source.getCreatedAt(),
                source.getUpdatedAt()
        );
    }
}
