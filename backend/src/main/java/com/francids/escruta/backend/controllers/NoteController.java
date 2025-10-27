package com.francids.escruta.backend.controllers;

import com.francids.escruta.backend.dtos.note.NoteCreationDTO;
import com.francids.escruta.backend.dtos.note.NoteResponseDTO;
import com.francids.escruta.backend.dtos.note.NoteUpdateDTO;
import com.francids.escruta.backend.dtos.note.NoteWithContentDTO;
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
    public ResponseEntity<List<NoteResponseDTO>> getNotebookNotes(
            @PathVariable UUID notebookId
    ) {
        return ResponseEntity.ok(noteService.getNotes(notebookId));
    }

    @GetMapping("{noteId}")
    public ResponseEntity<NoteWithContentDTO> getNotebookNoteContent(
            @PathVariable UUID notebookId,
            @PathVariable UUID noteId
    ) {
        var note = noteService.getNote(notebookId, noteId);
        return note != null ?
                ResponseEntity.ok(note) :
                ResponseEntity.notFound()
                        .build();

    }

    @PostMapping
    public ResponseEntity<NoteResponseDTO> createNotebookNote(
            @PathVariable UUID notebookId,
            @Valid @RequestBody NoteCreationDTO noteCreationDTO
    ) {
        var note = noteService.addNote(notebookId, noteCreationDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(note);
    }

    @PutMapping
    public ResponseEntity<NoteResponseDTO> updateNotebookNote(
            @PathVariable UUID notebookId,
            @Valid @RequestBody NoteUpdateDTO noteUpdateDTO
    ) {
        var note = noteService.updateNote(notebookId, noteUpdateDTO);
        return note != null ?
                ResponseEntity.ok(note) :
                ResponseEntity.notFound()
                        .build();
    }

    @DeleteMapping("{noteId}")
    public ResponseEntity<NoteResponseDTO> deleteNotebookNote(
            @PathVariable UUID notebookId,
            @PathVariable UUID noteId
    ) {
        var note = noteService.deleteNote(notebookId, noteId);
        return note != null ?
                ResponseEntity.ok(note) :
                ResponseEntity.notFound()
                        .build();
    }
}
