package agent

import (
	"context"
	"fmt"
	"time"
)

type OpenInterpreterAgent struct {
	BaseAgent
}

func NewOpenInterpreterAgent() *OpenInterpreterAgent {
	return &OpenInterpreterAgent{}
}

func (a *OpenInterpreterAgent) ExecuteInRepl(ctx context.Context, code string) (string, error) {
	time.Sleep(200 * time.Millisecond)
	return fmt.Sprintf("REPL execution output for: %s", code), nil
}

func (a *OpenInterpreterAgent) CaptureScreen() string {
	return "base64_encoded_screen_capture"
}

func (a *OpenInterpreterAgent) ExecuteMouseClick(x, y int) {
	fmt.Printf("Executed mouse click at (%d, %d)\n", x, y)
}
