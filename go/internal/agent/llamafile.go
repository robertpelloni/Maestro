package agent

import (
	"context"
	"fmt"
	"time"
)

type LlamafileAgent struct {
	BaseAgent
	LocalEndpoint string
}

func NewLlamafileAgent() *LlamafileAgent {
	return &LlamafileAgent{}
}

func (a *LlamafileAgent) SpawnLocalModel(ctx context.Context, binaryPath string) (string, error) {
	fmt.Printf("Spawning local model process: %s\n", binaryPath)
	time.Sleep(400 * time.Millisecond)
	a.LocalEndpoint = "http://localhost:8080"
	return a.LocalEndpoint, nil
}
