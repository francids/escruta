package com.francids.escruta.backend.dtos.notebook;

import com.francids.escruta.backend.dtos.BasicUser;
import com.francids.escruta.backend.dtos.NoteDto;
import com.francids.escruta.backend.dtos.SourceDto;
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
        List<NoteDto> notes,
        List<SourceDto> sources
) {
    public NotebookWithDetailsDTO(Notebook notebook, List<Note> notes, List<Source> sources) {
        this(
                notebook.getId(),
                new BasicUser(notebook.getUser()),
                notebook.getIcon(),
                notebook.getTitle(),
                notebook.getCreatedAt(),
                notebook.getUpdatedAt(),
                notes.stream().map(NoteDto::new).collect(Collectors.toList()),
                sources.stream().map(SourceDto::new).collect(Collectors.toList())
        );
    }
}
