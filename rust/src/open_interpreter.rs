use std::time::Duration;
use tokio::time::sleep;

pub struct OpenInterpreterAgent {}

impl OpenInterpreterAgent {
    pub fn new() -> Self {
        Self {}
    }

    pub async fn execute_in_repl(&self, code: &str) -> Result<String, String> {
        sleep(Duration::from_millis(200)).await;
        Ok(format!("REPL execution output for: {}", code))
    }

    pub fn capture_screen(&self) -> String {
        "base64_encoded_screen_capture".to_string()
    }

    pub fn execute_mouse_click(&self, x: i32, y: i32) {
        println!("Executed mouse click at ({}, {})", x, y);
    }
}
