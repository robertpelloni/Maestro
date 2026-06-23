package agent

import (
	"context"
	"fmt"
	"time"
)

type OllamaAgent struct {
	BaseAgent
}

func NewOllamaAgent() *OllamaAgent {
	return &OllamaAgent{}
}

func (a *OllamaAgent) BuildModelfile(ctx context.Context, modelName string, instructions string) error {
	fmt.Printf("Building Modelfile for %s...\n", modelName)
	time.Sleep(300 * time.Millisecond)
	return nil
}

func (a *OllamaAgent) PullLocalModel(ctx context.Context, modelName string) error {
	fmt.Printf("Pulling local model: %s\n", modelName)
	time.Sleep(500 * time.Millisecond)
	return nil
}
