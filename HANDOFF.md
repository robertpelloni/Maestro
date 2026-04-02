# Maestro Handoff Document

## Session Summary

**Date**: April 1, 2026
**Version**: 0.15.6

During this session, Maestro was transitioned into a **Go/TypeScript Hybrid** application using Wails v3. The legacy Electron backend is actively being deprecated.

### Completed Work:

1.  **Backend Translation**: All core services (Git, PTY Process Management, Session Storage, Filesystem, Persistence, and SSH) have been ported to Go.
2.  **Frontend Fixes**: Resolved critical Vite build errors (`cueSessionMap` duplication, `ALL_TYPES` duplication, `MermaidRenderer` import paths).
3.  **CSP Adjustments**: Relaxed Content Security Policy to allow React DevTools and local HMR connections in development.
4.  **Documentation Sweep**: Created `UNIVERSAL_LLM_INSTRUCTIONS.md`, generated `IDEAS.md`, `DASHBOARD.md`, and unified the agent instructions.

### Outstanding Tasks for Next Agent:

The next AI model (e.g., Claude Opus 4.6 or GPT Codex 5.3) should pick up the following tasks from `TODO.md`:

1.  **Terminal Tabs Migration**: Remove legacy `shellLogs` dependencies in `useInputProcessing.ts`, `useAgentListeners.ts`, and `useInterruptHandler.ts`. This is a critical technical debt item blocking the full transition to persistent PTY-backed terminal tabs.
2.  **Session Model Refactoring**: Finalize the 'parent/child' model for sessions and worktrees in `useWorktreeHandlers.ts`.

### Project State Notes:

- The Go backend is located in `/go`. The frontend remains in `/src/renderer`.
- All persistent state should be routed through `go/internal/persistence` rather than `localStorage` or `electron-store`.
- Submodules are currently empty, but the structure is prepped for future plugin expansion.
