# Codex CLI Analysis

## Core Overview

- **Repository**: `https://github.com/just-every/code` (Original upstream for `claude-code-cli` fork)
- **Goal**: Analyzed as part of the multi-language `maestro` orchestration expansion to extract and reimplement core agentic features.
- **Architecture Base**: Primarily written in Rust (`code-rs/`, `codex-rs/`) with a Node.js/npm distribution wrapper.
- **Key Integrations**:
  - The original Codex CLI provides the foundational architecture for the `just-every/code` fork we analyzed earlier as Claude Code.
  - Deep OpenAI API integration (specifically targeting models like `gpt-4o`, `o1`, and `o3-mini`).
  - Basic workspace sandboxing and `--read-only` modes.
  - TUI rendering (Text User Interface) for agent conversations.

## Feature Parity Targets for Maestro (TypeScript, Go, Rust, C#, Java)

1. **OpenAI Protocol Alignment**:
   - Complete implementation of the OpenAI Chat Completions protocol across all 5 languages, specifically to support complex reasoning models (like `o1` and `o3-mini`) which require specific "developer messages" vs "system messages" handling.
2. **Strict Sandboxing**:
   - Implement `--read-only` sandbox modes.
   - Restrict file modifications based on `sandbox_mode = "workspace-write"` configurations across all language runners.

3. **TUI Emulation**:
   - Provide base constructs for Text User Interface (TUI) event loops in Rust, Go, C#, Java, and TS, allowing the agent to prompt the user directly in terminal environments before committing destructive actions.

## Reimplementation Strategy for Maestro

- **Rust/Go Modules**: Native TUI loops using crates like `ratatui` (Rust) or `bubbletea` (Go) to emulate the Codex CLI terminal experience.
- **C#/Java/TS**: Expose the `--read-only` sandbox toggles explicitly in the `BaseAgent` interfaces.
- **Shared**: The underlying HTTP client structures in all 5 languages must be updated to fully parse and stream OpenAI O-series reasoning tokens securely.
