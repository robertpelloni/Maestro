# AugmentCode (Auggie) Analysis

## Core Overview
* **Repository**: `https://github.com/augmentcode/auggie`
* **Goal**: Analyzed as part of the multi-language `maestro` orchestration expansion to extract and reimplement core agentic features.
* **Architecture Base**: Node.js/TypeScript based CLI.
* **Key Integrations**:
  * Slash command loading from `.augment/commands/` (markdown files with frontmatter).
  * Direct Github Actions integrations for `review-pr`, `describe-pr`, and `augment-agent`.
  * Headless stdout CI mode (`--print`).

## Feature Parity Targets for Maestro (TypeScript, Go, Rust, C#, Java)

1. **Frontmatter Command Parsing**:
   * Implement a frontmatter parser in all 5 languages to load macro commands (e.g. `/code-review`) from localized project directories (like `.maestro/commands/`).

2. **Headless PR Interception**:
   * Expose CI hooks (`HeadlessPrint` mode) that accepts a prompt and returns raw LLM stdout without any interactive TUI, suitable for GitHub Actions output parsing.

## Reimplementation Strategy for Maestro

* **Rust/Go/C#/Java/TS**: Reimplement the `LoadFrontmatterCommand` and `HeadlessPrint` functions within the `BaseAgent` structures.
