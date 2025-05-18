package com.francids.escruta.backend.dtos.notebook;

import org.hibernate.validator.constraints.UUID;

public record NotebookUpdateDTO(
        @UUID
        String id,
        String icon,
        String title
) {
}
