package com.francids.escruta.backend.dtos;

import com.francids.escruta.backend.entities.User;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
public class BasicUser {
    public BasicUser(User user) {
        this.id = user.getId();
        this.fullName = user.getFullName();
        this.email = user.getEmail();
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();
    }

    @NotNull
    private UUID id;

    @NotEmpty
    private String fullName;

    private String email;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
