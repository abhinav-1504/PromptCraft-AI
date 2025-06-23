package com.example.SpringAi.service;

import com.example.SpringAi.model.TTSRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class TTSService {
    @Value("${spring.ai.openai.api-key}")
    private String apiKey;

    private static final String OPENAI_TTS_ENDPOINT = "https://api.openai.com/v1/audio/speech";

    public byte[] generateAudio(TTSRequest request) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> body = new HashMap<>();
        body.put("model", "tts-1");
        body.put("input", request.getText());
        body.put("voice", request.getVoice());
        body.put("response_format", "mp3");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<byte[]> response = restTemplate.exchange(
                OPENAI_TTS_ENDPOINT,
                HttpMethod.POST,
                entity,
                byte[].class
        );

        return response.getBody();
    }
}