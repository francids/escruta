package com.francids.escruta.backend.dtos.note;

import com.francids.escruta.backend.entities.Note;

import java.sql.Timestamp;
import java.util.UUID;

public record NoteWithContentDTO(
        UUID id,
        UUID notebookId,
        UUID sourceId,
        String icon,
        String title,
        String content,
        Timestamp createdAt,
        Timestamp updatedAt
) {
    public NoteWithContentDTO(Note note) {
        this(
                note.getId(),
                note.getNotebook().getId(),
                note.getSource() != null ? note.getSource().getId() : null,
                note.getIcon(),
                note.getTitle(),
                note.getContent(),
                note.getCreatedAt(),
                note.getUpdatedAt()
        );
    }
}
