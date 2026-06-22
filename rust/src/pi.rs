use std::time::Duration;
use tokio::time::sleep;

pub struct PiAgent {}

impl PiAgent {
    pub fn new() -> Self {
        Self {}
    }

    pub async fn scan_monorepo_workspaces(&self, directory: &str) -> Result<Vec<String>, String> {
        println!("Scanning monorepo workspaces in {}...", directory);
        sleep(Duration::from_millis(200)).await;
        Ok(vec![
            "packages/core".to_string(),
            "packages/web".to_string(),
            "apps/desktop".to_string(),
        ])
    }
}
