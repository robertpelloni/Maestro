package storage

// Placeholder for SQLite storage interactions used by agents like Claude Code and OpenCode
type SQLiteStorage struct {
	dbPath string
}

func NewSQLiteStorage(dbPath string) *SQLiteStorage {
	return &SQLiteStorage{dbPath: dbPath}
}

func (s *SQLiteStorage) GetSessions(cwd string) ([]SessionInfo, error) {
	// TODO: Implement actual SQLite query
	return []SessionInfo{}, nil
}

func (s *SQLiteStorage) GetSessionLog(sessionId string) (string, error) {
	// TODO: Implement actual SQLite query
	return "", nil
}
