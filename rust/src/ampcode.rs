use std::time::Duration;
use tokio::time::sleep;

pub struct AmpCodeAgent {
    pub remote_host: String,
    pub is_syncing: bool,
}

impl AmpCodeAgent {
    pub fn new() -> Self {
        Self {
            remote_host: "localhost".to_string(),
            is_syncing: false,
        }
    }

    pub async fn start_file_sync(&mut self, remote: &str) -> Result<(), String> {
        self.remote_host = remote.to_string();
        self.is_syncing = true;
        println!("Started bi-directional file sync to remote: {}", remote);
        sleep(Duration::from_millis(100)).await;
        Ok(())
    }

    pub async fn run_remote_command(&self, command: &str) -> Result<String, String> {
        if !self.is_syncing {
            return Err("Must establish file sync before executing remote commands".to_string());
        }
        sleep(Duration::from_millis(300)).await;
        Ok(format!("[Remote: {}] Executed: {}", self.remote_host, command))
    }
}
