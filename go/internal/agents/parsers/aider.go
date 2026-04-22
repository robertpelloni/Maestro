package parsers

import (
	"strings"
)

type AiderParser struct{}

func NewAiderParser() *AiderParser {
	return &AiderParser{}
}

func (p *AiderParser) ParseOutput(output string) (string, bool, error) {
	isDone := strings.Contains(output, "Commit") || strings.Contains(output, "Tokens:")
	return output, isDone, nil
}
