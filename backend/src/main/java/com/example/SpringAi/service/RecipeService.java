package com.example.SpringAi.service;

import org.springframework.ai.openai.OpenAiChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecipeService {
    private final OpenAiChatClient chatClient;

    @Autowired
    public RecipeService(OpenAiChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public String generateRecipe(String ingredients) {
        String prompt = "Generate a recipe using the following ingredients: " + ingredients;
        return chatClient.call(prompt);
    }
}