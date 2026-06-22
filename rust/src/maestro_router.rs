use crate::agents::aider::AiderAgent;
use crate::claude_code::ClaudeCodeAgent;
use crate::gemini_cli::GeminiCliAgent;
use crate::claude_desktop::ClaudeDesktopAgent;
use crate::codex_cli::CodexCliAgent;
use crate::opencode::OpenCodeAgent;
use crate::amazon_q::AmazonQAgent;
use crate::goose::GooseAgent;
use crate::ampcode::AmpCodeAgent;
use crate::augmentcode::AuggieAgent;
use crate::bito::BitoAgent;
use crate::byterover::ByteRoverAgent;
use crate::litellm::LiteLlmAgent;
use crate::llamafile::LlamafileAgent;
use crate::manus::ManusAgent;
use crate::mistral_vibe::MistralVibeAgent;
use crate::ollama::OllamaAgent;
use crate::open_interpreter::OpenInterpreterAgent;
use crate::pi::PiAgent;
use crate::qwen::QwenAgent;
use crate::rovo::RovoAgent;
use crate::shell_pilot::ShellPilotAgent;
use crate::smithery::SmitheryAgent;
use crate::trae::TraeAgent;
use crate::warp::WarpAgent;

pub struct MaestroRouter {
    pub aider: AiderAgent,
    pub claude_code: ClaudeCodeAgent,
    pub gemini: GeminiCliAgent,
    pub claude_desktop: ClaudeDesktopAgent,
    pub codex: CodexCliAgent,
    pub opencode: OpenCodeAgent,
    pub amazon_q: AmazonQAgent,
    pub goose: GooseAgent,
    pub ampcode: AmpCodeAgent,
    pub auggie: AuggieAgent,
    pub bito: BitoAgent,
    pub byte_rover: ByteRoverAgent,
    pub lite_llm: LiteLlmAgent,
    pub llamafile: LlamafileAgent,
    pub manus: ManusAgent,
    pub mistral_vibe: MistralVibeAgent,
    pub ollama: OllamaAgent,
    pub open_interpreter: OpenInterpreterAgent,
    pub pi: PiAgent,
    pub qwen: QwenAgent,
    pub rovo: RovoAgent,
    pub shell_pilot: ShellPilotAgent,
    pub smithery: SmitheryAgent,
    pub trae: TraeAgent,
    pub warp: WarpAgent,
}

impl Default for MaestroRouter {
    fn default() -> Self {
        Self::new()
    }
}

impl MaestroRouter {
    pub fn new() -> Self {
        Self {
            aider: AiderAgent::new(),
            claude_code: ClaudeCodeAgent::new(),
            gemini: GeminiCliAgent::new(),
            claude_desktop: ClaudeDesktopAgent::new(),
            codex: CodexCliAgent::new(),
            opencode: OpenCodeAgent::new(),
            amazon_q: AmazonQAgent::new(),
            goose: GooseAgent::new(),
            ampcode: AmpCodeAgent::new(),
            auggie: AuggieAgent::new(),
            bito: BitoAgent::new(),
            byte_rover: ByteRoverAgent::new(),
            lite_llm: LiteLlmAgent::new(),
            llamafile: LlamafileAgent::new(),
            manus: ManusAgent::new(),
            mistral_vibe: MistralVibeAgent::new(),
            ollama: OllamaAgent::new(),
            open_interpreter: OpenInterpreterAgent::new(),
            pi: PiAgent::new(),
            qwen: QwenAgent::new(),
            rovo: RovoAgent::new(),
            shell_pilot: ShellPilotAgent::new(),
            smithery: SmitheryAgent::new(),
            trae: TraeAgent::new(),
            warp: WarpAgent::new(),
        }
    }

    pub async fn auto_orchestrate(&mut self, prompt: &str) -> String {
        println!("[MaestroRouter] Starting orchestration for: {}", prompt);

        self.bito.set_model_profile("ADVANCED");
        self.codex.enable_o1_reasoning(true);
        self.trae.set_builder_mode(true);

        if let Ok(approved) = self.codex.request_user_approval("Auto Orchestrate Pipeline").await {
            if !approved {
                return "Orchestration cancelled due to missing approval or sandbox constraints.".to_string();
            }
        }

        let plan = self.claude_code.plan(prompt).await;
        println!("[MaestroRouter] Plan generated:\n{}", plan);

        self.claude_code.auto_drive("Applying plan modifications...").await;
        let solution = self.claude_code.solve(prompt).await;

        format!("[MaestroRouter] Completed. Final Solution: {}", solution)
    }
}
