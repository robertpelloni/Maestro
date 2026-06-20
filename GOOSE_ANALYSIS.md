# Goose Analysis

## Core Overview

- **Repository**: `https://github.com/block/goose` (transitioned to `aaif-goose/goose`)
- **Goal**: Analyzed as part of the multi-language `maestro` orchestration expansion to extract and reimplement core agentic features.
- **Architecture Base**: Rust (Core CLI/API backend) and TypeScript/React (Tauri-like desktop UI).
- **Key Integrations**:
  - Advanced Content Provider (ACP) wrapping for utilizing consumer LLM subscriptions (ChatGPT, Claude Pro, Gemini Advanced).
  - Direct Model Context Protocol (MCP) integrations for 70+ extensions.
  - Project `.goosehints` files and `workflow_recipes` for declarative execution logic.

## Feature Parity Targets for Maestro (TypeScript, Go, Rust, C#, Java)

1. **Workflow Recipes / `.goosehints`**:
   - Implement local hints loading mechanisms mimicking `goose` where projects can supply `.goosehints` text that acts as implicit system prompts.
2. **ACP (Advanced Content Provider) Wrapping**:
   - Implement stubs across all 5 languages to securely handle reverse-proxied consumer subscriptions as an alternative to raw API keys.

## Reimplementation Strategy for Maestro

- **Rust/Go/C#/Java/TS**: Reimplement the `LoadGooseHints` and `AcpSessionInit` interfaces within the `BaseAgent` structures.
