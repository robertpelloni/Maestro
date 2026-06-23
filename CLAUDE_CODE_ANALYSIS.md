# Claude Code (Every Code) CLI Analysis

## Core Overview

- **Repository**: `https://github.com/just-every/code` (fork of `openai/codex` CLI)
- **Goal**: Analyzed as part of the multi-language `maestro` orchestration expansion to extract and reimplement core agentic features.
- **Architecture Base**: Primarily written in Rust (`code-rs/`, `codex-rs/`) with a Node.js/npm distribution wrapper.
- **Key Integrations**:
  - Browser integration (`/chrome`, `/browser`)
  - Multi-agent orchestration (`/plan`, `/solve`, `/code` utilizing consensus and races between Claude, Gemini, and GPT-5)
  - Auto Drive for autonomous multi-step tasks.
  - Model Context Protocol (MCP) server support.

## Feature Parity Targets for Maestro (TypeScript, Go, Rust, C#, Java)

1. **Authentication & Session Handling**:
   - API Key support (e.g., `OPENAI_API_KEY`).
   - "Sign in with ChatGPT/Claude" emulation (OAuth/Browser flow).
   - Session persistence in `~/.code/` or equivalent configuration paths.

2. **Core CLI Commands (TUI & Repl)**:
   - `/chrome` & `/browser`: Headless browser control and CDP connection (Chrome DevTools Protocol).
   - `/plan`: Multi-agent consensus planning.
   - `/solve`: Multi-agent racing (finding the fastest/optimal solution).
   - `/code`: Multi-worktree creation and optimal solution implementation.
   - `/auto`: Autonomous task driving with status inspection.
   - `/reasoning`, `/model`, `/themes`, `/new`.

3. **Model Context Protocol (MCP) Server Configuration**:
   - Dynamic loading of MCP servers via `config.toml` (or `maestro` config equivalent).
   - Spawning and communicating with processes like `@modelcontextprotocol/server-filesystem`.

4. **Project Context Loading**:
   - Automatic ingestion of `AGENTS.md` / `CLAUDE.md`.
   - Workspace boundary sandboxing (`--read-only`, `--sandbox workspace-write`).

## Reimplementation Strategy for Maestro

- **Rust Module**: The Rust implementation in Maestro should borrow patterns from `codex-rs`, leveraging crates like `tokio` for async orchestration and async MCP connections.
- **Go Module**: The Wails backend (`/go/internal/`) will serve as the primary host for the Auto Drive mechanism, managing browser CDP connections.
- **C#/Java**: Porting the `/plan` and `/solve` concurrent racing logic will utilize native multi-threading/async tasks to spawn sub-agents and collect the fastest result.
- **TypeScript (Frontend)**: The WebUI will map directly to the TUI `/commands`, presenting visual dashboards for Auto Drive status and Multi-Agent races.
