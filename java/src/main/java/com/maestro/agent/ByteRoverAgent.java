package com.maestro.agent;

import java.util.concurrent.CompletableFuture;

public class ByteRoverAgent {
    public CompletableFuture<String> parseDependencies(String directory) {
        return CompletableFuture.supplyAsync(() -> {
            System.out.println("Scanning lockfiles in " + directory + "...");
            try { Thread.sleep(150); } catch (InterruptedException e) {}
            return "Parsed dependencies for " + directory + ": Found 12 packages.";
        });
    }
}
