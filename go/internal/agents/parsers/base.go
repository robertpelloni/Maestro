package parsers

// AgentParser defines the interface for parsing output from a specific CLI agent
type AgentParser interface {
	ParseOutput(output string) (parsed string, isDone bool, err error)
}
