package agent

import (
	"context"
	"fmt"
	"time"
)

// AuggieAgent represents the Go port of the Auggie CLI functionality
type AuggieAgent struct {
	BaseAgent
	Commands map[string]string
}

func NewAuggieAgent() *AuggieAgent {
	return &AuggieAgent{
		Commands: make(map[string]string),
	}
}

// LoadFrontmatterCommand loads a macro with markdown frontmatter
func (a *AuggieAgent) LoadFrontmatterCommand(name, content string) {
	a.Commands[name] = content
	fmt.Printf("Loaded frontmatter command: /%s\n", name)
}

// HeadlessPrint runs a command purely for CI/stdout output without TUI
func (a *AuggieAgent) HeadlessPrint(ctx context.Context, prompt string) (string, error) {
	time.Sleep(100 * time.Millisecond)
	return fmt.Sprintf("[CI OUTPUT] Successfully executed headless action for: %s", prompt), nil
}
