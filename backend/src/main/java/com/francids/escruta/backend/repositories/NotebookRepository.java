package com.francids.escruta.backend.repositories;

import com.francids.escruta.backend.entities.Notebook;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
public interface NotebookRepository extends CrudRepository<Notebook, UUID> {
    List<Notebook> findByUserId(UUID userId);

    boolean existsByIdAndUserId(UUID notebookId, UUID userId);

    @Transactional
    @Modifying
    @Query("UPDATE Notebook n SET n.summary = :summary WHERE n.id = :notebookId")
    void updateSummary(UUID notebookId, String summary);
}
