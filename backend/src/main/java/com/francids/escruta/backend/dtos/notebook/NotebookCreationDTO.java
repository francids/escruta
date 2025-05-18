package com.francids.escruta.backend.dtos.notebook;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotebookCreationDTO {
    private String icon;

    @NotBlank
    private String title;
}
