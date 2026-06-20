use std::collections::HashMap;
use std::time::Duration;
use tokio::time::sleep;

pub struct ClaudeDesktopAgent {
    pub mcp_servers: HashMap<String, String>,
    pub tray_active: bool,
}

impl ClaudeDesktopAgent {
    pub fn new() -> Self {
        Self {
            mcp_servers: HashMap::new(),
            tray_active: false,
        }
    }

    pub fn initialize_tray(&mut self) {
        self.tray_active = true;
        println!("Tray icon initialized.");
    }

    pub fn register_mcp_server(&mut self, name: &str, command: &str) {
        self.mcp_servers.insert(name.to_string(), command.to_string());
        println!("Registered MCP Server: {} -> {}", name, command);
    }

    pub async fn execute_mcp_tool(&self, server_name: &str, tool_name: &str) -> Result<String, String> {
        if !self.mcp_servers.contains_key(server_name) {
            return Err(format!("MCP Server {} not found", server_name));
        }
        sleep(Duration::from_millis(200)).await;
        Ok(format!("Executed tool {} on server {} successfully", tool_name, server_name))
    }

    pub fn read_clipboard(&self) -> String {
        "Clipboard content (simulated)".to_string()
    }
}
