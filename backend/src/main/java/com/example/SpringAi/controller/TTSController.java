package com.example.SpringAi.controller;

import com.example.SpringAi.model.TTSRequest;
import com.example.SpringAi.service.TTSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tts")
public class TTSController {
    private final TTSService ttsService;

    @Autowired
    public TTSController(TTSService ttsService) {
        this.ttsService = ttsService;
    }

    @PostMapping(produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<byte[]> generateAudio(@RequestBody TTSRequest request) {
        byte[] audioBytes = ttsService.generateAudio(request);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDisposition(ContentDisposition.attachment().filename("speech.mp3").build());

        return new ResponseEntity<>(audioBytes, headers, HttpStatus.OK);
    }
}