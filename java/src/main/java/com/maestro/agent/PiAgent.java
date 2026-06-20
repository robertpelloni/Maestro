package com.maestro.agent;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public class PiAgent {
    public CompletableFuture<List<String>> scanMonorepoWorkspaces(String directory) {
        return CompletableFuture.supplyAsync(() -> {
            System.out.println("Scanning monorepo workspaces in " + directory + "...");
            try { Thread.sleep(200); } catch (InterruptedException e) {}
            return Arrays.asList("packages/core", "packages/web", "apps/desktop");
        });
    }
}
