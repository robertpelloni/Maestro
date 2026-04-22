package storage

func GetStorage(agentType string) AgentStorage {
	switch agentType {
	case "claude-code":
		// This would ideally resolve the user's home directory dynamically
		return NewSQLiteStorage("~/.claude.json") // Mock path for now
	case "opencode":
		return NewSQLiteStorage("~/.opencode/db.sqlite") // Mock path for now
	default:
		return &NoopStorage{}
	}
}

type NoopStorage struct{}

func (s *NoopStorage) GetSessions(cwd string) ([]SessionInfo, error) {
	return []SessionInfo{}, nil
}

func (s *NoopStorage) GetSessionLog(sessionId string) (string, error) {
	return "", nil
}
