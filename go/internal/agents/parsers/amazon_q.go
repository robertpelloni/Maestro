package parsers

import (
	"strings"
)

type AmazonQParser struct{}

func NewAmazonQParser() *AmazonQParser {
	return &AmazonQParser{}
}

func (p *AmazonQParser) ParseOutput(output string) (string, bool, error) {
	isDone := strings.Contains(output, "Amazon Q completed")
	return output, isDone, nil
}
