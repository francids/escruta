package com.francids.escruta.backend.controllers;

import com.francids.escruta.backend.dtos.notebook.NotebookCreationDTO;
import com.francids.escruta.backend.dtos.notebook.NotebookResponseDTO;
import com.francids.escruta.backend.dtos.notebook.NotebookUpdateDTO;
import com.francids.escruta.backend.dtos.notebook.NotebookWithDetailsDTO;
import com.francids.escruta.backend.services.NotebookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("notebooks")
@RequiredArgsConstructor
public class NotebookController {
    private final NotebookService notebookService;

    @GetMapping
    public List<NotebookResponseDTO> getUserNotebooks() {
        return notebookService.getAllUserNotebooks();
    }

    @GetMapping("{notebookId}")
    public ResponseEntity<NotebookWithDetailsDTO> getUserNotebook(@PathVariable UUID notebookId) {
        var notebook = notebookService.getUserNotebookWithDetails(notebookId);
        return notebook.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<NotebookResponseDTO> createNotebook(@Valid @RequestBody NotebookCreationDTO createNotebookDto) {
        var notebook = notebookService.createNotebook(createNotebookDto);
        return new ResponseEntity<>(notebook, HttpStatus.CREATED);
    }

    @PutMapping
    @PreAuthorize("@notebookOwnershipService.isUserNotebookOwner(#notebookDto.id)")
    public ResponseEntity<NotebookResponseDTO> updateNotebook(@Valid @RequestBody NotebookUpdateDTO notebookDto) {
        var notebook = notebookService.updateNotebook(notebookDto);
        if (notebook == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(notebook, HttpStatus.OK);
    }


    @DeleteMapping
    @PreAuthorize("@notebookOwnershipService.isUserNotebookOwner(#notebookDto.id)")
    public ResponseEntity<NotebookResponseDTO> deleteNotebook(@Valid @RequestBody NotebookUpdateDTO notebookDto) {
        var notebook = notebookService.deleteNotebook(notebookDto);
        if (notebook == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(notebook, HttpStatus.OK);
    }
}
