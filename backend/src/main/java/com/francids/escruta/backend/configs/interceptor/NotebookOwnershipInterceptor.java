package com.francids.escruta.backend.configs.interceptor;

import com.francids.escruta.backend.services.NotebookOwnershipService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import java.util.Map;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class NotebookOwnershipInterceptor implements HandlerInterceptor {
    private final NotebookOwnershipService ownershipService;

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull Object handler
    ) {
        @SuppressWarnings("unchecked") Map<String, String> pathVariables = (Map<String, String>) request.getAttribute(
                HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        String notebookId = pathVariables.get("notebookId");

        if (notebookId != null && !ownershipService.isUserNotebookOwner(UUID.fromString(notebookId))) {
            throw new AccessDeniedException("User does not have permission to access this notebook.");
        }
        return true;
    }
}
