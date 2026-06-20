pub struct TraeAgent {
    pub builder_mode: bool,
}

impl TraeAgent {
    pub fn new() -> Self {
        Self { builder_mode: false }
    }

    pub fn set_builder_mode(&mut self, enabled: bool) {
        self.builder_mode = enabled;
        println!("Trae Builder Mode set to: {}", enabled);
    }
}
