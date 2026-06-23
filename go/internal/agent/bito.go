package agent

import (
	"context"
	"fmt"
	"strings"
	"time"
)

// BitoAgent represents the Go port of the Bito CLI functionality
type BitoAgent struct {
	BaseAgent
	ModelProfile string
	MaxContext   int
}

func NewBitoAgent() *BitoAgent {
	return &BitoAgent{
		ModelProfile: "ADVANCED",
		MaxContext:   240000,
	}
}

// SetModelProfile changes the model restriction tier (BASIC vs ADVANCED)
func (a *BitoAgent) SetModelProfile(profile string) {
	if profile == "BASIC" {
		a.MaxContext = 40000
	} else {
		a.MaxContext = 240000
	}
	a.ModelProfile = profile
	fmt.Printf("Bito Model Profile set to: %s (Limit: %d)\n", profile, a.MaxContext)
}

// InjectPromptMacro injects the provided file content into the prompt template
func (a *BitoAgent) InjectPromptMacro(ctx context.Context, template string, fileContent string) (string, error) {
	time.Sleep(50 * time.Millisecond)

	result := strings.ReplaceAll(template, "{{%input%}}", fileContent)

	if len(result) > a.MaxContext {
		return "", fmt.Errorf("injected prompt exceeds maximum context length of %d", a.MaxContext)
	}

	return result, nil
}
