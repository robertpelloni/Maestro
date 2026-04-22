package storage

// AgentStorage defines the interface for interacting with agent-specific storage (e.g., SQLite databases)
type AgentStorage interface {
	GetSessions(cwd string) ([]SessionInfo, error)
	GetSessionLog(sessionId string) (string, error)
}

type SessionInfo struct {
	ID        string
	Name      string
	UpdatedAt int64
}
