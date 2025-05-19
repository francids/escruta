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

    @GetMapping
    public ResponseEntity<List<NoteResponseDTO>> getNotebookNotes(@PathVariable String notebookId) {
        try {
            UUID uuid = UUID.fromString(notebookId);
            return new ResponseEntity<>(noteService.getNotes(uuid), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping
    public ResponseEntity<NoteResponseDTO> createNotebookNote(@PathVariable String notebookId, @Valid @RequestBody NoteCreationDTO noteCreationDTO) {
        try {
            UUID uuid = UUID.fromString(notebookId);
            var note = noteService.addNote(uuid, noteCreationDTO);
            return new ResponseEntity<>(note, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<NoteResponseDTO> updateNotebookNote(@PathVariable String notebookId, @Valid @RequestBody NoteUpdateDTO noteUpdateDTO) {
        try {
            UUID uuid = UUID.fromString(notebookId);
            var note = noteService.updateNote(uuid, noteUpdateDTO);
            return new ResponseEntity<>(note, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    public ResponseEntity<NoteResponseDTO> deleteNotebookNote(@PathVariable String notebookId, @Valid @RequestBody NoteUpdateDTO noteUpdateDTO) {
        try {
            UUID uuid = UUID.fromString(notebookId);
            var note = noteService.deleteNote(uuid, noteUpdateDTO);
            return new ResponseEntity<>(note, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
