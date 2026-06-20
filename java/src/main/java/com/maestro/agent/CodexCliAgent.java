package com.maestro.agent;

import java.util.concurrent.CompletableFuture;

public class CodexCliAgent {
    private String sandboxMode = "workspace-write";
    private boolean reasoningMode = false;

    public void enableO1Reasoning(boolean enabled) {
        this.reasoningMode = enabled;
        System.out.println("O1 Reasoning mode set to: " + enabled);
    }

    public void setSandboxMode(String mode) {
        this.sandboxMode = mode;
        System.out.println("Sandbox mode set to: " + mode);
    }

    public CompletableFuture<Boolean> requestUserApproval(String action) {
        return CompletableFuture.supplyAsync(() -> {
            System.out.println("[TUI Prompt] User approval required for: " + action);
            try { Thread.sleep(300); } catch (InterruptedException e) {}

            if ("read-only".equals(this.sandboxMode)) {
                System.out.println("[TUI] Action denied by read-only sandbox");
                return false;
            }

            System.out.println("[TUI] Action approved");
            return true;
        });
    }
}
