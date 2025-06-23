package com.example.SpringAi.service;

import org.springframework.ai.openai.OpenAiChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
    private final OpenAiChatClient chatClient;

    @Autowired
    public ChatService(OpenAiChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public String getChatResponse(String prompt) {
        return chatClient.call(prompt);
    }
}