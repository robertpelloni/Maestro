package agent

import (
	"context"
	"fmt"
	"strings"
	"time"
)

// OpenCodeAgent represents the Go port of the OpenCode CLI functionality
type OpenCodeAgent struct {
	BaseAgent
	CustomCommands map[string]string
	LspEnabled     bool
}

// NewOpenCodeAgent initializes a new OpenCode agent
func NewOpenCodeAgent() *OpenCodeAgent {
	return &OpenCodeAgent{
		CustomCommands: make(map[string]string),
		LspEnabled:     true,
	}
}

// LoadCustomCommand registers a markdown prompt template
func (a *OpenCodeAgent) LoadCustomCommand(id, template string) {
	a.CustomCommands[id] = template
	fmt.Printf("Loaded custom command macro: %s\n", id)
}

// ExecuteCustomCommand interpolates variables into the template and runs it
func (a *OpenCodeAgent) ExecuteCustomCommand(ctx context.Context, id string, args map[string]string) (string, error) {
	template, ok := a.CustomCommands[id]
	if !ok {
		return "", fmt.Errorf("custom command not found: %s", id)
	}

	for k, v := range args {
		template = strings.ReplaceAll(template, fmt.Sprintf("$%s", k), v)
	}

	time.Sleep(100 * time.Millisecond)
	return fmt.Sprintf("Executed macro '%s' resulting in: %s", id, template), nil
}

// RequestLspDiagnostics simulates fetching JSON-RPC diagnostics from an LSP
func (a *OpenCodeAgent) RequestLspDiagnostics(ctx context.Context, filepath string) (string, error) {
	if !a.LspEnabled {
		return "", fmt.Errorf("LSP is currently disabled")
	}
	time.Sleep(150 * time.Millisecond)
	return fmt.Sprintf(`[{"file": "%s", "line": 42, "msg": "simulated lsp error"}]`, filepath), nil
}
