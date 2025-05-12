package com.francids.escruta.backend.repositories;

import com.francids.escruta.backend.entities.Source;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SourceRepository extends CrudRepository<Source, UUID> {
    List<Source> findByNotebookId(UUID notebookId);
}
