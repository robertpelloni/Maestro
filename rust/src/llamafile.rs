use std::time::Duration;
use tokio::time::sleep;

pub struct LlamafileAgent {
    pub local_endpoint: String,
}

impl LlamafileAgent {
    pub fn new() -> Self {
        Self { local_endpoint: String::new() }
    }

    pub async fn spawn_local_model(&mut self, binary_path: &str) -> Result<String, String> {
        println!("Spawning local model process: {}", binary_path);
        sleep(Duration::from_millis(400)).await;
        self.local_endpoint = "http://localhost:8080".to_string();
        Ok(self.local_endpoint.clone())
    }
}
