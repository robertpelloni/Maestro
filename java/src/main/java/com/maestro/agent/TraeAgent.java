package com.maestro.agent;

public class TraeAgent {
    private boolean builderMode = false;

    public void setBuilderMode(boolean enabled) {
        this.builderMode = enabled;
        System.out.println("Trae Builder Mode set to: " + enabled);
    }
}
