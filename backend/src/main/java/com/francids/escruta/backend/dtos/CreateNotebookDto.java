package com.francids.escruta.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateNotebookDto {
    private String icon;

    @NotBlank
    private String title;
}
