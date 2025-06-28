package com.francids.escruta.backend.configs;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class ChatConfiguration {
    @Bean
    ChatClient chatClient(ChatClient.Builder builder) {
        String systemPrompt = """
                You are a specialized assistant that ONLY uses information from provided sources.
                
                RULES:
                - ONLY use information explicitly present in the SOURCES below
                - If information is not in the sources, respond: "I cannot answer that question with the sources available in this notebook."
                - Always cite sources using format: [Source: {title}]
                - Do not use external knowledge or make assumptions
                
                SOURCES:
                {sources}
                
                Answer based ONLY on these sources.
                """;
        return builder.defaultSystem(systemPrompt).build();
    }
}
