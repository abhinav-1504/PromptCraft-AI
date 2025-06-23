package com.example.SpringAi.service;

import com.example.SpringAi.model.ImageRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ImageService {
    private static final Logger logger = LoggerFactory.getLogger(ImageService.class);

    @Value("${spring.ai.openai.api-key}")
    private String apiKey;

    private final RetryTemplate retryTemplate;
    private static final String OPENAI_IMAGE_ENDPOINT = "https://api.openai.com/v1/images/generations";

    public ImageService() {
        this.retryTemplate = RetryTemplate.builder()
                .maxAttempts(5) // Increased to 5 retries
                .exponentialBackoff(2000, 2.0, 30000) // 2s, 4s, 8s, 16s, 30s
                .retryOn(HttpClientErrorException.TooManyRequests.class)
                .build();
    }

    public String generateImage(ImageRequest request) {
        logger.info("Generating image for prompt: {}", request.getPrompt());
        try {
            return retryTemplate.execute(context -> {
                RestTemplate restTemplate = new RestTemplate();

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                headers.setBearerAuth(apiKey);

                Map<String, Object> body = new HashMap<>();
                body.put("model", "dall-e-3");
                body.put("prompt", request.getPrompt());
                body.put("size", request.getSize());
                body.put("quality", request.getQuality());
                body.put("n", 1);

                HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

                try {
                    logger.debug("Sending request to OpenAI: {}", body);
                    ResponseEntity<Map> response = restTemplate.exchange(
                            OPENAI_IMAGE_ENDPOINT,
                            HttpMethod.POST,
                            entity,
                            Map.class
                    );

                    Map<String, Object> responseBody = response.getBody();
                    if (responseBody != null && responseBody.containsKey("data")) {
                        @SuppressWarnings("unchecked")
                        List<Map<String, Object>> data = (List<Map<String, Object>>) responseBody.get("data");
                        if (!data.isEmpty()) {
                            String url = (String) data.get(0).get("url");
                            logger.info("Image generated successfully: {}", url);
                            return url;
                        }
                    }
                    logger.error("No URL in OpenAI response: {}", responseBody);
                    throw new RuntimeException("Failed to generate image: No URL in response");
                } catch (HttpClientErrorException e) {
                    logger.error("OpenAI API error: Status {}, Body {}", e.getStatusCode(), e.getResponseBodyAsString());
                    if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS) {
                        throw new HttpClientErrorException(HttpStatus.TOO_MANY_REQUESTS
                        );
                    }
                    throw new RuntimeException("OpenAI API error: " + e.getResponseBodyAsString(), e);
                }
            });
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS) {
                logger.warn("All retries failed for rate limit. Returning 429 to client.");
                throw e; // Propagate 429 to controller
            }
            throw e;
        }
    }
}