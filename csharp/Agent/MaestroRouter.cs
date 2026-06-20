using System;
using System.Threading.Tasks;

namespace Maestro.Agent
{
    public class MaestroRouter
    {
        public AiderAgent Aider { get; } = new AiderAgent();
        public ClaudeCodeAgent ClaudeCode { get; } = new ClaudeCodeAgent();
        public GeminiCliAgent Gemini { get; } = new GeminiCliAgent();
        public ClaudeDesktopAgent ClaudeDesktop { get; } = new ClaudeDesktopAgent();
        public CodexCliAgent Codex { get; } = new CodexCliAgent();
        public OpenCodeAgent OpenCode { get; } = new OpenCodeAgent();
        public AmazonQAgent AmazonQ { get; } = new AmazonQAgent();
        public GooseAgent Goose { get; } = new GooseAgent();
        public AmpCodeAgent AmpCode { get; } = new AmpCodeAgent();
        public AuggieAgent Auggie { get; } = new AuggieAgent();
        public BitoAgent Bito { get; } = new BitoAgent();
        public ByteRoverAgent ByteRover { get; } = new ByteRoverAgent();
        public LiteLlmAgent LiteLlm { get; } = new LiteLlmAgent();
        public LlamafileAgent Llamafile { get; } = new LlamafileAgent();
        public ManusAgent Manus { get; } = new ManusAgent();
        public MistralVibeAgent MistralVibe { get; } = new MistralVibeAgent();
        public OllamaAgent Ollama { get; } = new OllamaAgent();
        public OpenInterpreterAgent OpenInterpreter { get; } = new OpenInterpreterAgent();
        public PiAgent Pi { get; } = new PiAgent();
        public QwenAgent Qwen { get; } = new QwenAgent();
        public RovoAgent Rovo { get; } = new RovoAgent();
        public ShellPilotAgent ShellPilot { get; } = new ShellPilotAgent();
        public SmitheryAgent Smithery { get; } = new SmitheryAgent();
        public TraeAgent Trae { get; } = new TraeAgent();
        public WarpAgent Warp { get; } = new WarpAgent();

        public async Task<string> AutoOrchestrateAsync(string prompt)
        {
            Console.WriteLine($"[MaestroRouter] Starting orchestration for: {prompt}");

            Bito.SetModelProfile("ADVANCED");
            Codex.EnableO1Reasoning(true);
            Trae.SetBuilderMode(true);

            bool approved = await Codex.RequestUserApprovalAsync("Auto Orchestrate Pipeline");
            if (!approved)
            {
                return "Orchestration cancelled due to missing approval or sandbox constraints.";
            }

            string plan = await ClaudeCode.PlanAsync(prompt);
            Console.WriteLine($"[MaestroRouter] Plan generated:\n{plan}");

            await ClaudeCode.AutoDriveAsync("Applying plan modifications...");
            string solution = await ClaudeCode.SolveAsync(prompt);

            return $"[MaestroRouter] Completed. Final Solution: {solution}";
        }
    }
}
