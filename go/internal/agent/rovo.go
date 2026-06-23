package agent

import (
	"context"
	"fmt"
	"time"
)

type RovoAgent struct {
	BaseAgent
}

func NewRovoAgent() *RovoAgent {
	return &RovoAgent{}
}

func (a *RovoAgent) QueryEnterpriseGraph(ctx context.Context, query string) (string, error) {
	time.Sleep(400 * time.Millisecond)
	return fmt.Sprintf("Enterprise graph results for: %s", query), nil
}

func (a *RovoAgent) TransitionIssueStatus(ctx context.Context, issueKey, status string) error {
	fmt.Printf("Transitioned %s to %s\n", issueKey, status)
	time.Sleep(200 * time.Millisecond)
	return nil
}
