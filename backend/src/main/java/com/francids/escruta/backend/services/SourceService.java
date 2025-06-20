package com.francids.escruta.backend.services;

import com.francids.escruta.backend.dtos.source.SourceCreationDTO;
import com.francids.escruta.backend.dtos.source.SourceResponseDTO;
import com.francids.escruta.backend.dtos.source.SourceUpdateDTO;
import com.francids.escruta.backend.dtos.source.SourceWithContentDTO;
import com.francids.escruta.backend.entities.Notebook;
import com.francids.escruta.backend.entities.Source;
import com.francids.escruta.backend.mappers.SourceMapper;
import com.francids.escruta.backend.repositories.NotebookRepository;
import com.francids.escruta.backend.repositories.SourceRepository;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import java.io.IOException;
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
    private final NotebookOwnershipService notebookOwnershipService;

    private record WebContent(String title, String content) {
    }

    private WebContent getWebContent(String url) {
        try {
            Document document = Jsoup
                    .connect(url)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36")
                    .timeout(10000)
                    .get();
            String title = document.title();
            String content = document.body().text();
            return new WebContent(title, content);
        } catch (IOException e) {
            throw new RuntimeException("Error to retrieve web content: " + url, e);
        }
    }

    public List<SourceResponseDTO> getSources(UUID notebookId) {
        if (notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            return sourceRepository.findByNotebookId(notebookId).stream().map(SourceResponseDTO::new).toList();
        }
        return null;
    }

    public List<SourceWithContentDTO> getSourcesWithContent(UUID notebookId) {
        if (notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            return sourceRepository.findByNotebookId(notebookId).stream().map(SourceWithContentDTO::new).toList();
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

    public SourceWithContentDTO addSource(UUID notebookId, SourceCreationDTO newSourceDto) {
        var currentUser = userService.getCurrentFullUser();
        Optional<Notebook> notebookOptional = notebookRepository.findById(notebookId);
        if (notebookOptional.isPresent() && currentUser != null && notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            WebContent webContent = getWebContent(newSourceDto.link());
            Source source = sourceMapper.toSource(newSourceDto, notebookOptional.get(), webContent.content);
            if (source.getTitle() == null) source.setTitle(webContent.title);
            sourceRepository.save(source);
            return new SourceWithContentDTO(source);
        }
        return null;
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
