package agent

import (
	"context"
	"fmt"
)

type TraeAgent struct {
	BaseAgent
	BuilderMode bool
}

func NewTraeAgent() *TraeAgent {
	return &TraeAgent{BuilderMode: false}
}

func (a *TraeAgent) SetBuilderMode(enabled bool) {
	a.BuilderMode = enabled
	fmt.Printf("Trae Builder Mode set to: %v\n", enabled)
}
