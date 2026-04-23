# Maestro Submodules Architecture

Currently, the `submodules/` directory is initialized but empty.
In future phases, the following dependencies or related architectures will be evaluated for assimilation into the Go backend:

## Evaluated Projects

1. **GitHub Spec-Kit**
   - **Description**: Bundled command definitions for spec generation.
   - **Status**: Currently implemented as hardcoded bundled configurations in `src/shared/agentConstants.ts`.

2. **Fission-AI OpenSpec**
   - **Description**: Alternate command definitions for specification proposals.
   - **Status**: Hardcoded in frontend hooks (`src/renderer/services/openspec.ts`).

## Future Integration Path

When explicit upstream submodules are assigned, they will be cloned into the `submodules/` directory.
The Wails Go backend will provide isolated `fs` and `git` read/write contexts to analyze, merge, or compile these submodules independently of the main Maestro executable.

_(Document automatically generated during v0.15.8 Phase 2 Migration)_

## Directory Structure & Locations

- **`submodules/`**: The root directory for all upstream repositories.
- **`go/internal/modules/`**: Go bindings and AST assimilation for submodules.
- **`src/main/modules/`**: (Deprecated) Legacy Node.js wrappers for submodules.
