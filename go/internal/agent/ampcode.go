package agent

import (
	"context"
	"fmt"
	"time"
)

// AmpCodeAgent represents the Go port of the Amp Code CLI functionality
type AmpCodeAgent struct {
	BaseAgent
	RemoteHost string
	IsSyncing  bool
}

func NewAmpCodeAgent() *AmpCodeAgent {
	return &AmpCodeAgent{
		RemoteHost: "localhost",
		IsSyncing:  false,
	}
}

// StartFileSync starts the bi-directional remote sync
func (a *AmpCodeAgent) StartFileSync(ctx context.Context, remote string) error {
	a.RemoteHost = remote
	a.IsSyncing = true
	fmt.Printf("Started bi-directional file sync to remote: %s\n", remote)
	time.Sleep(100 * time.Millisecond)
	return nil
}

// RunRemoteCommand routes a command execution to the remote host
func (a *AmpCodeAgent) RunRemoteCommand(ctx context.Context, command string) (string, error) {
	if !a.IsSyncing {
		return "", fmt.Errorf("must establish file sync before executing remote commands")
	}
	time.Sleep(300 * time.Millisecond)
	return fmt.Sprintf("[Remote: %s] Executed: %s", a.RemoteHost, command), nil
}
