package agents

import (
	"context"
)

// RepoMap handles codebase parsing and context relevance (based on tree-sitter/grep-ast).
type RepoMap interface {
	ParseRepository(root string) error
	CalculateRelevance(ctx context.Context, input string) ([]string, error)
}

// GitService handles committing and tracking dirty state.
type GitService interface {
	CommitChanges(message string) error
	GetModifiedFiles() ([]string, error)
}

// DiffApplicator handles search/replace block parsing.
type DiffApplicator interface {
	ApplySearchReplaceBlock(block string) error
	StreamPartialUpdates(updates <-chan string)
}

// LLMProvider abstracts the model backend.
type LLMProvider interface {
	StreamResponse(ctx context.Context, prompt string) (<-chan string, error)
}

// AiderAgent represents the core Aider logic port.
type AiderAgent struct {
	repoMap        RepoMap
	gitService     GitService
	diffApplicator DiffApplicator
	llmProvider    LLMProvider
}

// NewAiderAgent initializes a new AiderAgent.
func NewAiderAgent(rm RepoMap, gs GitService, da DiffApplicator, llm LLMProvider) *AiderAgent {
	return &AiderAgent{
		repoMap:        rm,
		gitService:     gs,
		diffApplicator: da,
		llmProvider:    llm,
	}
}

// RunAgent executes the main Aider loop.
func (a *AiderAgent) RunAgent(ctx context.Context, prompt string) error {
	// Not implemented
	return nil
}
