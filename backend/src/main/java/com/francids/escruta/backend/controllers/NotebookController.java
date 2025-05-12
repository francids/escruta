package com.francids.escruta.backend.controllers;

import com.francids.escruta.backend.dtos.CreateNotebookDto;
import com.francids.escruta.backend.dtos.NotebookDto;
import com.francids.escruta.backend.dtos.NotebookWithDetailsDto;
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
    public List<NotebookDto> getUserNotebooks() {
        return notebookService.getAllUserNotebooks();
    }

    @GetMapping("{id}")
    public ResponseEntity<NotebookWithDetailsDto> getUserNotebook(@PathVariable String id) {
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
    public ResponseEntity<NotebookDto> createNotebook(@Valid @RequestBody CreateNotebookDto createNotebookDto) {
        var notebook = notebookService.createNotebook(createNotebookDto);
        return new ResponseEntity<>(notebook, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<NotebookDto> updateNotebook(@Valid @RequestBody NotebookDto notebookDto) {
        var notebook = notebookService.updateNotebook(notebookDto);
        return new ResponseEntity<>(notebook, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<NotebookDto> deleteNotebook(@Valid @RequestBody NotebookDto notebookDto) {
        var notebook = notebookService.deleteNotebook(notebookDto);
        return new ResponseEntity<>(notebook, HttpStatus.OK);
    }
}
