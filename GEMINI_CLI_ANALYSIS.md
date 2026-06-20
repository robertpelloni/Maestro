# Gemini CLI Analysis

## Core Overview

- **Repository**: `https://github.com/google-gemini/gemini-cli`
- **Goal**: Analyzed as part of the multi-language `maestro` orchestration expansion to extract and reimplement core agentic features.
- **Architecture Base**: Primarily written in TypeScript with deep Node.js integration.
- **Key Integrations**:
  - Advanced Google Search grounding.
  - Integration with GitHub Actions for PR reviews and issue triage.
  - Checkpointing (conversation saving and resuming).
  - Robust MCP (Model Context Protocol) support for executing capabilities (like `@github`, `@slack`).
  - Streamed JSON and batch outputs for scripting (headless mode).
  - Project specific `GEMINI.md` context files.

## Feature Parity Targets for Maestro (TypeScript, Go, Rust, C#, Java)

1. **Authentication & Identity**:
   - "Sign in with Google" OAuth flows.
   - `GEMINI_API_KEY` and `GOOGLE_API_KEY` (Vertex AI) usage.
   - GCP Project ID binding (`GOOGLE_CLOUD_PROJECT`).

2. **Core CLI Commands & Capabilities**:
   - Google Search Grounding for real-time lookups during code generations.
   - Conversation Checkpointing allowing state preservation (serialization of context window).
   - Streamed/Batch outputs (`--output-format json` / `stream-json`) for IPC.
   - Integration directly into CI/CD pipelines (e.g., GitHub Action behaviors for auto-review).

3. **Project Context Loading**:
   - Automatic ingestion of `GEMINI.md` files (to parallel `AGENTS.md` and `CLAUDE.md`).
   - "Trusted Folders" security boundary enforcement (executing only in safe sandboxes).

4. **MCP Tooling (Model Context Protocol)**:
   - Direct execution of local or network MCP servers mapped via specific symbols (e.g., `@mcp-plugin`).
   - Extending the agent dynamically without recompiling.

## Reimplementation Strategy for Maestro

- **Rust/Go Modules**: Native execution of MCP protocols via JSON-RPC over stdout/stdin. Will host the "checkpointing" engine where session states are serialized to binary/json databases.
- **C#/Java**: Implement "Sign in with Google" PKCE/OAuth2 loops and parse the Google Search grounding metadata directly from the Gemini API structs.
- **TypeScript (Frontend)**: Real-time rendering of the `stream-json` structure to show token-by-token generation, search grounding sources (links/citations), and GitHub Action webhooks.
