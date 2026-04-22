package parsers

import (
	"strings"
)

type GeminiParser struct{}

func NewGeminiParser() *GeminiParser {
	return &GeminiParser{}
}

func (p *GeminiParser) ParseOutput(output string) (string, bool, error) {
	isDone := strings.Contains(output, "Gemini finished")
	return output, isDone, nil
}
