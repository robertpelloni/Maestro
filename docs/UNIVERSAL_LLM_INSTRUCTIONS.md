# Universal LLM Instructions

This document serves as the single source of truth for all AI agents (Claude Code, Codex, OpenCode, Factory Droid, etc.) interacting with the Maestro repository.

## Operational Mandates

1.  **Process Preservation**: NEVER terminate the Vite development server (port 5173) or the Electron main process.
2.  **I/O Safety**: Use dedicated file-writing tools (`write_file`, `replace`). Avoid shell redirection (`>`) to prevent encoding corruption.
3.  **Borg Protocol**: Maestro is a Borg-native service. All architectural decisions must align with the Borg Service Layer specification.
4.  **Version Consistency**: Use the `VERSION` file as the absolute source of truth for the project version.

## Technical Architecture

- **Main Process**: Entry point is `src/main/index.ts`. Coordinates PTY sessions, IPC handlers, and Borg synchronization.
- **Renderer**: React + Vite + Tailwind. State management via Zustand stores (`src/renderer/stores/`).
- **Borg Integration**: Uses `BorgLiveProvider` for real-time state sync and `BorgGuard` for security validation.
- **Process Manager**: Handles both local PTY/ChildProcess spawns and remote SSH execution.

## Coding Standards

- **TypeScript**: Strict mode enabled. Prefer explicit types over `any`.
- **State**: Favor selector-based subscriptions to Zustand stores to minimize re-renders.
- **Tests**: All new features require Vitest unit tests in `src/__tests__`.

## Documentation

- `VISION.md`: Long-term project roadmap and philosophical alignment.
- `MEMORY.md`: Persistent log of major architectural changes and integrated features.
- `CHANGELOG.md`: Detailed, version-specific history of changes.
- `HANDOFF.md`: Current session state and immediate next steps.
