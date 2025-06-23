package com.example.SpringAi.controller;

import com.example.SpringAi.entity.Feedback;
import com.example.SpringAi.model.FeedbackRequest;
import com.example.SpringAi.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    private final FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    public Feedback saveFeedback(@RequestBody FeedbackRequest request) {
        return feedbackService.saveFeedback(request);
    }
}