package com.francids.escruta.backend.dtos.source;

import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.UUID;

public record SourceUpdateDTO(
        @UUID
        @NotNull
        String id,
        String icon,
        String title
) {
}
