package com.francids.escruta.backend.controllers;

import com.francids.escruta.backend.dtos.note.NoteCreationDTO;
import com.francids.escruta.backend.dtos.note.NoteResponseDTO;
import com.francids.escruta.backend.dtos.note.NoteUpdateDTO;
import com.francids.escruta.backend.services.NoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("notebooks/{notebookId}/notes")
@RequiredArgsConstructor
public class NoteController {
    private final NoteService noteService;

    private UUID parseUUID(String id) {
        try {
            return UUID.fromString(id);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid UUID: " + id);
        }
    }

    @GetMapping
    public ResponseEntity<List<NoteResponseDTO>> getNotebookNotes(
            @PathVariable String notebookId
    ) {
        try {
            UUID uuid = parseUUID(notebookId);
            return ResponseEntity.ok(noteService.getNotes(uuid));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<NoteResponseDTO> createNotebookNote(
            @PathVariable String notebookId,
            @Valid @RequestBody NoteCreationDTO noteCreationDTO
    ) {
        try {
            UUID uuid = parseUUID(notebookId);
            var note = noteService.addNote(uuid, noteCreationDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(note);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping
    public ResponseEntity<NoteResponseDTO> updateNotebookNote(
            @PathVariable String notebookId,
            @Valid @RequestBody NoteUpdateDTO noteUpdateDTO
    ) {
        try {
            UUID uuid = UUID.fromString(notebookId);
            var note = noteService.updateNote(uuid, noteUpdateDTO);
            return ResponseEntity.ok(note);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<NoteResponseDTO> deleteNotebookNote(
            @PathVariable String notebookId,
            @Valid @RequestBody NoteUpdateDTO noteUpdateDTO
    ) {
        try {
            UUID uuid = UUID.fromString(notebookId);
            var note = noteService.deleteNote(uuid, noteUpdateDTO);
            return ResponseEntity.ok(note);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
