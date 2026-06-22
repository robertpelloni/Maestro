package agent

import (
	"context"
	"fmt"
)

type MaestroRouter struct {
	Aider           *AiderAgent
	ClaudeCode      *ClaudeCodeAgent
	Gemini          *GeminiCliAgent
	ClaudeDesktop   *ClaudeDesktopAgent
	Codex           *CodexCliAgent
	OpenCode        *OpenCodeAgent
	AmazonQ         *AmazonQAgent
	Goose           *GooseAgent
	AmpCode         *AmpCodeAgent
	Auggie          *AuggieAgent
	Bito            *BitoAgent
	ByteRover       *ByteRoverAgent
	LiteLlm         *LiteLlmAgent
	Llamafile       *LlamafileAgent
	Manus           *ManusAgent
	MistralVibe     *MistralVibeAgent
	Ollama          *OllamaAgent
	OpenInterpreter *OpenInterpreterAgent
	Pi              *PiAgent
	Qwen            *QwenAgent
	Rovo            *RovoAgent
	ShellPilot      *ShellPilotAgent
	Smithery        *SmitheryAgent
	Trae            *TraeAgent
	Warp            *WarpAgent
}

func NewMaestroRouter() *MaestroRouter {
	return &MaestroRouter{
		Aider:           NewAiderAgent(),
		ClaudeCode:      NewClaudeCodeAgent(),
		Gemini:          NewGeminiCliAgent(),
		ClaudeDesktop:   NewClaudeDesktopAgent(),
		Codex:           NewCodexCliAgent(),
		OpenCode:        NewOpenCodeAgent(),
		AmazonQ:         NewAmazonQAgent(),
		Goose:           NewGooseAgent(),
		AmpCode:         NewAmpCodeAgent(),
		Auggie:          NewAuggieAgent(),
		Bito:            NewBitoAgent(),
		ByteRover:       NewByteRoverAgent(),
		LiteLlm:         NewLiteLlmAgent(),
		Llamafile:       NewLlamafileAgent(),
		Manus:           NewManusAgent(),
		MistralVibe:     NewMistralVibeAgent(),
		Ollama:          NewOllamaAgent(),
		OpenInterpreter: NewOpenInterpreterAgent(),
		Pi:              NewPiAgent(),
		Qwen:            NewQwenAgent(),
		Rovo:            NewRovoAgent(),
		ShellPilot:      NewShellPilotAgent(),
		Smithery:        NewSmitheryAgent(),
		Trae:            NewTraeAgent(),
		Warp:            NewWarpAgent(),
	}
}

func (m *MaestroRouter) AutoOrchestrate(ctx context.Context, prompt string) (string, error) {
	fmt.Printf("[MaestroRouter] Starting orchestration for: %s\n", prompt)

	m.Bito.SetModelProfile("ADVANCED")
	m.Codex.EnableO1Reasoning(true)
	m.Trae.SetBuilderMode(true)

	approved, err := m.Codex.RequestUserApproval(ctx, "Auto Orchestrate Pipeline")
	if err != nil || !approved {
		return "Orchestration cancelled due to missing approval or sandbox constraints.", nil
	}

	plan, _ := m.ClaudeCode.Plan(ctx, prompt)
	fmt.Printf("[MaestroRouter] Plan generated:\n%s\n", plan)

	_ = m.ClaudeCode.AutoDrive(ctx, "Applying plan modifications...")
	solution, _ := m.ClaudeCode.Solve(ctx, prompt)

	return fmt.Sprintf("[MaestroRouter] Completed. Final Solution: %s", solution), nil
}
