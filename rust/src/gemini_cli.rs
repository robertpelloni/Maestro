use std::collections::HashMap;
use std::time::Duration;
use tokio::sync::mpsc;
use tokio::time::sleep;

pub struct GeminiCliAgent {
    pub use_search_grounding: bool,
    pub checkpoints: HashMap<String, String>,
}

impl GeminiCliAgent {
    pub fn new() -> Self {
        Self {
            use_search_grounding: true,
            checkpoints: HashMap::new(),
        }
    }

    pub async fn generate_with_grounding(&self, prompt: &str) -> String {
        sleep(Duration::from_millis(400)).await;
        let grounding = if self.use_search_grounding {
            "Searched Google for: latest context"
        } else {
            "Grounding disabled"
        };
        format!("Response for '{}' [{}]", prompt, grounding)
    }

    pub fn save_checkpoint(&mut self, name: &str, state: &str) {
        self.checkpoints.insert(name.to_string(), state.to_string());
    }

    pub fn load_checkpoint(&self, name: &str) -> Option<String> {
        self.checkpoints.get(name).cloned()
    }

    pub async fn stream_json(&self, prompt: &str) -> mpsc::Receiver<String> {
        let (tx, rx) = mpsc::channel(10);
        tokio::spawn(async move {
            for i in 0..3 {
                let msg = format!(r#"{{"chunk": {}, "content": "part {}"}}"#, i, i);
                if tx.send(msg).await.is_err() {
                    break;
                }
                sleep(Duration::from_millis(100)).await;
            }
        });
        rx
    }
}
