package com.francids.escruta.backend.dtos.notebook;

import jakarta.validation.constraints.NotBlank;

public record NotebookCreationDTO(
        String icon,
        @NotBlank String title
) {
}
