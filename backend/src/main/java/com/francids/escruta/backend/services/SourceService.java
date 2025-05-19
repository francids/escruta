package com.francids.escruta.backend.services;

import com.francids.escruta.backend.dtos.source.SourceResponseDTO;
import com.francids.escruta.backend.dtos.source.SourceUpdateDTO;
import com.francids.escruta.backend.dtos.source.SourceWithContentDTO;
import com.francids.escruta.backend.entities.Notebook;
import com.francids.escruta.backend.entities.Source;
import com.francids.escruta.backend.mappers.SourceMapper;
import com.francids.escruta.backend.repositories.NotebookRepository;
import com.francids.escruta.backend.repositories.SourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SourceService {
    private final SourceRepository sourceRepository;
    private final NotebookRepository notebookRepository;
    private final UserService userService;
    private final SourceMapper sourceMapper;
    private NotebookOwnershipService notebookOwnershipService;

    public List<SourceResponseDTO> getSources(UUID notebookId) {
        if (notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            return sourceRepository.findByNotebookId(notebookId).stream().map(SourceResponseDTO::new).toList();
        }
        return null;
    }

    public SourceWithContentDTO getSource(UUID notebookId, UUID sourceId) {
        if (!notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            return null;
        }
        Optional<Source> source = sourceRepository.findById(sourceId);
        return source.map(SourceWithContentDTO::new).orElse(null);
    }

    public SourceResponseDTO updateSource(UUID notebookId, SourceUpdateDTO newSource) {
        Optional<Notebook> notebookOptional = notebookRepository.findById(notebookId);
        Optional<Source> sourceOptional = sourceRepository.findById(UUID.fromString(newSource.id()));
        if (notebookOptional.isPresent() && sourceOptional.isPresent() && notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            Source source = sourceOptional.get();
            sourceMapper.updateSourceFromDto(newSource, source);
            sourceRepository.save(source);
            return new SourceResponseDTO(source);
        }
        return null;
    }

    public SourceResponseDTO deleteSource(UUID notebookId, UUID sourceId) {
        Optional<Notebook> notebookOptional = notebookRepository.findById(notebookId);
        Optional<Source> sourceOptional = sourceRepository.findById(sourceId);
        if (notebookOptional.isPresent() && sourceOptional.isPresent() && notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            sourceRepository.deleteById(sourceId);
            return new SourceResponseDTO(sourceOptional.get());
        }
        return null;
    }
}
