package com.francids.escruta.backend.dtos;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class BasicUser {
    @NotNull
    private UUID id;

    @NotEmpty
    private String fullName;
}
