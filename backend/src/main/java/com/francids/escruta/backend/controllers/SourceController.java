package com.francids.escruta.backend.controllers;

import com.francids.escruta.backend.dtos.source.SourceCreationDTO;
import com.francids.escruta.backend.dtos.source.SourceResponseDTO;
import com.francids.escruta.backend.dtos.source.SourceUpdateDTO;
import com.francids.escruta.backend.dtos.source.SourceWithContentDTO;
import com.francids.escruta.backend.services.SourceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("notebooks/{notebookId}/sources")
@RequiredArgsConstructor
public class SourceController {
    private final SourceService sourceService;

    private UUID parseUUID(String id) {
        try {
            return UUID.fromString(id);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid UUID: " + id);
        }
    }

    @GetMapping
    public ResponseEntity<List<SourceResponseDTO>> getNotebookSources(
            @PathVariable String notebookId
    ) {
        try {
            UUID uuid = parseUUID(notebookId);
            return ResponseEntity.ok(sourceService.getSources(uuid));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("{sourceId}")
    public ResponseEntity<SourceWithContentDTO> getNotebookSource(
            @PathVariable String notebookId,
            @PathVariable String sourceId
    ) {
        try {
            UUID notebookUuid = parseUUID(notebookId);
            UUID sourceUuid = parseUUID(sourceId);
            var source = sourceService.getSource(notebookUuid, sourceUuid);
            return source != null ? ResponseEntity.ok(source) : ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<SourceWithContentDTO> createNotebookSource(
            @PathVariable String notebookId,
            @Valid @RequestBody SourceCreationDTO sourceCreationDTO,
            @RequestParam(name = "aiConverter", defaultValue = "false") boolean aiConverter
    ) {
        try {
            UUID uuid = parseUUID(notebookId);
            var source = sourceService.addSource(uuid, sourceCreationDTO, aiConverter);
            return source != null
                    ? ResponseEntity.status(HttpStatus.CREATED).body(source)
                    : ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping
    public ResponseEntity<SourceResponseDTO> updateNotebookSource(
            @PathVariable String notebookId,
            @Valid @RequestBody SourceUpdateDTO sourceUpdateDTO
    ) {
        try {
            UUID uuid = UUID.fromString(notebookId);
            var source = sourceService.updateSource(uuid, sourceUpdateDTO);
            return source != null ? ResponseEntity.ok(source) : ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("{sourceId}")
    public ResponseEntity<SourceResponseDTO> deleteNotebookSource(
            @PathVariable String notebookId,
            @PathVariable String sourceId
    ) {
        try {
            UUID notebookUuid = UUID.fromString(notebookId);
            UUID sourceUuid = parseUUID(sourceId);
            var source = sourceService.deleteSource(notebookUuid, sourceUuid);
            return source != null ? ResponseEntity.ok(source) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}