package com.francids.escruta.backend.services;

import com.francids.escruta.backend.dtos.note.NoteCreationDTO;
import com.francids.escruta.backend.dtos.note.NoteResponseDTO;
import com.francids.escruta.backend.dtos.note.NoteUpdateDTO;
import com.francids.escruta.backend.entities.Note;
import com.francids.escruta.backend.entities.Notebook;
import com.francids.escruta.backend.mappers.NoteMapper;
import com.francids.escruta.backend.repositories.NoteRepository;
import com.francids.escruta.backend.repositories.NotebookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;
    private final NotebookRepository notebookRepository;
    private final UserService userService;
    private final NoteMapper noteMapper;
    private final NotebookOwnershipService notebookOwnershipService;

    public List<NoteResponseDTO> getNotes(UUID notebookId) {
        if (notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            return noteRepository.findByNotebookId(notebookId).stream().map(NoteResponseDTO::new).toList();
        }
        return null;
    }

    public NoteResponseDTO addNote(UUID notebookId, NoteCreationDTO newNoteDto) {
        var currentUser = userService.getCurrentFullUser();
        Optional<Notebook> notebookOptional = notebookRepository.findById(notebookId);
        if (notebookOptional.isPresent() && currentUser != null && notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            Note note = noteMapper.toNote(newNoteDto, notebookOptional.get());
            noteRepository.save(note);
            return new NoteResponseDTO(note);
        }
        return null;
    }

    public NoteResponseDTO updateNote(UUID notebookId, NoteUpdateDTO newNoteDto) {
        Optional<Notebook> notebookOptional = notebookRepository.findById(notebookId);
        Optional<Note> noteOptional = noteRepository.findById(UUID.fromString(newNoteDto.id()));
        if (notebookOptional.isPresent() && noteOptional.isPresent() && notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            Note note = noteOptional.get();
            noteMapper.updateNoteFromDto(newNoteDto, note);
            noteRepository.save(note);
            return new NoteResponseDTO(note);
        }
        return null;
    }

    public NoteResponseDTO deleteNote(UUID notebookId, UUID noteId) {
        Optional<Notebook> notebookOptional = notebookRepository.findById(notebookId);
        Optional<Note> noteOptional = noteRepository.findById(noteId);
        if (notebookOptional.isPresent() && noteOptional.isPresent() && notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            noteRepository.deleteById(noteOptional.get().getId());
            return new NoteResponseDTO(noteOptional.get());
        }
        return null;
    }
}
