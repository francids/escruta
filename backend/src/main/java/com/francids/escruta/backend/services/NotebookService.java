package com.francids.escruta.backend.services;

import com.francids.escruta.backend.dtos.notebook.NotebookCreationDTO;
import com.francids.escruta.backend.dtos.notebook.NotebookResponseDTO;
import com.francids.escruta.backend.dtos.notebook.NotebookUpdateDTO;
import com.francids.escruta.backend.dtos.notebook.NotebookWithDetailsDTO;
import com.francids.escruta.backend.entities.Note;
import com.francids.escruta.backend.entities.Notebook;
import com.francids.escruta.backend.entities.Source;
import com.francids.escruta.backend.mappers.NotebookMapper;
import com.francids.escruta.backend.repositories.NoteRepository;
import com.francids.escruta.backend.repositories.NotebookRepository;
import com.francids.escruta.backend.repositories.SourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NotebookService {
    private final NotebookRepository notebookRepository;
    private final UserService userService;
    private final NoteRepository noteRepository;
    private final SourceRepository sourceRepository;
    private final NotebookMapper notebookMapper;

    private boolean isUserNotebookOwner(UUID notebookId) {
        return notebookRepository.existsByIdAndUserId(notebookId, userService.getUserId());
    }

    public List<NotebookResponseDTO> getAllUserNotebooks() {
        return notebookRepository.findByUserId(userService.getUserId()).stream().map(NotebookResponseDTO::new).toList();
    }

    public Optional<NotebookWithDetailsDTO> getUserNotebookWithDetails(UUID id) {
        if (!isUserNotebookOwner(id)) {
            return Optional.empty();
        }

        Optional<Notebook> notebookOptional = notebookRepository.findById(id);
        if (notebookOptional.isPresent()) {
            Notebook notebook = notebookOptional.get();
            List<Note> notes = noteRepository.findByNotebookId(id);
            List<Source> sources = sourceRepository.findByNotebookId(id);
            return Optional.of(new NotebookWithDetailsDTO(notebook, notes, sources));
        }

        return Optional.empty();
    }

    public NotebookResponseDTO createNotebook(NotebookCreationDTO createNotebookDto) {
        var currentUser = userService.getCurrentFullUser();
        if (currentUser != null) {
            Notebook notebook = notebookMapper.toNotebook(createNotebookDto, currentUser);
            notebookRepository.save(notebook);

            return new NotebookResponseDTO(notebook);
        }
        return null;
    }

    public NotebookResponseDTO updateNotebook(NotebookUpdateDTO newNotebookDto) {
        try {
            UUID notebookId = UUID.fromString(newNotebookDto.id());

            if (!isUserNotebookOwner(notebookId)) {
                return null;
            }

            Optional<Notebook> notebookOptional = notebookRepository.findById(notebookId);
            if (notebookOptional.isPresent()) {
                Notebook notebook = notebookOptional.get();
                notebookMapper.updateNotebookFromDto(newNotebookDto, notebook);
                notebookRepository.save(notebook);
                return new NotebookResponseDTO(notebook);
            }
            return null;
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    public NotebookResponseDTO deleteNotebook(NotebookUpdateDTO notebookDto) {
        try {
            UUID notebookId = UUID.fromString(notebookDto.id());

            if (!isUserNotebookOwner(notebookId)) {
                return null;
            }

            Optional<Notebook> notebookOptional = notebookRepository.findById(notebookId);
            if (notebookOptional.isPresent()) {
                Notebook notebook = notebookOptional.get();
                notebookRepository.deleteById(notebook.getId());
                return new NotebookResponseDTO(notebook);
            }
            return null;
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

}
