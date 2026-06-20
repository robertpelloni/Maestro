package agent

import (
	"context"
	"fmt"
	"time"
)

// GeminiCliAgent represents the Go port of the Gemini CLI functionality
type GeminiCliAgent struct {
	BaseAgent
	UseSearchGrounding bool
	Checkpoints        map[string]string
}

// NewGeminiCliAgent initializes a new Gemini CLI agent
func NewGeminiCliAgent() *GeminiCliAgent {
	return &GeminiCliAgent{
		UseSearchGrounding: true,
		Checkpoints:        make(map[string]string),
	}
}

// GenerateWithGrounding queries the agent with Google Search grounding enabled
func (a *GeminiCliAgent) GenerateWithGrounding(ctx context.Context, prompt string) (string, error) {
	time.Sleep(400 * time.Millisecond)
	groundingInfo := "Searched Google for: latest context"
	if !a.UseSearchGrounding {
		groundingInfo = "Grounding disabled"
	}
	return fmt.Sprintf("Response for '%s' [%s]", prompt, groundingInfo), nil
}

// SaveCheckpoint saves the current conversation state
func (a *GeminiCliAgent) SaveCheckpoint(checkpointName string, state string) error {
	a.Checkpoints[checkpointName] = state
	return nil
}

// LoadCheckpoint restores the conversation state
func (a *GeminiCliAgent) LoadCheckpoint(checkpointName string) (string, error) {
	if state, ok := a.Checkpoints[checkpointName]; ok {
		return state, nil
	}
	return "", fmt.Errorf("checkpoint not found: %s", checkpointName)
}

// StreamJSON simulates JSON streaming output
func (a *GeminiCliAgent) StreamJSON(ctx context.Context, prompt string) (<-chan string, error) {
	ch := make(chan string)
	go func() {
		defer close(ch)
		for i := 0; i < 3; i++ {
			select {
			case <-ctx.Done():
				return
			default:
				ch <- fmt.Sprintf(`{"chunk": %d, "content": "part %d"}`, i, i)
				time.Sleep(100 * time.Millisecond)
			}
		}
	}()
	return ch, nil
}
