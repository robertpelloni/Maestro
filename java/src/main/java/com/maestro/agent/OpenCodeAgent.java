package com.maestro.agent;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

public class OpenCodeAgent {
    private Map<String, String> customCommands = new HashMap<>();
    private boolean lspEnabled = true;

    public void loadCustomCommand(String id, String template) {
        customCommands.put(id, template);
        System.out.println("Loaded custom command macro: " + id);
    }

    public CompletableFuture<String> executeCustomCommand(String id, Map<String, String> args) {
        return CompletableFuture.supplyAsync(() -> {
            if (!customCommands.containsKey(id)) {
                throw new RuntimeException("Custom command not found: " + id);
            }
            String template = customCommands.get(id);
            for (Map.Entry<String, String> entry : args.entrySet()) {
                template = template.replace("$" + entry.getKey(), entry.getValue());
            }
            try { Thread.sleep(100); } catch (InterruptedException e) {}
            return "Executed macro '" + id + "' resulting in: " + template;
        });
    }

    public CompletableFuture<String> requestLspDiagnostics(String filepath) {
        return CompletableFuture.supplyAsync(() -> {
            if (!lspEnabled) {
                throw new RuntimeException("LSP is currently disabled");
            }
            try { Thread.sleep(150); } catch (InterruptedException e) {}
            return "[{\"file\": \"" + filepath + "\", \"line\": 42, \"msg\": \"simulated lsp error\"}]";
        });
    }
}
