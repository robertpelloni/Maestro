use std::time::Duration;
use tokio::time::sleep;

pub struct ShellPilotAgent {}

impl ShellPilotAgent {
    pub fn new() -> Self {
        Self {}
    }

    pub async fn predict_next_command(&self, history: Vec<String>) -> Result<String, String> {
        sleep(Duration::from_millis(150)).await;
        Ok(format!("Predicted command based on {} history items: git status", history.len()))
    }
}
