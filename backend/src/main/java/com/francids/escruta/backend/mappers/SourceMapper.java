package com.francids.escruta.backend.mappers;

import com.francids.escruta.backend.dtos.source.SourceCreationDTO;
import com.francids.escruta.backend.dtos.source.SourceFileCreationDTO;
import com.francids.escruta.backend.dtos.source.SourceUpdateDTO;
import com.francids.escruta.backend.entities.Notebook;
import com.francids.escruta.backend.entities.Source;
import org.springframework.stereotype.Component;

@Component
public class SourceMapper {
    public Source toSource(SourceCreationDTO dto, Notebook notebook, String content, boolean isGeneratedByAi) {
        Source source = new Source();
        source.setNotebook(notebook);
        source.setIcon(dto.icon());
        source.setTitle(dto.title());
        source.setLink(dto.link());
        source.setContent(content);
        source.setConvertedByAi(isGeneratedByAi);
        return source;
    }

    public Source toSource(SourceFileCreationDTO dto, Notebook notebook, String content, boolean isGeneratedByAi) {
        Source source = new Source();
        source.setNotebook(notebook);
        source.setIcon(dto.icon());
        source.setTitle(dto.title());
        source.setContent(content);
        source.setConvertedByAi(isGeneratedByAi);
        return source;
    }

    public void updateSourceFromDto(SourceUpdateDTO dto, Source source) {
        if (dto.icon() != null)
            source.setIcon(dto.icon());
        if (dto.title() != null)
            source.setTitle(dto.title());
    }
}
