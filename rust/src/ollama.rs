use std::time::Duration;
use tokio::time::sleep;

pub struct OllamaAgent {}

impl OllamaAgent {
    pub fn new() -> Self {
        Self {}
    }

    pub async fn build_modelfile(&self, model_name: &str, _instructions: &str) -> Result<(), String> {
        println!("Building Modelfile for {}...", model_name);
        sleep(Duration::from_millis(300)).await;
        Ok(())
    }

    pub async fn pull_local_model(&self, model_name: &str) -> Result<(), String> {
        println!("Pulling local model: {}", model_name);
        sleep(Duration::from_millis(500)).await;
        Ok(())
    }
}
