# Architectural Memory

## Integrated Feature: Borg Assimilation (March 25, 2026)

Maestro has been fully refactored to serve as an API-first service layer within the Borg ecosystem. Key components include:

- **BorgLiveProvider**: Real-time synchronization service connecting Maestro's local state with Borg Core.
- **BorgGuard**: Security validation layer enforcing path containment and restricted binary blocking.
- **Async Process Spawning**: `ProcessManager` now supports `async` spawns, integrated with `BorgGuard` validation.
- **CLI Borg Extensions**: New `borg` command group for status, sync, and session listing.

## Integrated Feature: Remote Execution (SSH)

Maestro now supports full SSH remote execution for both AI agents and terminal sessions.

- **SSH Command Runner**: Integrated into `ProcessManager`.
- **Stdin Bypass**: Critical for SSH execution to avoid shell escaping issues with complex prompt text.
- **Remote CWD Tracking**: Correctly resolves and tracks working directories on remote hosts.

## Core Refactor: Zustand Store Migration

Replaced the complex `useSettings` hook (~2,000 lines) with a centralized Zustand store (`src/renderer/stores/settingsStore.ts`).

- **Performance**: Selector-based subscriptions minimize UI re-renders.
- **Consistency**: Synchronous state access across all components and services.
- **Atomicity**: Single source of truth for application settings and statistics.

## Version 0.15.5 Integration

Consolidated multiple feature branches into a stable release:

- **rc**: Integrated new UI features, including `Maestro Symphony` and `Director's Notes`.
- **cue-polish**: Refined event-driven automation logic and YAML configuration.
- **opencode-sqlite-sessions**: Shifted OpenCode session management to a robust SQLite-backed storage model.
