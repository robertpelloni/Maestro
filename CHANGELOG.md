# Changelog

## [0.15.20] - 2026-06-18

### Added

- Implemented `MaestroDashboard.tsx` to serve as the unified frontend React interface for the `MaestroRouter` orchestration system.
- Created `App.tsx` shell component integrating the dashboard.
- Solidified testing environments and WebUI components for cross-agent actions.

## [0.15.19] - 2026-06-18

### Added

- Integrated all 24 sub-agents into a unified `MaestroRouter` class across Go, Rust, C#, Java, and TypeScript.
- Created `autoOrchestrate` method demonstrating composite agent flows (setting reasoning, sandbox policies, building plans, and autonomously driving solutions).
- Implemented IPC bindings (`maestroHandlers.ts` and `preload/index.ts`) mapping the unified `MaestroRouter` directly to the `window.maestro` object for the Electron frontend.

## [0.15.18] - 2026-06-18

### Added

- Analyzed and ported `pi-cli` capabilities (monorepo package identification hooks) to all language cores (`PI_CLI_ANALYSIS.md`).
- Analyzed and ported `qwen-code-cli` context parsers (multi-modal local extraction) to all language cores (`QWEN_CODE_CLI_ANALYSIS.md`).
- Analyzed and ported `rovo-cli` capabilities (enterprise graph querying and Atlassian Jira ticket transition triggers) to all language cores (`ROVO_CLI_ANALYSIS.md`).
- Analyzed and ported `shell-pilot-cli` (zsh/bash history context predictors) (`SHELL_PILOT_CLI_ANALYSIS.md`).
- Analyzed and ported `smithery-cli` (MCP registry search mapping) (`SMITHERY_CLI_ANALYSIS.md`).
- Analyzed and ported `trae-cli` (Builder UI mode toggles) (`TRAE_CLI_ANALYSIS.md`).
- Analyzed and ported `warp-cli` (Agentic terminal block AST parsing loops) (`WARP_CLI_ANALYSIS.md`).
- Fully mapped all sub-agent features into standard class properties across Go, C#, Java, Rust, and TS.

## [0.15.17] - 2026-06-18

### Added

- Analyzed and ported `litellm` capabilities (API routing fallbacks, standardized request structures) to all language cores (`LITELLM_CLI_ANALYSIS.md`).
- Analyzed and ported `llamafile` orchestration features (local GGUF binary extraction and multi-os runtime spawning) to all language cores (`LLAMAFILE_CLI_ANALYSIS.md`).
- Analyzed and ported `manus-cli` specs (RPA container provisioning hooks) to all language cores (`MANUS_CLI_ANALYSIS.md`).
- Analyzed and ported `mistral-vibe-cli` (vibe profiling), `ollama-cli` (Modelfile builders, local blob streaming), and `open-interpreter` (Python/Shell REPL execution, computer vision hooks) natively to Go, Rust, C#, Java, and TypeScript (`MISTRAL_VIBE_CLI_ANALYSIS.md`, `OLLAMA_CLI_ANALYSIS.md`, `OPEN_INTERPRETER_CLI_ANALYSIS.md`).

## [0.15.16] - 2026-06-18

### Added

- Analyzed `bito-cli` architecture for `{{%input%}}` templating and BASIC/ADVANCED model profiles (`BITO_CLI_ANALYSIS.md`).
- Ported Bito `InjectPromptMacro` and `SetModelProfile` features to Go, Rust, C#, Java, and TypeScript core.
- Analyzed `byterover` for AST and lockfile dependency parsing context hooks (`BYTEROVER_CLI_ANALYSIS.md`).
- Ported ByteRover `ParseDependencies` interfaces to Go, Rust, C#, Java, and TypeScript core.

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

## [0.15.21] - 2024-05-24

### Added

- Wails v3 bindings in `go/internal/wails/maestro_bindings.go` to expose the Go backend to the frontend matching the Electron IPC setup.

## [0.15.22] - 2024-05-24

### Changed

- Converted C# mocked sub-agents and `MaestroRouter` to correctly utilize `IAsyncEnumerable` instead of synchronous `Thread.Sleep()`.
- Converted Java mocked sub-agents and `MaestroRouter` to use standard asynchronous `Flow.Publisher` streams via `SubmissionPublisher`.

## [0.15.23] - 2024-05-24

### Added

- Wails v3 Application Entrypoint in `go/main.go` and `wails.json` to embed and serve the React UI.

## [0.15.25] - 2024-05-24

### Added

- `AgentDetector` struct in the Go backend to map out specific capabilities and requirements (like `OPENAI_API_KEY`) for all 24+ isolated agents.
- Finalized integration for `go/internal/agents` ensuring that all languages, including recent C# and Java conversions, correctly compile against the wails bindings and updated dependencies.
