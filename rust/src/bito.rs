use std::time::Duration;
use tokio::time::sleep;

pub struct BitoAgent {
    pub model_profile: String,
    pub max_context: usize,
}

impl BitoAgent {
    pub fn new() -> Self {
        Self {
            model_profile: "ADVANCED".to_string(),
            max_context: 240_000,
        }
    }

    pub fn set_model_profile(&mut self, profile: &str) {
        if profile == "BASIC" {
            self.max_context = 40_000;
        } else {
            self.max_context = 240_000;
        }
        self.model_profile = profile.to_string();
        println!("Bito Model Profile set to: {} (Limit: {})", self.model_profile, self.max_context);
    }

    pub async fn inject_prompt_macro(&self, template: &str, file_content: &str) -> Result<String, String> {
        sleep(Duration::from_millis(50)).await;

        let result = template.replace("{{%input%}}", file_content);

        if result.len() > self.max_context {
            return Err(format!("Injected prompt exceeds maximum context length of {}", self.max_context));
        }

        Ok(result)
    }
}
