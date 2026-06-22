pub struct MistralVibeAgent {
    pub vibe_profile: String,
}

impl MistralVibeAgent {
    pub fn new() -> Self {
        Self { vibe_profile: "default".to_string() }
    }

    pub fn set_vibe_profile(&mut self, profile: &str) {
        self.vibe_profile = profile.to_string();
        println!("Vibe profile set to: {}", profile);
    }
}
