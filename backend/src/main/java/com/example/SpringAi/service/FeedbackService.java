package com.example.SpringAi.service;

import com.example.SpringAi.repository.FeedbackRepository;
import com.example.SpringAi.entity.Feedback;
import com.example.SpringAi.model.FeedbackRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;

    @Autowired
    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public Feedback saveFeedback(FeedbackRequest request) {
        Feedback feedback = new Feedback();
        feedback.setType(request.getType());
        feedback.setContentId(request.getContentId());
        feedback.setRating(request.getRating());
        feedback.setComment(request.getComment());
        return feedbackRepository.save(feedback);
    }
}