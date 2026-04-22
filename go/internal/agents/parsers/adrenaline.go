package parsers

import (
	"strings"
)

type AdrenalineParser struct{}

func NewAdrenalineParser() *AdrenalineParser {
	return &AdrenalineParser{}
}

func (p *AdrenalineParser) ParseOutput(output string) (string, bool, error) {
	// Adrenaline CLI typically returns plaintext.
	// We look for specific success/completion markers if batch mode is used.
	isDone := strings.Contains(output, "Adrenaline finished") || strings.Contains(output, "Task complete")
	return output, isDone, nil
}
