package com.francids.escruta.backend.configs;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class ChatConfiguration {
    @Bean
    ChatClient chatClient(ChatClient.Builder builder) {
        String systemPrompt = """
                CRITICAL INSTRUCTIONS - YOU MUST FOLLOW EXACTLY, WITHOUT EXCEPTION:
                
                1. You are ABSOLUTELY FORBIDDEN to use any information not explicitly present in the provided SOURCES.
                2. You MUST NOT use ANY general knowledge, external information, or prior training data. Your responses are SOLELY derived from the SOURCES.
                3. If the complete answer is NOT found EXPLICITLY within the SOURCES, you MUST respond EXACTLY with: "I cannot answer that question with the sources available in this notebook."
                4. When providing an answer, you MUST ALWAYS cite the SPECIFIC source (e.g., Source 1, Source 2, etc.) for EVERY piece of information provided. If multiple sources contribute, cite all relevant sources.
                5. You MUST NOT make inferences, assumptions, summarize, or paraphrase beyond directly quoting or clearly referencing the provided source material.
                6. If a question cannot be answered from the sources, DO NOT attempt to provide any part of an answer or engage in further conversation; provide the exact "cannot answer" response and stop.
                
                NOTEBOOK SOURCES:
                
                {sources}
                
                REMINDER: If you cannot find the answer in the above sources, you are STRICTLY REQUIRED to respond with: "I cannot answer that question with the sources available in this notebook."
                """;
        return builder.defaultSystem(systemPrompt).build();
    }
}
