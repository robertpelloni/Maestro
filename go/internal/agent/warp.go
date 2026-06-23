package agent

import (
	"context"
	"fmt"
	"time"
)

type WarpAgent struct {
	BaseAgent
}

func NewWarpAgent() *WarpAgent {
	return &WarpAgent{}
}

func (a *WarpAgent) ParseTerminalBlock(ctx context.Context, ptyStream string) (string, error) {
	time.Sleep(50 * time.Millisecond)
	return fmt.Sprintf("Parsed semantic block from PTY stream size: %d", len(ptyStream)), nil
}
