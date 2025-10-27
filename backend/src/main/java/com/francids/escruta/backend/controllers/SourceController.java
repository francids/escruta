package com.francids.escruta.backend.controllers;

import com.francids.escruta.backend.dtos.source.SourceCreationDTO;
import com.francids.escruta.backend.dtos.source.SourceFileCreationDTO;
import com.francids.escruta.backend.dtos.source.SourceResponseDTO;
import com.francids.escruta.backend.dtos.source.SourceUpdateDTO;
import com.francids.escruta.backend.dtos.source.SourceWithContentDTO;
import com.francids.escruta.backend.services.SourceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("notebooks/{notebookId}/sources")
@RequiredArgsConstructor
public class SourceController {
    private final SourceService sourceService;

    @GetMapping
    public ResponseEntity<List<SourceResponseDTO>> getNotebookSources(
            @PathVariable UUID notebookId
    ) {
        return ResponseEntity.ok(sourceService.getSources(notebookId));
    }

    @GetMapping("{sourceId}")
    public ResponseEntity<SourceWithContentDTO> getNotebookSource(
            @PathVariable UUID notebookId,
            @PathVariable UUID sourceId
    ) {
        var source = sourceService.getSource(notebookId, sourceId);
        return source != null ?
                ResponseEntity.ok(source) :
                ResponseEntity.notFound()
                        .build();
    }

    @PostMapping
    public ResponseEntity<SourceWithContentDTO> createNotebookSource(
            @PathVariable UUID notebookId,
            @Valid @RequestBody SourceCreationDTO sourceCreationDTO,
            @RequestParam(name = "aiConverter", defaultValue = "false") boolean aiConverter
    ) {
        try {
            var source = sourceService.addSource(notebookId, sourceCreationDTO, aiConverter);
            return source != null ?
                    ResponseEntity.status(HttpStatus.CREATED)
                            .body(source) :
                    ResponseEntity.badRequest()
                            .build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .build();
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<?> createNotebookSourceFromFile(
            @PathVariable UUID notebookId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam(name = "icon", required = false) String icon,
            @RequestParam(name = "aiConverter", defaultValue = "false") boolean aiConverter
    ) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                        .build();
            }
            if (title == null || title.trim()
                    .isEmpty()) {
                return ResponseEntity.badRequest()
                        .build();
            }
            var sourceFileCreationDTO = new SourceFileCreationDTO(icon, title.trim());

            var source = sourceService.addSourceFromFile(notebookId, sourceFileCreationDTO, file, aiConverter);
            return source != null ?
                    ResponseEntity.status(HttpStatus.CREATED)
                            .body(source) :
                    ResponseEntity.badRequest()
                            .build();
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }

    @PutMapping
    public ResponseEntity<SourceResponseDTO> updateNotebookSource(
            @PathVariable UUID notebookId,
            @Valid @RequestBody SourceUpdateDTO sourceUpdateDTO
    ) {
        var source = sourceService.updateSource(notebookId, sourceUpdateDTO);
        return source != null ?
                ResponseEntity.ok(source) :
                ResponseEntity.notFound()
                        .build();
    }

    @DeleteMapping("{sourceId}")
    public ResponseEntity<SourceResponseDTO> deleteNotebookSource(
            @PathVariable UUID notebookId,
            @PathVariable UUID sourceId
    ) {
        try {
            var source = sourceService.deleteSource(notebookId, sourceId);
            return source != null ?
                    ResponseEntity.ok(source) :
                    ResponseEntity.notFound()
                            .build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }

    @PostMapping("{sourceId}/summary")
    public ResponseEntity<String> generateSourceSummary(@PathVariable UUID notebookId, @PathVariable UUID sourceId) {
        try {
            String summary = sourceService.generateSummary(notebookId, sourceId);
            return summary != null ?
                    ResponseEntity.ok(summary) :
                    ResponseEntity.notFound()
                            .build();
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }

    @GetMapping("{sourceId}/summary")
    public ResponseEntity<String> getSourceSummary(@PathVariable UUID notebookId, @PathVariable UUID sourceId) {
        try {
            String summary = sourceService.getSummary(notebookId, sourceId);
            return ResponseEntity.ok(summary);
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }

    @DeleteMapping("{sourceId}/summary")
    public ResponseEntity<Void> deleteSourceSummary(@PathVariable UUID notebookId, @PathVariable UUID sourceId) {
        try {
            boolean deleted = sourceService.deleteSummary(notebookId, sourceId);
            return deleted ?
                    ResponseEntity.noContent()
                            .build() :
                    ResponseEntity.notFound()
                            .build();
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }
}