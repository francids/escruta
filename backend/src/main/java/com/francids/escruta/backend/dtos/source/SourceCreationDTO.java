package com.francids.escruta.backend.dtos.source;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;

public record SourceCreationDTO(
        String icon,
        String title,
        @NotBlank
        @URL(protocol = "https")
        String link
) {
}
