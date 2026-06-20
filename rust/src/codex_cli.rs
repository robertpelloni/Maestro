use std::time::Duration;
use tokio::time::sleep;

pub struct CodexCliAgent {
    pub sandbox_mode: String,
    pub reasoning_mode: bool,
}

impl CodexCliAgent {
    pub fn new() -> Self {
        Self {
            sandbox_mode: "workspace-write".to_string(),
            reasoning_mode: false,
        }
    }

    pub fn enable_o1_reasoning(&mut self, enabled: bool) {
        self.reasoning_mode = enabled;
        println!("O1 Reasoning mode set to: {}", enabled);
    }

    pub fn set_sandbox_mode(&mut self, mode: &str) {
        self.sandbox_mode = mode.to_string();
        println!("Sandbox mode set to: {}", mode);
    }

    pub async fn request_user_approval(&self, action: &str) -> Result<bool, String> {
        println!("[TUI Prompt] User approval required for: {}", action);
        sleep(Duration::from_millis(300)).await;

        if self.sandbox_mode == "read-only" {
            println!("[TUI] Action denied by read-only sandbox");
            return Ok(false);
        }

        println!("[TUI] Action approved");
        Ok(true)
    }
}
