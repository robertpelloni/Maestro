# Project Memory & Architectural Observations

## Core Architecture

- **Dual-Process System**: Strict Electron main/renderer split. The renderer has zero Node.js access. All communication routes through a highly secured `window.maestro` contextBridge in `preload.ts`.
- **Process Manager**: Handles both `node-pty` (interactive terminals) and standard child processes (AI agents via batch/stream-json mode).
- **Tab System**: Unified tab system (`UnifiedTabRef`) that gracefully interweaves AI chat tabs and File preview tabs. State is persisted so scroll position and edits survive app restarts.

## Coding Conventions

- **Indentation**: Tabs, absolutely NO spaces.
- **Error Handling**:
  - Main Process: Let critical errors throw so Sentry captures them. Handle expected errors explicitly.
  - Renderer/Services: Never throw. Catch and return safe fallback UI states to prevent white-screens.
- **Strict Scope Discipline**: Surgical precision is demanded. "Cleanups" of orthogonal code are prohibited unless explicitly authorized.

## Agent Integration

- Agents are treated as external CLIs running in batch mode (`--print --output-format json`). Maestro handles the UI, routing, and PTY management, while the agent handles the LLM interaction.
- The `Group Chat` system uses a powerful Moderator AI pattern to route questions via `@mentions` and synthesizes answers when all sub-agents complete their runs.

## Constraints & Limitations

- **Headless Shell Execution**: In certain CI/AI environments, arbitrary shell execution (`run_shell_command`) is denied by policy. This heavily restricts autonomous git operations and testing via AI agents. Testing and commits must often be handled manually by the user or through internal application integrations (like OpenSpec/SpecKit).
