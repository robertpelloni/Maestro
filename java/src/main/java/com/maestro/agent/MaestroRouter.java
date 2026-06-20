package com.maestro.agent;

import java.util.concurrent.CompletableFuture;

public class MaestroRouter {
    public final AiderAgent aider = new AiderAgent();
    public final ClaudeCodeAgent claudeCode = new ClaudeCodeAgent();
    public final GeminiCliAgent gemini = new GeminiCliAgent();
    public final ClaudeDesktopAgent claudeDesktop = new ClaudeDesktopAgent();
    public final CodexCliAgent codex = new CodexCliAgent();
    public final OpenCodeAgent openCode = new OpenCodeAgent();
    public final AmazonQAgent amazonQ = new AmazonQAgent();
    public final GooseAgent goose = new GooseAgent();
    public final AmpCodeAgent ampCode = new AmpCodeAgent();
    public final AuggieAgent auggie = new AuggieAgent();
    public final BitoAgent bito = new BitoAgent();
    public final ByteRoverAgent byteRover = new ByteRoverAgent();
    public final LiteLlmAgent liteLlm = new LiteLlmAgent();
    public final LlamafileAgent llamafile = new LlamafileAgent();
    public final ManusAgent manus = new ManusAgent();
    public final MistralVibeAgent mistralVibe = new MistralVibeAgent();
    public final OllamaAgent ollama = new OllamaAgent();
    public final OpenInterpreterAgent openInterpreter = new OpenInterpreterAgent();
    public final PiAgent pi = new PiAgent();
    public final QwenAgent qwen = new QwenAgent();
    public final RovoAgent rovo = new RovoAgent();
    public final ShellPilotAgent shellPilot = new ShellPilotAgent();
    public final SmitheryAgent smithery = new SmitheryAgent();
    public final TraeAgent trae = new TraeAgent();
    public final WarpAgent warp = new WarpAgent();

    public CompletableFuture<String> autoOrchestrate(String prompt) {
        System.out.println("[MaestroRouter] Starting orchestration for: " + prompt);

        bito.setModelProfile("ADVANCED");
        codex.enableO1Reasoning(true);
        trae.setBuilderMode(true);

        return codex.requestUserApproval("Auto Orchestrate Pipeline").thenCompose(approved -> {
            if (!approved) {
                return CompletableFuture.completedFuture("Orchestration cancelled due to missing approval or sandbox constraints.");
            }

            return claudeCode.plan(prompt).thenCompose(plan -> {
                System.out.println("[MaestroRouter] Plan generated:\n" + plan);
                return claudeCode.autoDrive("Applying plan modifications...").thenCompose(v -> {
                    return claudeCode.solve(prompt).thenApply(solution -> {
                        return "[MaestroRouter] Completed. Final Solution: " + solution;
                    });
                });
            });
        });
    }
}
