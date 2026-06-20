package agent

import (
	"context"
	"fmt"
	"time"
)

type LiteLlmAgent struct {
	BaseAgent
	Fallbacks []string
}

func NewLiteLlmAgent() *LiteLlmAgent {
	return &LiteLlmAgent{
		Fallbacks: make([]string, 0),
	}
}

func (a *LiteLlmAgent) ConfigureFallbacks(models []string) {
	a.Fallbacks = models
	fmt.Printf("Configured fallback models: %v\n", models)
}

func (a *LiteLlmAgent) StandardizeModelPayload(ctx context.Context, payload string) (string, error) {
	time.Sleep(50 * time.Millisecond)
	return fmt.Sprintf(`{"standardized": true, "raw": "%s"}`, payload), nil
}
