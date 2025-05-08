package com.francids.pregunai.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateNotebookDto {
    private String icon;

    @NotBlank
    private String title;
}
