package com.maestro.agent;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public class LiteLlmAgent {
    private List<String> fallbacks = new ArrayList<>();

    public void configureFallbacks(List<String> models) {
        this.fallbacks = models;
        System.out.println("Configured fallback models: " + String.join(", ", models));
    }

    public CompletableFuture<String> standardizeModelPayload(String payload) {
        return CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(50); } catch (InterruptedException e) {}
            return "{\"standardized\": true, \"raw\": \"" + payload + "\"}";
        });
    }
}
