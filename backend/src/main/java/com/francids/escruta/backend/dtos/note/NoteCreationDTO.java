package com.francids.escruta.backend.dtos.note;

import jakarta.validation.constraints.NotBlank;

public record NoteCreationDTO(
        String icon,
        @NotBlank
        String title,
        String content
) {
}
