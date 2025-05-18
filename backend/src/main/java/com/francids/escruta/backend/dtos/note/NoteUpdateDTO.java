package com.francids.escruta.backend.dtos.note;

import org.hibernate.validator.constraints.UUID;

public record NoteUpdateDTO(
        @UUID
        String id,
        String icon,
        String title,
        String content
) {
}
