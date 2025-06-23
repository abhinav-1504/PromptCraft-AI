package com.example.SpringAi.controller;

import com.example.SpringAi.model.RecipeRequest;
import com.example.SpringAi.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {
    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping
    public String generateRecipe(@RequestBody RecipeRequest request) {
        return recipeService.generateRecipe(request.getIngredients());
    }
}
