package com.francids.escruta.backend.dtos;

import jakarta.validation.constraints.NotBlank;

public record ChatRequest(
        @NotBlank
        String userInput,
        String conversationId
) {
}
