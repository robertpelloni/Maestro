package parsers

import (
	"strings"
)

type GrokParser struct{}

func NewGrokParser() *GrokParser {
	return &GrokParser{}
}

func (p *GrokParser) ParseOutput(output string) (string, bool, error) {
	isDone := strings.Contains(output, "Grok analysis complete")
	return output, isDone, nil
}
