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
import org.jsoup.Jsoup;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.document.Document;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

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
    private final RetrievalService retrievalService;
    private final ChatModel chatModel;

    private record WebContent(String title, String content) {
    }

    private WebContent fetchWebContent(String url) {
        try {
            var doc = Jsoup.connect(url).get();
            String title = doc.title();

            if (title.trim().isEmpty()) {
                title = doc.select("meta[property=og:title]").attr("content");
            }
            if (title.trim().isEmpty()) {
                title = generateDefaultTitle(url);
            }

            String textContent = doc.body().text();
            return new WebContent(title.trim(), textContent);
        } catch (IOException e) {
            throw new RuntimeException("Failed to fetch content from URL: " + url, e);
        }
    }

    private String formatContentAsMarkdown(String rawContent) {
        String systemPrompt = """
            You are an expert content processor. Your task is to convert the provided raw text from a webpage into a clean, well-structured Markdown format.
            - Focus exclusively on the main article or primary content.
            - Omit all headers, footers, navigation menus, sidebars, advertisements, and other boilerplate text.
            - The output must be only the formatted Markdown content, without any introductory phrases like "Here is the markdown content:".
            """;

        try {
            UserMessage userMessage = new UserMessage(rawContent);
            Prompt prompt = new Prompt(List.of(new SystemMessage(systemPrompt), userMessage));
            return chatModel.call(prompt).getResult().getOutput().getText();
        } catch (Exception e) {
            return rawContent.replaceAll("(?m)^[ \t]*\r?\n", "").trim();
        }
    }

    private String generateDefaultTitle(String url) {
        try {
            String domain = new java.net.URL(url).getHost();
            return "Content from " + domain.replaceFirst("^www\\.", "");
        } catch (Exception e) {
            return "Untitled Web Content";
        }
    }

    public List<SourceResponseDTO> getSources(UUID notebookId) {
        if (notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            return sourceRepository.findByNotebookId(notebookId).stream()
                    .map(SourceResponseDTO::new)
                    .toList();
        }
        return List.of();
    }

    public List<SourceWithContentDTO> getSourcesWithContent(UUID notebookId) {
        if (notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            return sourceRepository.findByNotebookId(notebookId).stream()
                    .map(SourceWithContentDTO::new)
                    .toList();
        }
        return List.of();
    }

    public SourceWithContentDTO getSource(UUID notebookId, UUID sourceId) {
        if (!notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            return null;
        }
        return sourceRepository.findById(sourceId)
                .map(SourceWithContentDTO::new)
                .orElse(null);
    }

    @Transactional
    public SourceWithContentDTO addSource(UUID notebookId, SourceCreationDTO newSourceDto) {
        var currentUser = userService.getCurrentFullUser();
        Optional<Notebook> notebookOptional = notebookRepository.findById(notebookId);

        if (notebookOptional.isEmpty() || currentUser == null || !notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            throw new SecurityException("User does not have permission to add a source to this notebook.");
        }

        try {
            WebContent webContent = fetchWebContent(newSourceDto.link());
            String markdownContent = formatContentAsMarkdown(webContent.content());

            var textSplitter = new TokenTextSplitter(500, 100, 5, 10000, true);
            List<Document> chunks = textSplitter.apply(List.of(new Document(markdownContent)));

            Source source = sourceMapper.toSource(newSourceDto, notebookOptional.get(), markdownContent);
            if (source.getTitle() == null || source.getTitle().trim().isEmpty()) {
                source.setTitle(webContent.title());
            }

            source = sourceRepository.save(source);

            for (int i = 0; i < chunks.size(); i++) {
                try {
                    retrievalService.indexSourceChunk(notebookId, source, chunks.get(i), i);
                } catch (Exception e) {
                    // Fail silently for a single chunk to not interrupt the whole process.
                }
            }

            return new SourceWithContentDTO(source);

        } catch (Exception e) {
            throw new RuntimeException("Error while adding the source: " + e.getMessage(), e);
        }
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
        throw new SecurityException("User cannot update this source.");
    }

    @Transactional
    public SourceResponseDTO deleteSource(UUID notebookId, UUID sourceId) {
        Optional<Notebook> notebookOptional = notebookRepository.findById(notebookId);
        Optional<Source> sourceOptional = sourceRepository.findById(sourceId);

        if (notebookOptional.isPresent() && sourceOptional.isPresent() && notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            Source sourceToDelete = sourceOptional.get();
            try {
                retrievalService.deleteIndexedSource(sourceId);
                sourceRepository.deleteById(sourceId);
                return new SourceResponseDTO(sourceToDelete);
            } catch (Exception e) {
                throw new RuntimeException("Error while deleting the source: " + e.getMessage(), e);
            }
        }
        throw new SecurityException("User cannot delete this source.");
    }
}
