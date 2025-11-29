package com.francids.escruta.backend.dtos;

import java.util.List;
import java.util.UUID;

public record ChatReplyMessage(
        String content,
        String conversationId,
        List<CitedSource> citedSources
) {

    public record CitedSource(
            UUID id,
            String title
    ) {
    }
}
