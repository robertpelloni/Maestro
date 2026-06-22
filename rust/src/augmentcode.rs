use std::collections::HashMap;
use std::time::Duration;
use tokio::time::sleep;

pub struct AuggieAgent {
    pub commands: HashMap<String, String>,
}

impl AuggieAgent {
    pub fn new() -> Self {
        Self {
            commands: HashMap::new(),
        }
    }

    pub fn load_frontmatter_command(&mut self, name: &str, content: &str) {
        self.commands.insert(name.to_string(), content.to_string());
        println!("Loaded frontmatter command: /{}", name);
    }

    pub async fn headless_print(&self, prompt: &str) -> Result<String, String> {
        sleep(Duration::from_millis(100)).await;
        Ok(format!("[CI OUTPUT] Successfully executed headless action for: {}", prompt))
    }
}
