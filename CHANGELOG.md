# Changelog

## [v0.15.9] - 2026-04-23

### Changed

- Prepared Phase 3 of the Go Migration architecture.
- Documented Submodules Architecture and integration path.
- Updated HANDOFF and TODO for Wails Frontend Wiring.
- Synchronized local repositories with upstream.

## [v0.15.8] - 2026-04-22

### Added

- Implemented Go backend agent parsers (Adrenaline, Aider, Amazon Q, Factory, Gemini, Grok, Qwen, Claude, OpenCode).
- Implemented Go backend agent storage adapters.

### Changed

- Refactored frontend to complete Terminal Tabs migration.
- Removed legacy `shellLogs` from session types and React hooks.
- Finalized parent/child model for Git worktrees, eradicating `worktreeParentPath`.
- Deprecated legacy Electron IPC `runCommand` in favor of `process:spawnTerminalTab` PTY streaming.
- Incremented version from v0.15.7 to v0.15.8.

## [0.15.7] - 2026-04-12

### Added

- **Expanded CLI Roster**: Added support for ~30 new AI coding agents and CLIs including Adrenaline, Aider, Amazon Q, Amp Code, Auggie, Azure OpenAI, Code CLI, Codebuff, Codemachine, Copilot, Crush, Factory, Goose, Grok, Kilo, Kimi, Manus, Mistral, Ollama, Interpreter, Pi, Rovo, Trae, and Warp.
- **Go/TypeScript Hybrid Migration Phase 1**: Began the transition to a Wails v3 architecture. Ported agent definitions, detection logic, and SSH/File/Git backend services to native Go implementations (`/go/internal/`).

### Changed

- **Terminal Tabs Migration**: Removed legacy `shellLogs` dependencies in favor of persistent PTY-backed terminal tabs.
- **Worktree Management**: Deprecated legacy `worktreeParentPath` scanners in favor of a robust parent/child tree representation.

### Fixed

- **Legacy IPC Hooks**: Eliminated the deprecated `runCommand` handlers across the frontend to reduce terminal noise.

## [0.15.7] - 2026-04-12

### Added

- **Expanded CLI Roster**: Added support for ~30 new AI coding agents and CLIs including Adrenaline, Aider, Amazon Q, Amp Code, Auggie, Azure OpenAI, Code CLI, Codebuff, Codemachine, Copilot, Crush, Factory, Goose, Grok, Kilo, Kimi, Manus, Mistral, Ollama, Interpreter, Pi, Rovo, Trae, and Warp.
- **Go/TypeScript Hybrid Migration Phase 1**: Began the transition to a Wails v3 architecture. Ported agent definitions, detection logic, and SSH/File/Git backend services to native Go implementations (`/go/internal/`).

### Changed

- **Terminal Tabs Migration**: Removed legacy `shellLogs` dependencies in favor of persistent PTY-backed terminal tabs.
- **Worktree Management**: Deprecated legacy `worktreeParentPath` scanners in favor of a robust parent/child tree representation.

### Fixed

- **Legacy IPC Hooks**: Eliminated the deprecated `runCommand` handlers across the frontend to reduce terminal noise.

## [0.15.6] - 2026-04-01

### Added

- **Go/TypeScript Hybrid**: Initialized a Wails-based architecture to replace Electron, transitioning the backend to Go.
- **Go Backend Services**: Ported Git, PTY/Process, Storage, Filesystem, and SSH services to Go for higher performance and lower memory footprint.

### Changed

- **DevTools**: Removed unsupported devtools script injection in the production HTML template.

### Fixed

- **CSP Policy**: Relaxed Content Security Policy in development to permit local websocket and devtools connections.
- **React Components**: Fixed duplicate type declarations and incorrect import paths for `MermaidRenderer`.
- **Storage Layer**: Resolved duplicate function signatures in the OpenCode SQLite session implementation.

## [0.15.5] - 2026-03-25

### Added

- **Hypercode Assimilation**: Full integration with the Hypercode ecosystem.
- **Remote Execution**: Native support for SSH remote execution for all agent types.
- **Maestro Symphony**: New collaborative workflow engine for large-scale projects.
- **Director's Notes**: Cross-session history and AI-powered architectural synopsis.
- **HypercodeGuard**: Comprehensive security validation layer for sandboxed execution.
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
