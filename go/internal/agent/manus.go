package agent

import (
	"context"
	"fmt"
	"time"
)

type ManusAgent struct {
	BaseAgent
	ContainerActive bool
}

func NewManusAgent() *ManusAgent {
	return &ManusAgent{ContainerActive: false}
}

func (a *ManusAgent) RequestRpaContainer(ctx context.Context) (string, error) {
	fmt.Println("Provisioning secure RPA container...")
	time.Sleep(300 * time.Millisecond)
	a.ContainerActive = true
	return "rpa-container-id-9912", nil
}
