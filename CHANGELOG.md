# Changelog

## [0.15.11] - 2026-06-18

### Added

- Cloned, analyzed, and removed `claude-code` (just-every/code fork) to extract its core CLI functionalities.
- Ported Claude Code agent methods (`Plan`, `Solve`, `AutoDrive`, and `BrowserMode`) to Go (`/go/internal/agent/claude_code.go`).
- Ported Claude Code agent methods to Rust (`/rust/src/claude_code.rs`).
- Ported Claude Code agent methods to C# (`/csharp/Agent/ClaudeCodeAgent.cs`).
- Ported Claude Code agent methods to Java (`/java/src/main/java/com/maestro/agent/ClaudeCodeAgent.java`).
- Ported Claude Code agent methods to TypeScript (`/src/server/agents/ClaudeCodeAgent.ts`).
- Added `CLAUDE_CODE_ANALYSIS.md` documenting architecture mappings and MCP strategies.

### Changed

- Reverted `useCommandHistory.test.ts` to its original state to halt test-pollution cycle (flaky test pending proper isolate refactor).

## [0.15.10] - 2026-06-18

### Added

- Initialized Rust, C#, and Java core structures.
- Analyzed Aider agent via submodules and documented architecture.
- Ported Aider interface stubs to TypeScript, Go, Rust, C#, and Java.
