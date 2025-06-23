package com.example.SpringAi.model;

public class TTSRequest {
    private String text;
    private String voice = "alloy";

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getVoice() {
        return voice;
    }

    public void setVoice(String voice) {
        this.voice = voice;
    }
}

