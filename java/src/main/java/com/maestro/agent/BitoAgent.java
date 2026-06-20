package com.maestro.agent;

import java.util.concurrent.CompletableFuture;

public class BitoAgent {
    private String modelProfile = "ADVANCED";
    private int maxContext = 240000;

    public void setModelProfile(String profile) {
        if ("BASIC".equals(profile)) {
            this.maxContext = 40000;
        } else {
            this.maxContext = 240000;
        }
        this.modelProfile = profile;
        System.out.println("Bito Model Profile set to: " + this.modelProfile + " (Limit: " + this.maxContext + ")");
    }

    public CompletableFuture<String> injectPromptMacro(String template, String fileContent) {
        return CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(50); } catch (InterruptedException e) {}

            String result = template.replace("{{%input%}}", fileContent);

            if (result.length() > this.maxContext) {
                throw new RuntimeException("Injected prompt exceeds maximum context length of " + this.maxContext);
            }

            return result;
        });
    }
}
