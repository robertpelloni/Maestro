# Design Document: Phase 5 - Global Synchronization

**Date**: 2026-03-25
**Status**: Draft
**Design Depth**: Standard
**Task Complexity**: Medium

## 1. Problem Statement

With Maestro sessions now managed by the Borg Core (Phase 1-4), users have centralized state for active agent tasks. However, critical configuration and automated workflow definitions (Playbooks) remain locked to the local device in `maestro-settings.json` and `maestro-playbooks.json`. This prevents a seamless multi-device experience.

## 2. Requirements

- **REQ-5.1: Settings Sync** — Sync the user's global settings to the Borg Core.
- **REQ-5.2: Playbook Sync** — Sync all user-defined playbooks to the Borg Core.
- **REQ-5.3: Offline Resilience** — Ensure the app still functions seamlessly using the local cache when offline.

## 3. Approach

Extend the existing `BorgLiveProvider` and `BorgCoreClient` to support settings and playbook endpoints. Refactor the existing Electron stores to hook into these sync methods.

### Architecture Extensions

- **BorgCoreClient**: Add `syncSettings()` and `syncPlaybooks()`.
- **SyncManager**: A new background service that periodically synchronizes local Electron stores with the Borg Core to ensure multi-device parity.

## 4. Agent Team

- **api_designer**: Extend the API contract for settings and playbooks.
- **coder**: Implement the `SyncManager` and update the provider.
- **tester**: Add integration tests to verify successful sync and offline resilience.

## 5. Success Criteria

1. Playbooks created on the local machine are pushed to the Borg Core.
2. The `SyncManager` pulls remote changes on startup without overwriting newer local changes.
