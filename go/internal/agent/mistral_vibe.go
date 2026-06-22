package agent

import (
	"context"
	"fmt"
	"time"
)

type MistralVibeAgent struct {
	BaseAgent
	VibeProfile string
}

func NewMistralVibeAgent() *MistralVibeAgent {
	return &MistralVibeAgent{VibeProfile: "default"}
}

func (a *MistralVibeAgent) SetVibeProfile(profile string) {
	a.VibeProfile = profile
	fmt.Printf("Vibe profile set to: %s\n", profile)
}
