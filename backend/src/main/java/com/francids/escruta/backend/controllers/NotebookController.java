package com.francids.escruta.backend.controllers;

import com.francids.escruta.backend.dtos.notebook.NotebookCreationDTO;
import com.francids.escruta.backend.dtos.notebook.NotebookResponseDTO;
import com.francids.escruta.backend.dtos.notebook.NotebookUpdateDTO;
import com.francids.escruta.backend.dtos.notebook.NotebookWithDetailsDTO;
import com.francids.escruta.backend.services.NotebookService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("notebooks")
@RestController
public class NotebookController {
    private final NotebookService notebookService;

    public NotebookController(NotebookService notebookService) {
        this.notebookService = notebookService;
    }

    @GetMapping
    public List<NotebookResponseDTO> getUserNotebooks() {
        return notebookService.getAllUserNotebooks();
    }

    @GetMapping("{id}")
    public ResponseEntity<NotebookWithDetailsDTO> getUserNotebook(@PathVariable String id) {
        try {
            UUID uuid = UUID.fromString(id);
            var notebook = notebookService.getUserNotebookWithDetails(uuid);
            return notebook
                    .map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping
    public ResponseEntity<NotebookResponseDTO> createNotebook(@Valid @RequestBody NotebookCreationDTO createNotebookDto) {
        var notebook = notebookService.createNotebook(createNotebookDto);
        return new ResponseEntity<>(notebook, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<NotebookResponseDTO> updateNotebook(@Valid @RequestBody NotebookUpdateDTO notebookDto) {
        var notebook = notebookService.updateNotebook(notebookDto);
        if (notebook == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(notebook, HttpStatus.OK);
    }


    @DeleteMapping
    public ResponseEntity<NotebookResponseDTO> deleteNotebook(@Valid @RequestBody NotebookUpdateDTO notebookDto) {
        var notebook = notebookService.deleteNotebook(notebookDto);
        if (notebook == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(notebook, HttpStatus.OK);
    }
}
