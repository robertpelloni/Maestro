# Implementation Plan: Phase 4 - Collective Knowledge & Graphing

**Date**: 2026-03-23
**Task Complexity**: Medium
**Design Document**: docs/maestro/plans/2026-03-23-collective-knowledge-design.md

## 1. Plan Overview
This phase extends the Borg protocol to support global session discovery and structured knowledge extraction, enabling a visual graph of the entire Borg-Maestro collective.

## 2. Execution Strategy

| Phase | Task | Agent | Mode |
|-------|------|-------|------|
| 1 | Schema & Interface Updates | architect | Sequential |
| 2 | Discovery & Knowledge Implementation | coder | Sequential |
| 3 | Graphing & Listing CLI Tools | coder | Sequential |
| 4 | Final Integration & Validation | tester | Sequential |

## 3. Phase Details

### Phase 1: Schema & Interface Updates
- **Objective**: Extend types for knowledge extraction and discovery.
- **Files to Modify**: 
  - `src/shared/borg-schema.ts`: Add `BorgKnowledgeItemSchema`.
  - `src/main/services/IBorgProvider.ts`: Add `listSessions()`.
- **Deliverables**: Updated types and interfaces.

### Phase 2: Discovery & Knowledge Implementation
- **Objective**: Implement backend logic for querying global sessions.
- **Files to Modify**:
  - `src/main/services/BorgCoreClient.ts`: Add `GET /v1/sessions` support.
  - `src/main/services/BorgLiveProvider.ts`: Implement `listSessions`.
- **Deliverables**: Functional discovery layer.

### Phase 3: Graphing & Listing CLI Tools
- **Objective**: Surface collective data to the CLI.
- **Files to Create**:
  - `src/cli/commands/borg-list.ts`: Lists all active Borg sessions.
  - `src/cli/commands/borg-graph.ts`: Generates a knowledge graph.
- **Files to Modify**: `src/cli/index.ts` (Register commands).

### Phase 4: Final Integration & Validation
- **Objective**: Verify that cross-session data is visible and correctly graphed.
- **Validation**: `maestro borg list` and `maestro borg graph` check.

## 4. Cost Summary
| Phase | Agent | Est. Input | Est. Output | Est. Cost |
|-------|-------|------------|-------------|-----------|
| 1 | architect | 5K | 1K | $0.09 |
| 2 | coder | 10K | 4K | $0.26 |
| 3 | coder | 10K | 5K | $0.30 |
| 4 | tester | 5K | 1K | $0.09 |
| **Total** | | | | **$0.74** |
