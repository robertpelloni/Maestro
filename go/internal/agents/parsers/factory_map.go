package parsers

func GetParser(agentType string) AgentParser {
	switch agentType {
	case "adrenaline":
		return NewAdrenalineParser()
	case "aider":
		return NewAiderParser()
	case "amazon-q":
		return NewAmazonQParser()
	case "factory":
		return NewFactoryParser()
	case "gemini":
		return NewGeminiParser()
	case "grok":
		return NewGrokParser()
	case "qwen":
		return NewQwenParser()
	case "claude-code":
		return NewClaudeParser()
	case "opencode":
		return NewOpenCodeParser()
	default:
		// Default parser that just returns the output
		return &DefaultParser{}
	}
}

type DefaultParser struct{}

func (p *DefaultParser) ParseOutput(output string) (string, bool, error) {
	return output, false, nil
}
