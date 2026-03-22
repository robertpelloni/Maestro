# Maestro TODO & Issue Tracker

## Short-Term Tasks & Bug Fixes

### Mobile & Web Interface

- [x] **Zero-Config PWA**: Implemented Progressive Web App registration for the mobile web interface, enabling "Add to Home Screen" and offline fallback capabilities.

### Testing & QA

- [x] **Investigate Skipped Tests**: There are still ~70 skipped tests in the Vitest suite. Analyze and re-enable or deprecate these tests.
- [x] **E2E Playwright Coverage**: Expand E2E tests for the new Auto Run drag-and-drop batch processing UI.

### Blocked / External Dependencies

- [ ] **Fix CI/CD Shell Executions**: `run_shell_command` via `npm run test` is being denied by policy in headless/AI environments. This requires a change to the `policies/maestro.toml` file in the extension host, which is outside the current workspace boundary.

### UI / UX Polish

- [x] **Visual Command Orchestrator**: Built a ReactFlow-based prototype timeline for visualizing concurrent agent tasks, fulfilling a core `IDEAS.md` concept.
- [x] **Theme Refinement**: Audit all 12 themes (Dracula, Monokai, Nord, etc.) for correct contrast ratios on the new `DocumentGraph` nodes.
- [x] **Mobile Interface**: Fix minor layout shifting on iOS Safari when the on-screen keyboard appears during Group Chat interactions.
- [x] **Markdown Rendering**: Enhance markdown renderer to support mermaid.js diagrams natively inside AI chat responses.

### Backend / Core

- [x] **OpenCode v1.2+ Edge Cases**: Added 5s timeout for SQLite session storage to handle busy/locked databases.
- [x] **SSH Remote Execution**: Added automatic reconnection logic (up to 3 retries) for recoverable SSH errors in ProcessManager.
- [x] **Memory Leaks**: Profile the `ProcessManager` when running 10+ concurrent PTY sessions to ensure zombie processes are correctly reaped upon agent deletion.

### Documentation

- [x] Migrate inline code documentation into the centralized `docs/UNIVERSAL_LLM_INSTRUCTIONS.md` format.
