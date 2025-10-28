package com.francids.escruta.backend.dtos.source;

import com.francids.escruta.backend.entities.Source;

import java.sql.Timestamp;
import java.util.UUID;

public record SourceResponseDTO(
        UUID id,
        UUID notebookId,
        String icon,
        String title,
        boolean isConvertedByAi,
        String link,
        Timestamp createdAt,
        Timestamp updatedAt
) {
    public SourceResponseDTO(Source source) {
        this(
                source.getId(),
                source.getNotebook()
                        .getId(),
                source.getIcon(),
                source.getTitle(),
                source.isConvertedByAi(),
                source.getLink(),
                source.getCreatedAt(),
                source.getUpdatedAt()
        );
    }
}
