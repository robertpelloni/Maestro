package parsers

import (
	"strings"
)

type ClaudeParser struct{}

func NewClaudeParser() *ClaudeParser {
	return &ClaudeParser{}
}

func (p *ClaudeParser) ParseOutput(output string) (string, bool, error) {
	isDone := strings.Contains(output, "Cost:") || strings.Contains(output, "Tokens:")
	return output, isDone, nil
}
