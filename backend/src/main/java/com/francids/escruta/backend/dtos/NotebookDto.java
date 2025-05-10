package com.francids.escruta.backend.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
public class NotebookDto {
    @NotNull
    private UUID id;

    private BasicUser user;
    private String icon;
    private String title;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
