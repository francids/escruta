package com.francids.escruta.backend.dtos.source;

import jakarta.validation.constraints.NotBlank;

public record SourceFileCreationDTO(
        String icon,
        @NotBlank
        String title
) {
}
