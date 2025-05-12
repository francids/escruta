package com.francids.escruta.backend.dtos;

import com.francids.escruta.backend.entities.Note;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
public class NoteDto {
    private UUID id;
    private UUID notebookId;
    private UUID sourceId;
    private String icon;
    private String title;
    private String content;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public NoteDto(Note note) {
        this.id = note.getId();
        this.notebookId = note.getNotebook().getId();
        this.sourceId = note.getSource() != null ? note.getSource().getId() : null;
        this.icon = note.getIcon();
        this.title = note.getTitle();
        this.content = note.getContent();
        this.createdAt = note.getCreatedAt();
        this.updatedAt = note.getUpdatedAt();
    }
}
