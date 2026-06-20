package com.maestro.agent;

import java.util.concurrent.CompletableFuture;

public class RovoAgent {
    public CompletableFuture<String> queryEnterpriseGraph(String query) {
        return CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(400); } catch (InterruptedException e) {}
            return "Enterprise graph results for: " + query;
        });
    }

    public CompletableFuture<Void> transitionIssueStatus(String issueKey, String status) {
        return CompletableFuture.runAsync(() -> {
            System.out.println("Transitioned " + issueKey + " to " + status);
            try { Thread.sleep(200); } catch (InterruptedException e) {}
        });
    }
}
