package agent

import (
	"context"
	"fmt"
	"time"
)

type QwenAgent struct {
	BaseAgent
}

func NewQwenAgent() *QwenAgent {
	return &QwenAgent{}
}

func (a *QwenAgent) ExtractQwenContext(ctx context.Context, payload string) (string, error) {
	time.Sleep(100 * time.Millisecond)
	return fmt.Sprintf("Extracted multi-modal Qwen context from: %s", payload), nil
}
