package parsers

import (
	"testing"
)

func TestParsers(t *testing.T) {
	tests := []struct {
		agentType string
		input     string
		wantDone  bool
	}{
		{"adrenaline", "Running tests... Adrenaline finished successfully", true},
		{"adrenaline", "Processing your request...", false},
		{"aider", "Applied 3 changes. Commit abcdef123", true},
		{"aider", "Tokens: 1200 sent, 400 received", true},
		{"aider", "Generating diff...", false},
		{"amazon-q", "Amazon Q completed your task.", true},
		{"amazon-q", "Thinking...", false},
		{"factory", "Factory analysis complete. 4 files modified.", true},
		{"factory", "Analyzing AST...", false},
		{"gemini", "Gemini finished generating code.", true},
		{"gemini", "Reading context...", false},
		{"grok", "Grok analysis complete.", true},
		{"grok", "Synthesizing information...", false},
		{"qwen", "Qwen finished writing the test suite.", true},
		{"qwen", "Compiling output...", false},
		{"claude-code", "Tokens: 1500", true},
		{"claude-code", "Cost: $0.05", true},
		{"claude-code", "Reading file...", false},
		{"opencode", "OpenCode finished applying edits.", true},
		{"opencode", "Analyzing...", false},
		{"unknown", "Some output", false},
	}

	for _, tt := range tests {
		t.Run(tt.agentType, func(t *testing.T) {
			parser := GetParser(tt.agentType)
			_, isDone, err := parser.ParseOutput(tt.input)

			if err != nil {
				t.Fatalf("ParseOutput returned error: %v", err)
			}

			if isDone != tt.wantDone {
				t.Errorf("GetParser(%q).ParseOutput() isDone = %v, want %v", tt.agentType, isDone, tt.wantDone)
			}
		})
	}
}
