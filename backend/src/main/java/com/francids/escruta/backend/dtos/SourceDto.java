package com.francids.escruta.backend.dtos;

import com.francids.escruta.backend.entities.Source;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
public class SourceDto {
    private UUID id;
    private UUID notebookId;
    private String icon;
    private String title;
    private String content;
    private String link;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public SourceDto(Source source) {
        this.id = source.getId();
        this.notebookId = source.getNotebook().getId();
        this.icon = source.getIcon();
        this.title = source.getTitle();
        this.content = source.getContent();
        this.link = source.getLink();
        this.createdAt = source.getCreatedAt();
        this.updatedAt = source.getUpdatedAt();
    }
}
