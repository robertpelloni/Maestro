# Maestro Codebase Memory & Observations

## Architectural State (v0.15.6)

- **Hybrid Migration**: The codebase is currently living in two worlds. The frontend (`src/renderer`) is highly stable, but the backend is split between legacy Node.js IPC handlers (`src/main`) and the new high-performance Go services (`/go/internal`).
- **State Management**: Zustand is the standard for frontend state. React Context is used sparingly.
- **Data Persistence**: The Go `PersistenceService` is replacing `electron-store`. Avoid direct `localStorage` calls in the React frontend, as they conflict with sandboxed environments and extensions (e.g., Obsidian Clipper issues).
- **Process Management**: The terminal implementation relies heavily on `xterm.js`. The backend uses `github.com/creack/pty` in Go, which correctly handles ANSI escape codes and terminal resizing.

## Technical Debt & Refactoring Targets

- **shellLogs Deprecation**: Multiple hooks (`useInputProcessing`, `useAgentListeners`) still rely on the legacy `shellLogs` array. These must be migrated to the new persistent PTY-backed terminal tabs.
- **Duplicate Types**: We frequently encounter duplicate type definitions between the frontend TS types and the Go structs. A unified generation pipeline (like `go-to-ts`) should be considered.
