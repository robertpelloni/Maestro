package agent

import (
	"context"
	"fmt"
	"time"
)

type ShellPilotAgent struct {
	BaseAgent
}

func NewShellPilotAgent() *ShellPilotAgent {
	return &ShellPilotAgent{}
}

func (a *ShellPilotAgent) PredictNextCommand(ctx context.Context, history []string) (string, error) {
	time.Sleep(150 * time.Millisecond)
	return fmt.Sprintf("Predicted command based on %d history items: git status", len(history)), nil
}
