package com.francids.escruta.backend.dtos.notebook;

import jakarta.validation.constraints.Pattern;

public record NotebookUpdateDTO(
        @Pattern(regexp = "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}") String id,
        String icon, String title) {
}
