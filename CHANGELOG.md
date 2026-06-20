# Changelog

## [0.15.15] - 2026-06-18
### Added
- Analyzed `ampcode` architecture for remote execution hooks and rsync wrappers (`AMPCODE_CLI_ANALYSIS.md`).
- Ported Amp Code `StartFileSync` and `RunRemoteCommand` features to Go, Rust, C#, Java, and TypeScript core.
- Analyzed `augmentcode/auggie` for custom slash command frontmatter parsing and `--print` headless PR review hooks (`AUGMENTCODE_CLI_ANALYSIS.md`).
- Ported Auggie `LoadFrontmatterCommand` and `HeadlessPrint` interfaces to Go, Rust, C#, Java, and TypeScript core.

## [0.15.14] - 2026-06-18
### Added
- Analyzed `amazon-q-developer-cli` to extract IAM session/builder-id hooks and CLI translation heuristics (`AMAZON_Q_ANALYSIS.md`).
- Ported Amazon Q `LoginAwsBuilderId` and `TranslateToShell` features to Go, Rust, C#, Java, and TypeScript core.
- Analyzed `block/goose` for Advanced Content Provider (ACP) handling and specific project-boundary `.goosehints` rules loading (`GOOSE_ANALYSIS.md`).
- Ported Goose `LoadGooseHints` and `InitAcpSession` interfaces to Go, Rust, C#, Java, and TypeScript core.

## [0.15.13] - 2026-06-18
### Added
- Analyzed `just-every/code` (upstream Codex CLI pattern) for strict TUI event loops and O-series model reasoning configuration (`CODEX_CLI_ANALYSIS.md`).
- Ported Codex CLI `EnableO1Reasoning`, `SetSandboxMode`, and `RequestUserApproval` features to Go, Rust, C#, Java, and TypeScript core.
- Analyzed `opencode-ai/opencode` for LSP integrations, macro custom command templating, and localized copilot endpoints (`OPENCODE_ANALYSIS.md`).
- Ported OpenCode `LoadCustomCommand`, `ExecuteCustomCommand`, and `RequestLspDiagnostics` to Go, Rust, C#, Java, and TypeScript core.

## [0.15.12] - 2026-06-18
### Added
- Analyzed `google-gemini/gemini-cli` architecture for headless scripts, search grounding, checkpointing, and MCP tools (`GEMINI_CLI_ANALYSIS.md`).
- Ported Gemini CLI `GenerateWithGrounding`, `SaveCheckpoint`, `LoadCheckpoint`, and `StreamJSON` features to Go, Rust, C#, Java, and TypeScript core.
- Analyzed `claude-desktop` functional dependencies (tray integrations, MCP client bridging, OS clipboard access) (`CLAUDE_DESKTOP_ANALYSIS.md`).
- Ported Claude Desktop `InitializeTray`, `RegisterMCPServer`, `ExecuteMCPTool`, and `ReadClipboard` to Go, Rust, C#, Java, and TypeScript core.

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
