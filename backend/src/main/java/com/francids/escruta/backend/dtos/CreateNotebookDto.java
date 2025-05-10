package com.francids.escruta.backend.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateNotebookDto {
    private String icon;

    @NotNull
    private String title;
}
