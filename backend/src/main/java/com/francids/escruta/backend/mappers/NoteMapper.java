package com.francids.escruta.backend.mappers;

import com.francids.escruta.backend.dtos.note.NoteCreationDTO;
import com.francids.escruta.backend.dtos.note.NoteUpdateDTO;
import com.francids.escruta.backend.entities.Note;
import com.francids.escruta.backend.entities.Notebook;
import org.springframework.stereotype.Component;

@Component
public class NoteMapper {
    public Note toNote(NoteCreationDTO dto, Notebook notebook) {
        Note note = new Note();
        note.setNotebook(notebook);
        note.setIcon(dto.icon());
        note.setTitle(dto.title());
        note.setContent(dto.content());
        return note;
    }

    public void updateNoteFromDto(NoteUpdateDTO dto, Note note) {
        if (dto.icon() != null) note.setIcon(dto.icon());
        if (dto.title() != null) note.setTitle(dto.title());
        if (dto.content() != null) note.setContent(dto.content());
    }
}
