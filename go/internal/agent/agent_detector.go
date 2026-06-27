package agent

import (
	"log"
	"strings"
)

type Capability struct {
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Required    []string `json:"required"`
}

type AgentDetector struct {
	capabilities map[string]Capability
}

func NewAgentDetector() *AgentDetector {
	return &AgentDetector{
		capabilities: map[string]Capability{
			"aider":             {Name: "Aider", Description: "AI pair programming in your terminal"},
			"claude_code":       {Name: "Claude Code", Description: "Anthropic's terminal assistant"},
			"goose":             {Name: "Goose", Description: "Block's open source AI agent"},
			"open_interpreter":  {Name: "Open Interpreter", Description: "Let language models run code on your computer"},
			"claude_desktop":    {Name: "Claude Desktop", Description: "Claude desktop app"},
			"opencode":          {Name: "OpenCode", Description: "Open source coding assistant"},
			"bito":              {Name: "Bito", Description: "AI coding assistant"},
			"llamafile":         {Name: "Llamafile", Description: "Distribute and run LLMs with a single file"},
			"codex_cli":         {Name: "Codex CLI", Description: "CLI for OpenAI Codex"},
			"amazon_q":          {Name: "Amazon Q", Description: "AWS generative AI assistant"},
			"ollama":            {Name: "Ollama", Description: "Get up and running with large language models locally"},
			"litellm":           {Name: "LiteLLM", Description: "Call all LLM APIs using the OpenAI format"},
			"qwen":              {Name: "Qwen", Description: "Alibaba's LLM"},
			"mistral_vibe":      {Name: "Mistral Vibe", Description: "Mistral's CLI"},
			"shell_pilot":       {Name: "Shell Pilot", Description: "AI shell assistant"},
			"pi":                {Name: "Pi", Description: "Personal AI"},
			"smithery":          {Name: "Smithery", Description: "MCP server registry"},
			"trae":              {Name: "Trae", Description: "Adaptive AI IDE"},
			"warp":              {Name: "Warp", Description: "Modern terminal with AI"},
			"manus":             {Name: "Manus", Description: "AI agent"},
			"rovo":              {Name: "Rovo", Description: "Atlassian's AI agent"},
			"auggie":            {Name: "Auggie", Description: "AugmentCode CLI"},
			"byterover":         {Name: "ByteRover", Description: "Code intelligence"},
			"codebuff":          {Name: "Codebuff", Description: "AI coding agent"},
			"codemachine":       {Name: "Codemachine", Description: "AI coding machine"},
			"factory":           {Name: "Factory", Description: "Factory Droid AI"},
		},
	}
}

func (ad *AgentDetector) DetectAvailableAgents() []string {
	// For now, return all known agents
	var available []string
	for k := range ad.capabilities {
		available = append(available, k)
	}
	return available
}

func (ad *AgentDetector) GetCapabilityMap() map[string]Capability {
	return ad.capabilities
}

// CompactContext implements token-aware summarization by truncating or summarizing the string
// This is a naive implementation placeholder for roadmap step #6.
func (ad *AgentDetector) CompactContext(context string, maxTokens int) string {
	// Very naive word-based proxy for tokens
	words := strings.Fields(context)
	if len(words) <= maxTokens {
		return context
	}

	// Truncate to max tokens and append an indicator
	compacted := strings.Join(words[:maxTokens], " ")
	return compacted + " ... [Context Compacted]"
}

func init() {
	log.Println("AgentDetector initialized")
}
