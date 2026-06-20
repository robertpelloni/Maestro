package agent

import (
	"context"
	"fmt"
	"time"
)

type PiAgent struct {
	BaseAgent
}

func NewPiAgent() *PiAgent {
	return &PiAgent{}
}

func (a *PiAgent) ScanMonorepoWorkspaces(ctx context.Context, directory string) ([]string, error) {
	fmt.Printf("Scanning monorepo workspaces in %s...\n", directory)
	time.Sleep(200 * time.Millisecond)
	return []string{"packages/core", "packages/web", "apps/desktop"}, nil
}
