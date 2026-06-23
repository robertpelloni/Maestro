package agent

import (
	"context"
	"fmt"
	"time"
)

// CodexCliAgent represents the Go port of the Codex CLI functionality
type CodexCliAgent struct {
	BaseAgent
	SandboxMode string
	ReasoningMode bool
}

// NewCodexCliAgent initializes a new Codex CLI agent
func NewCodexCliAgent() *CodexCliAgent {
	return &CodexCliAgent{
		SandboxMode:   "workspace-write",
		ReasoningMode: false,
	}
}

// EnableO1Reasoning toggles specific handling for O-series OpenAI models
func (a *CodexCliAgent) EnableO1Reasoning(enabled bool) {
	a.ReasoningMode = enabled
	fmt.Printf("O1 Reasoning mode set to: %v\n", enabled)
}

// SetSandboxMode configures the execution boundary (e.g. read-only)
func (a *CodexCliAgent) SetSandboxMode(mode string) {
	a.SandboxMode = mode
	fmt.Printf("Sandbox mode set to: %s\n", mode)
}

// RequestUserApproval simulates a TUI loop blocking for user input
func (a *CodexCliAgent) RequestUserApproval(ctx context.Context, action string) (bool, error) {
	fmt.Printf("[TUI Prompt] User approval required for: %s\n", action)
	// Simulate user considering the action
	time.Sleep(300 * time.Millisecond)
	if a.SandboxMode == "read-only" {
		fmt.Println("[TUI] Action denied by read-only sandbox")
		return false, nil
	}
	fmt.Println("[TUI] Action approved")
	return true, nil
}
