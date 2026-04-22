package parsers

import (
	"strings"
)

type OpenCodeParser struct{}

func NewOpenCodeParser() *OpenCodeParser {
	return &OpenCodeParser{}
}

func (p *OpenCodeParser) ParseOutput(output string) (string, bool, error) {
	isDone := strings.Contains(output, "OpenCode finished")
	return output, isDone, nil
}
