package com.francids.escruta.backend.dtos.notebook;

import com.francids.escruta.backend.dtos.BasicUser;
import com.francids.escruta.backend.dtos.NoteDto;
import com.francids.escruta.backend.dtos.SourceDto;
import com.francids.escruta.backend.entities.Note;
import com.francids.escruta.backend.entities.Notebook;
import com.francids.escruta.backend.entities.Source;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Getter
@Setter
public class NotebookWithDetailsDTO {
    private UUID id;
    private BasicUser user;
    private String icon;
    private String title;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private List<NoteDto> notes;
    private List<SourceDto> sources;

    public NotebookWithDetailsDTO(Notebook notebook, List<Note> notes, List<Source> sources) {
        this.id = notebook.getId();
        this.user = new BasicUser(notebook.getUser());
        this.icon = notebook.getIcon();
        this.title = notebook.getTitle();
        this.createdAt = notebook.getCreatedAt();
        this.updatedAt = notebook.getUpdatedAt();
        this.notes = notes.stream().map(NoteDto::new).collect(Collectors.toList());
        this.sources = sources.stream().map(SourceDto::new).collect(Collectors.toList());
    }
}
