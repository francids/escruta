package com.francids.pregunai.backend.services;

import com.francids.pregunai.backend.dtos.BasicUser;
import com.francids.pregunai.backend.dtos.CreateNotebookDto;
import com.francids.pregunai.backend.dtos.NotebookDto;
import com.francids.pregunai.backend.entities.Notebook;
import com.francids.pregunai.backend.repositories.NotebookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class NotebookService {
    private final NotebookRepository notebookRepository;
    private final UserService userService;

    NotebookService(NotebookRepository notebookRepository, UserService userService) {
        this.notebookRepository = notebookRepository;
        this.userService = userService;
    }

    private NotebookDto convertToDto(Notebook notebook) {
        NotebookDto dto = new NotebookDto();
        dto.setId(notebook.getId());
        dto.setIcon(notebook.getIcon());
        dto.setTitle(notebook.getTitle());
        dto.setCreatedAt(notebook.getCreatedAt());
        dto.setUpdatedAt(notebook.getUpdatedAt());

        BasicUser basicUser = new BasicUser();
        basicUser.setId(notebook.getUser().getId());
        basicUser.setFullName(notebook.getUser().getFullName());
        dto.setUser(basicUser);

        return dto;
    }

    public List<NotebookDto> getAllUserNotebooks() {
        var currentUser = userService.getCurrentBasicUser();
        if (currentUser != null) {
            return StreamSupport.stream(notebookRepository.findAll().spliterator(), false).map(this::convertToDto).filter(notebook -> notebook.getUser().getId().equals(currentUser.getId())).toList();
        }
        return null;
    }

    public NotebookDto createNotebook(CreateNotebookDto createNotebookDto) {
        var currentUser = userService.getCurrentFullUser();
        if (currentUser != null) {
            Notebook notebook = new Notebook();
            notebook.setUser(currentUser);
            notebook.setIcon(createNotebookDto.getIcon());
            notebook.setTitle(createNotebookDto.getTitle());
            notebookRepository.save(notebook);

            return convertToDto(notebook);
        }
        return null;
    }

    public NotebookDto updateNotebook(NotebookDto newNotebookDto) {
        if (notebookRepository.findById(newNotebookDto.getId()).isPresent()) {
            Notebook notebook = notebookRepository.findById(newNotebookDto.getId()).get();
            notebook.setIcon(newNotebookDto.getIcon() == null ? notebook.getIcon() : newNotebookDto.getIcon());
            notebook.setTitle(newNotebookDto.getTitle() == null ? notebook.getTitle() : newNotebookDto.getTitle());
            notebookRepository.save(notebook);
            return convertToDto(notebook);
        }
        return null;
    }

    public NotebookDto deleteNotebook(NotebookDto notebookDto) {
        if (notebookRepository.findById(notebookDto.getId()).isPresent()) {
            var notebook = notebookRepository.findById(notebookDto.getId()).get();
            notebookRepository.deleteById(notebook.getId());
            return convertToDto(notebook);
        }
        return null;
    }
}
