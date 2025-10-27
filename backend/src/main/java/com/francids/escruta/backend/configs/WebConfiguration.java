package com.francids.escruta.backend.configs;

import com.francids.escruta.backend.configs.interceptor.NotebookOwnershipInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
class WebConfiguration implements WebMvcConfigurer {
    private final NotebookOwnershipInterceptor notebookOwnershipInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(notebookOwnershipInterceptor);
        WebMvcConfigurer.super.addInterceptors(registry);
    }
}
