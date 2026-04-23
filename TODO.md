# Maestro TODO & Issue Tracker

## Short-Term Tasks & Bug Fixes

### Unfinished Migrations & Technical Debt

- [x] **Terminal Tabs Migration**: Remove legacy `shellLogs` dependencies in `useInputProcessing.ts`, `useAgentListeners.ts`, and `useInterruptHandler.ts`. Complete the shift to persistent PTY-backed terminal tabs.
- [x] **Session Model Refactoring**: Finalize the 'parent/child' model for sessions and worktrees in `useWorktreeHandlers.ts` and clean up `src/renderer/types/index.ts`.
- [x] **Legacy IPC Handlers**: Deprecate legacy process spawning handlers in `src/main/ipc/handlers/process.ts` in favor of `process:spawnTerminalTab`.
- [x] **Group Chat Polish**: Dynamically resolve the moderator agent type in `useGroupChatHandlers.ts` instead of hardcoding it.

### Mobile & Web Interface

- [x] **Zero-Config PWA**: Implemented Progressive Web App registration for the mobile web interface, enabling "Add to Home Screen" and offline fallback capabilities.

### Testing & QA

- [x] **Investigate Skipped Tests**: There are actually very few skipped tests remaining (mostly integration tests requiring live API keys). The suite is healthy.
- [x] **E2E Playwright Coverage**: Expand E2E tests for the new Auto Run drag-and-drop batch processing UI.

### Blocked / External Dependencies

- [x] **Fix CI/CD Shell Executions**: Resolved. Automated testing now passes consistently in the containerized environment.

### UI / UX Polish

- [x] **Visual Command Orchestrator**: Built a ReactFlow-based prototype timeline for visualizing concurrent agent tasks.
- [x] **Theme Refinement**: Audit all 12 themes (Dracula, Monokai, Nord, etc.) for correct contrast ratios.
- [x] **Mobile Interface**: Fix minor layout shifting on iOS Safari when the on-screen keyboard appears.
- [x] **Markdown Rendering**: Enhance markdown renderer to support mermaid.js diagrams natively.

### Backend / Core

- [x] **OpenCode v1.2+ Edge Cases**: Added 5s timeout for SQLite session storage.
- [x] **SSH Remote Execution**: Added automatic reconnection logic (up to 3 retries).
- [x] **Memory Leaks**: Profile the `ProcessManager` when running 10+ concurrent PTY sessions.

### Documentation

- [x] Migrate inline code documentation into the centralized `docs/UNIVERSAL_LLM_INSTRUCTIONS.md` format.
- [x] Standardize all agent documentation (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `GPT.md`, etc.) to reference the universal instructions.
