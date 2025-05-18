package com.francids.escruta.backend.services;

import com.francids.escruta.backend.dtos.*;
import com.francids.escruta.backend.entities.Note;
import com.francids.escruta.backend.entities.Notebook;
import com.francids.escruta.backend.entities.Source;
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

    public List<NotebookDto> getAllUserNotebooks() {
        return notebookRepository
                .findByUserId(userService.getUserId())
                .stream()
                .map(NotebookDto::new)
                .toList();
    }

    public Optional<NotebookWithDetailsDto> getUserNotebookWithDetails(UUID id) {
        var currentUser = userService.getCurrentBasicUser();
        if (currentUser != null) {
            Optional<Notebook> notebookOptional = notebookRepository.findById(id);
            if (notebookOptional.isPresent()) {
                Notebook notebook = notebookOptional.get();
                List<Note> notes = noteRepository.findByNotebookId(id);
                List<Source> sources = sourceRepository.findByNotebookId(id);
                return Optional.of(new NotebookWithDetailsDto(notebook, notes, sources));
            }
        }
        return Optional.empty();
    }

    public NotebookDto createNotebook(CreateNotebookDto createNotebookDto) {
        var currentUser = userService.getCurrentFullUser();
        if (currentUser != null) {
            Notebook notebook = new Notebook();
            notebook.setUser(currentUser);
            notebook.setIcon(createNotebookDto.getIcon());
            notebook.setTitle(createNotebookDto.getTitle());
            notebookRepository.save(notebook);

            return new NotebookDto(notebook);
        }
        return null;
    }

    public NotebookDto updateNotebook(NotebookDto newNotebookDto) {
        if (notebookRepository.findById(newNotebookDto.getId()).isPresent()) {
            Notebook notebook = notebookRepository.findById(newNotebookDto.getId()).get();
            notebook.setIcon(newNotebookDto.getIcon() == null ? notebook.getIcon() : newNotebookDto.getIcon());
            notebook.setTitle(newNotebookDto.getTitle() == null ? notebook.getTitle() : newNotebookDto.getTitle());
            notebookRepository.save(notebook);
            return new NotebookDto(notebook);
        }
        return null;
    }

    public NotebookDto deleteNotebook(NotebookDto notebookDto) {
        if (notebookRepository.findById(notebookDto.getId()).isPresent()) {
            var notebook = notebookRepository.findById(notebookDto.getId()).get();
            notebookRepository.deleteById(notebook.getId());
            return new NotebookDto(notebook);
        }
        return null;
    }
}
