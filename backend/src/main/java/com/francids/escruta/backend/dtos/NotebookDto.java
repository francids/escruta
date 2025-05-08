package com.francids.escruta.backend.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class NotebookDto {
    @NotNull
    private Integer id;

    private BasicUser user;
    private String icon;
    private String title;
    private Date createdAt;
    private Date updatedAt;
}
