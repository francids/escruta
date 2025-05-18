package com.francids.escruta.backend.dtos.notebook;

import com.francids.escruta.backend.dtos.BasicUser;
import com.francids.escruta.backend.dtos.note.NoteResponseDTO;
import com.francids.escruta.backend.dtos.source.SourceResponseDTO;
import com.francids.escruta.backend.entities.Note;
import com.francids.escruta.backend.entities.Notebook;
import com.francids.escruta.backend.entities.Source;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public record NotebookWithDetailsDTO(
        UUID id,
        BasicUser user,
        String icon,
        String title,
        Timestamp createdAt,
        Timestamp updatedAt,
        List<NoteResponseDTO> notes,
        List<SourceResponseDTO> sources
) {
    public NotebookWithDetailsDTO(Notebook notebook, List<Note> notes, List<Source> sources) {
        this(
                notebook.getId(),
                new BasicUser(notebook.getUser()),
                notebook.getIcon(),
                notebook.getTitle(),
                notebook.getCreatedAt(),
                notebook.getUpdatedAt(),
                notes.stream().map(NoteResponseDTO::new).collect(Collectors.toList()),
                sources.stream().map(SourceResponseDTO::new).collect(Collectors.toList())
        );
    }
}
