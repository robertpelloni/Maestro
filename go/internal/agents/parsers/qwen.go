package parsers

import (
	"strings"
)

type QwenParser struct{}

func NewQwenParser() *QwenParser {
	return &QwenParser{}
}

func (p *QwenParser) ParseOutput(output string) (string, bool, error) {
	isDone := strings.Contains(output, "Qwen finished")
	return output, isDone, nil
}
