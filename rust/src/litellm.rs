use std::time::Duration;
use tokio::time::sleep;

pub struct LiteLlmAgent {
    pub fallbacks: Vec<String>,
}

impl LiteLlmAgent {
    pub fn new() -> Self {
        Self { fallbacks: Vec::new() }
    }

    pub fn configure_fallbacks(&mut self, models: Vec<String>) {
        self.fallbacks = models;
        println!("Configured fallback models: {:?}", self.fallbacks);
    }

    pub async fn standardize_model_payload(&self, payload: &str) -> Result<String, String> {
        sleep(Duration::from_millis(50)).await;
        Ok(format!(r#"{{"standardized": true, "raw": "{}"}}"#, payload))
    }
}
