use std::time::Duration;
use tokio::time::sleep;

pub struct WarpAgent {}

impl WarpAgent {
    pub fn new() -> Self {
        Self {}
    }

    pub async fn parse_terminal_block(&self, pty_stream: &str) -> Result<String, String> {
        sleep(Duration::from_millis(50)).await;
        Ok(format!("Parsed semantic block from PTY stream size: {}", pty_stream.len()))
    }
}
