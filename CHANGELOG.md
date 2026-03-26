# Changelog

## [0.15.5] - 2026-03-25

### Added

- **Borg Assimilation**: Full integration with the Borg ecosystem.
- **Remote Execution**: Native support for SSH remote execution for all agent types.
- **Maestro Symphony**: New collaborative workflow engine for large-scale projects.
- **Director's Notes**: Cross-session history and AI-powered architectural synopsis.
- **BorgGuard**: Comprehensive security validation layer for sandboxed execution.
- **Universal LLM Instructions**: Unified instruction set for all AI agents.

### Changed

- **Zustand Migration**: Migrated application settings and stats to a centralized Zustand store.
- **Process Manager**: Refactored `spawn` to be asynchronous with built-in security gating.
- **OpenCode Storage**: Switched to SQLite-backed session management for improved reliability.
- **Markdown Rendering**: Enhanced security with DOMPurify and unified Mermaid diagram handling.

### Fixed

- **Type Safety**: Resolved extensive TypeScript errors in the main process and shared components.
- **Windows PATH Resolution**: Improved command execution logic for .cmd and .bat files.
- **SSH Escaping**: Resolved prompt corruption issues via a new stdin-based execution bypass.
- **Vite/Electron DevTools**: Suppressed connection errors and fixed missing icon warnings.
