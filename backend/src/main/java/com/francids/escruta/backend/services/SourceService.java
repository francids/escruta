package com.francids.escruta.backend.services;

import com.francids.escruta.backend.dtos.source.SourceCreationDTO;
import com.francids.escruta.backend.dtos.source.SourceFileCreationDTO;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SourceService {

    private static final Logger logger = LoggerFactory.getLogger(SourceService.class);

    private final SourceRepository sourceRepository;
    private final NotebookRepository notebookRepository;
    private final UserService userService;
    private final SourceMapper sourceMapper;
    private final NotebookOwnershipService notebookOwnershipService;
    private final RetrievalService retrievalService;
    private final ChatModel chatModel;
    private final FileTextExtractionService fileTextExtractionService;
    private final AsyncVectorIndexingService asyncVectorIndexingService;

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
            return sourceRepository.findByNotebookId(notebookId).stream().map(SourceResponseDTO::new).toList();
        }
        return List.of();
    }

    public List<SourceWithContentDTO> getSourcesWithContent(UUID notebookId) {
        if (notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            return sourceRepository.findByNotebookId(notebookId).stream().map(SourceWithContentDTO::new).toList();
        }
        return List.of();
    }

    public SourceWithContentDTO getSource(UUID notebookId, UUID sourceId) {
        if (!notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            return null;
        }
        return sourceRepository.findById(sourceId).map(SourceWithContentDTO::new).orElse(null);
    }

    @Transactional
    public SourceWithContentDTO addSource(UUID notebookId, SourceCreationDTO newSourceDto, boolean aiConverter) {
        var currentUser = userService.getCurrentFullUser();
        Optional<Notebook> notebookOptional = notebookRepository.findById(notebookId);

        if (notebookOptional.isEmpty() || currentUser == null || !notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            throw new SecurityException("User does not have permission to add a source to this notebook.");
        }

        try {
            WebContent webContent = fetchWebContent(newSourceDto.link());
            String content;

            if (aiConverter) {
                content = formatContentAsMarkdown(webContent.content());
            } else {
                content = webContent.content();
            }

            Source source = sourceMapper.toSource(newSourceDto, notebookOptional.get(), content);
            if (source.getTitle() == null || source.getTitle().trim().isEmpty()) {
                source.setTitle(webContent.title());
            }

            source = sourceRepository.save(source);

            generateAndSetSummary(source);

            asyncVectorIndexingService.indexSourceInVectorStore(notebookId, source, content);

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

    @Transactional
    public SourceWithContentDTO addSourceFromFile(
            UUID notebookId,
            SourceFileCreationDTO newSourceDto,
            MultipartFile file,
            boolean aiConverter
    ) {
        logger.info("Adding source from file: {} to notebook: {}", file.getOriginalFilename(), notebookId);

        var currentUser = userService.getCurrentFullUser();
        Optional<Notebook> notebookOptional = notebookRepository.findById(notebookId);

        if (notebookOptional.isEmpty() || currentUser == null || !notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            throw new SecurityException("User does not have permission to add a source to this notebook.");
        }

        if (!fileTextExtractionService.isSupportedFileType(file.getContentType())) {
            throw new RuntimeException("Unsupported file type: " + file.getContentType());
        }

        String content;
        try {
            content = fileTextExtractionService.extractTextFromFile(file);
            if (content == null || content.trim().isEmpty()) {
                throw new RuntimeException("No text content could be extracted from the file");
            }

            if (aiConverter) {
                logger.info("Converting content to markdown using AI");
                content = formatContentAsMarkdown(content);
            }
        } catch (Exception e) {
            logger.error("Error processing file: {}", e.getMessage(), e);
            throw new RuntimeException("Error processing file: " + e.getMessage(), e);
        }

        Source source;
        try {
            source = new Source();
            source.setNotebook(notebookOptional.get());
            source.setIcon(newSourceDto.icon());
            source.setTitle(newSourceDto.title());
            source.setLink("file://" + file.getOriginalFilename());
            source.setContent(content);

            source = sourceRepository.save(source);
            logger.info("Successfully saved source with ID: {}", source.getId());
        } catch (Exception e) {
            logger.error("Error while saving the source: {}", e.getMessage(), e);
            throw new RuntimeException("Error while saving the source: " + e.getMessage(), e);
        }

        generateAndSetSummary(source);

        asyncVectorIndexingService.indexSourceInVectorStore(notebookId, source, content);

        logger.info("Successfully added source from file: {}", file.getOriginalFilename());
        return new SourceWithContentDTO(source);
    }

    private void generateAndSetSummary(Source source) {
        try {
            Prompt prompt = getPrompt(source);
            var response = chatModel.call(prompt);
            String summary = response.getResult().getOutput().getText();

            source.setSummary(summary);
            sourceRepository.save(source);
        } catch (Exception e) {
            logger.error("Error generating summary for source {}: {}", source.getId(), e.getMessage(), e);
        }
    }

    private static Prompt getPrompt(Source source) {
        String systemPrompt = """
                You are an expert content summarizer. Your task is to create a concise summary of the provided content.
                The summary should be 2-3 sentences that capture the essential information and main points.
                Focus on the key concepts, findings, or conclusions presented in the content.
                """;

        UserMessage userMessage = new UserMessage(source.getContent());
        return new Prompt(List.of(new SystemMessage(systemPrompt), userMessage));
    }

    public String generateSummary(UUID notebookId, UUID sourceId) {
        if (!notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            throw new SecurityException("User cannot access this source.");
        }

        Optional<Source> sourceOptional = sourceRepository.findById(sourceId);
        if (sourceOptional.isEmpty()) {
            return null;
        }

        Source source = sourceOptional.get();
        if (!source.getNotebook().getId().equals(notebookId)) {
            throw new SecurityException("Source does not belong to this notebook.");
        }

        generateAndSetSummary(source);
        return source.getSummary();
    }

    public String getSummary(UUID notebookId, UUID sourceId) {
        if (!notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            throw new SecurityException("User cannot access this source.");
        }

        Optional<Source> sourceOptional = sourceRepository.findById(sourceId);
        if (sourceOptional.isEmpty()) {
            return "";
        }

        Source source = sourceOptional.get();
        if (!source.getNotebook().getId().equals(notebookId)) {
            throw new SecurityException("Source does not belong to this notebook.");
        }

        return source.getSummary() != null ? source.getSummary() : "";
    }

    public boolean deleteSummary(UUID notebookId, UUID sourceId) {
        if (!notebookOwnershipService.isUserNotebookOwner(notebookId)) {
            throw new SecurityException("User cannot access this source.");
        }

        Optional<Source> sourceOptional = sourceRepository.findById(sourceId);
        if (sourceOptional.isEmpty()) {
            return false;
        }

        Source source = sourceOptional.get();
        if (!source.getNotebook().getId().equals(notebookId)) {
            throw new SecurityException("Source does not belong to this notebook.");
        }

        source.setSummary(null);
        sourceRepository.save(source);
        return true;
    }
}
