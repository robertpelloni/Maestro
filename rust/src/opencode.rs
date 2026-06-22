use std::collections::HashMap;
use std::time::Duration;
use tokio::time::sleep;

pub struct OpenCodeAgent {
    pub custom_commands: HashMap<String, String>,
    pub lsp_enabled: bool,
}

impl OpenCodeAgent {
    pub fn new() -> Self {
        Self {
            custom_commands: HashMap::new(),
            lsp_enabled: true,
        }
    }

    pub fn load_custom_command(&mut self, id: &str, template: &str) {
        self.custom_commands.insert(id.to_string(), template.to_string());
        println!("Loaded custom command macro: {}", id);
    }

    pub async fn execute_custom_command(&self, id: &str, args: &HashMap<String, String>) -> Result<String, String> {
        let mut template = match self.custom_commands.get(id) {
            Some(t) => t.clone(),
            None => return Err(format!("Custom command not found: {}", id)),
        };

        for (k, v) in args {
            template = template.replace(&format!("${}", k), v);
        }

        sleep(Duration::from_millis(100)).await;
        Ok(format!("Executed macro '{}' resulting in: {}", id, template))
    }

    pub async fn request_lsp_diagnostics(&self, filepath: &str) -> Result<String, String> {
        if !self.lsp_enabled {
            return Err("LSP is currently disabled".to_string());
        }
        sleep(Duration::from_millis(150)).await;
        Ok(format!(r#"[{{ "file": "{}", "line": 42, "msg": "simulated lsp error" }}]"#, filepath))
    }
}
