package com.francids.escruta.backend.repositories;

import com.francids.escruta.backend.entities.Notebook;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotebookRepository extends CrudRepository<Notebook, Integer> {
}
