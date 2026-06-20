package com.maestro.agent;

import java.util.concurrent.CompletableFuture;

public class LlamafileAgent {
    private String localEndpoint = "";

    public CompletableFuture<String> spawnLocalModel(String binaryPath) {
        return CompletableFuture.supplyAsync(() -> {
            System.out.println("Spawning local model process: " + binaryPath);
            try { Thread.sleep(400); } catch (InterruptedException e) {}
            this.localEndpoint = "http://localhost:8080";
            return this.localEndpoint;
        });
    }
}
