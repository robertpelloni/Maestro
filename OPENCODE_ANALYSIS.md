# OpenCode Analysis

## Core Overview
* **Repository**: `https://github.com/opencode-ai/opencode`
* **Goal**: Analyzed as part of the multi-language `maestro` orchestration expansion to extract and reimplement core agentic features.
* **Architecture Base**: Written entirely in Go (`cmd/`, `internal/`) utilizing standard CLI Cobra components and sophisticated TUI (Bubbletea/Lipgloss).
* **Key Integrations**:
  * **LSP Integration**: Directly binds to Language Server Protocol instances (`gopls`, `typescript-language-server`) to supply the LLM with live diagnostics, linting, and error-checking tools.
  * **Custom Commands**: Project-bound prompt injections (`$XDG_CONFIG_HOME/opencode/commands/` or `.opencode/commands/`).
  * **Local/Self-hosted Providers**: Native support for loading from arbitrary OpenAI-compatible APIs (like local Ollama/LM Studio nodes) via endpoints and experimental Copilot hookups.
  * **MCP (Model Context Protocol)**: Extensive integration for Stdio and SSE endpoints.

## Feature Parity Targets for Maestro (TypeScript, Go, Rust, C#, Java)

1. **LSP Diagnostics Integration**:
   * Create an LSP host client in all 5 languages that can spin up language servers (e.g., `ts-server` or `gopls`) over STDIO, monitor workspace files, and feed live compilation/linting errors back into the agent context loop.

2. **Custom Predefined Prompts**:
   * Implement a recursive file watcher in `~/.maestro/commands/` and `<workspace>/.maestro/commands/` across all languages to load templated markdown files.
   * Provide token variable replacement (`$ISSUE_NUMBER`, `$AUTHOR_NAME`) during TUI execution.

3. **Copilot / Arbitrary Local Host Configuration**:
   * Add robust configuration overrides matching OpenCode's strategy to hook into `~/.config/github-copilot/hosts.json` tokens.

## Reimplementation Strategy for Maestro

* **Go (Backend Host)**: Wails will leverage OpenCode's exact LSP host pattern, spawning raw `gopls` / `typescript-language-server` binaries in the background and capturing the JSON-RPC traffic.
* **Rust / C# / Java / TS**: These agents will query the central Go LSP hub over IPC to request "Live Diagnostics" before validating steps.
* **Custom Commands (Macros)**: Will be universally parsed using standard regex token matching in the `BaseAgent` structure and executed directly.
