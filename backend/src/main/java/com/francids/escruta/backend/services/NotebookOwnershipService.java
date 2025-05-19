package com.francids.escruta.backend.services;

import com.francids.escruta.backend.repositories.NotebookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NotebookOwnershipService {
    private final NotebookRepository notebookRepository;
    private final UserService userService;

    public boolean isUserNotebookOwner(UUID notebookId) {
        return notebookRepository.existsByIdAndUserId(notebookId, userService.getUserId());
    }
}
