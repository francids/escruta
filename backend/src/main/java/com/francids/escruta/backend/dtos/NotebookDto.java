package com.francids.escruta.backend.dtos;

import com.francids.escruta.backend.entities.Notebook;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
public class NotebookDto {
    public NotebookDto() {
    }

    public NotebookDto(Notebook notebook) {
        this.id = notebook.getId();
        this.user = new BasicUser(notebook.getUser());
        this.icon = notebook.getIcon();
        this.title = notebook.getTitle();
        this.createdAt = notebook.getCreatedAt();
        this.updatedAt = notebook.getUpdatedAt();
    }

    @NotNull
    private UUID id;

    private BasicUser user;
    private String icon;
    private String title;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
