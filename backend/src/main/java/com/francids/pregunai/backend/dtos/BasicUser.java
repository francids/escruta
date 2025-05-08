package com.francids.pregunai.backend.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BasicUser {
    @NotEmpty
    private Integer id;

    @NotEmpty
    private String fullName;
}
