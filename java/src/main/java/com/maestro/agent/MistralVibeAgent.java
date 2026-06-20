package com.maestro.agent;

public class MistralVibeAgent {
    private String vibeProfile = "default";

    public void setVibeProfile(String profile) {
        this.vibeProfile = profile;
        System.out.println("Vibe profile set to: " + profile);
    }
}
