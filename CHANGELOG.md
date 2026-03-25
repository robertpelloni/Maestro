# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.15.4] - Unreleased

### Added

- **Visual Command Orchestrator (Prototype)**: Added a ReactFlow-based visual timeline for viewing and managing concurrent agent tasks, accessible via `Cmd+K` or `Alt+Meta+V`.
- Zero-Config PWA for the mobile web interface (offline support and home screen installation).
- Comprehensive project documentation overhaul (`VISION.md`, `ROADMAP.md`, `TODO.md`, `IDEAS.md`, `MEMORY.md`, `HANDOFF.md`, `DEPLOY.md`).
- Centralized `docs/UNIVERSAL_LLM_INSTRUCTIONS.md` to standardize AI agent behavior across all LLM models.

### Fixed

- Fixed iOS Safari viewport layout shifting when the on-screen keyboard appears.
- Fixed zombie process memory leaks by using `taskkill` for PTY process trees on Windows upon agent deletion.
- Fixed contrast ratios on `DocumentGraph` nodes by dynamically calculating text color based on the active theme.

### Changed

- Shifted future planning towards community-driven plugin ecosystems and deeper Gemini CLI integration.

## [0.15.3] - 2026-03-21

### Added

- Persistent web link across app restarts.
- OpenCode v1.2+ session support (SQLite format).
- Group chat `@mentions`.
- Batch resume/abort controls.

### Fixed

- Windows stop button for Claude Code agents.
- PTY spawn failures graceful handling.
- Toast notification z-index overlay fixes.
- SSH remote wizard support.
- Execution queue drag-and-drop bug.

## [0.14.5] - 2026-01-24

### Added

- Document Graphs and Agents over SSH.
- Inline Wizard for Auto Run Playbooks.

_For older versions, please refer to the `docs/releases.md` file in the documentation._
