package storage

import (
	"database/sql"
	"fmt"
	"time"

	_ "modernc.org/sqlite" // Pure Go SQLite driver
)

// SQLiteStorage provides methods to interact with agent SQLite databases (e.g. OpenCode, Claude Code)
type SQLiteStorage struct {
	dbPath string
}

func NewSQLiteStorage(dbPath string) *SQLiteStorage {
	return &SQLiteStorage{dbPath: dbPath}
}

// GetSessions queries the SQLite database for a list of recent sessions, usually filtered by project path
func (s *SQLiteStorage) GetSessions(cwd string) ([]SessionInfo, error) {
	db, err := sql.Open("sqlite", s.dbPath)
	if err != nil {
		return nil, fmt.Errorf("failed to open database at %s: %w", s.dbPath, err)
	}
	defer db.Close()

	// In reality, the table structure depends on the specific agent (e.g. opencode vs claude-code)
	// We'll implement a basic schema check to handle the most common OpenCode schema
	query := `
		SELECT id, name, updated_at
		FROM sessions
		WHERE project_path = ?
		ORDER BY updated_at DESC
		LIMIT 50
	`

	rows, err := db.Query(query, cwd)
	if err != nil {
		// Fallback for schemas that might not have project_path
		fallbackQuery := `
			SELECT id, name, updated_at
			FROM sessions
			ORDER BY updated_at DESC
			LIMIT 50
		`
		rows, err = db.Query(fallbackQuery)
		if err != nil {
			return nil, fmt.Errorf("failed to query sessions: %w", err)
		}
	}
	defer rows.Close()

	var sessions []SessionInfo
	for rows.Next() {
		var info SessionInfo
		var updatedAt interface{}

		if err := rows.Scan(&info.ID, &info.Name, &updatedAt); err != nil {
			continue // Skip malformed rows
		}

		// Handle potentially different timestamp formats
		switch v := updatedAt.(type) {
		case int64:
			info.UpdatedAt = v
		case float64:
			info.UpdatedAt = int64(v)
		case string:
			if t, err := time.Parse(time.RFC3339, v); err == nil {
				info.UpdatedAt = t.UnixMilli()
			}
		}

		sessions = append(sessions, info)
	}

	return sessions, nil
}

// GetSessionLog retrieves the full conversation log for a specific session ID
func (s *SQLiteStorage) GetSessionLog(sessionId string) (string, error) {
	db, err := sql.Open("sqlite", s.dbPath)
	if err != nil {
		return "", fmt.Errorf("failed to open database at %s: %w", s.dbPath, err)
	}
	defer db.Close()

	// Again, schema depends on the agent
	query := `
		SELECT content
		FROM messages
		WHERE session_id = ?
		ORDER BY created_at ASC
	`

	rows, err := db.Query(query, sessionId)
	if err != nil {
		return "", fmt.Errorf("failed to query messages for session %s: %w", sessionId, err)
	}
	defer rows.Close()

	var fullLog string
	for rows.Next() {
		var content string
		if err := rows.Scan(&content); err != nil {
			continue
		}
		fullLog += content + "\n\n"
	}

	return fullLog, nil
}
