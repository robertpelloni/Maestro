package parsers

import (
	"strings"
)

type FactoryParser struct{}

func NewFactoryParser() *FactoryParser {
	return &FactoryParser{}
}

func (p *FactoryParser) ParseOutput(output string) (string, bool, error) {
	isDone := strings.Contains(output, "Factory analysis complete")
	return output, isDone, nil
}
