# Bito CLI Analysis

## Core Overview
* **Repository**: `https://github.com/gitbito/cli` (or `bito-ai/cli`)
* **Goal**: Analyzed as part of the multi-language `maestro` orchestration expansion to extract and reimplement core agentic features.
* **Architecture Base**: Go-based closed/open-core CLI bindings.
* **Key Integrations**:
  * Advanced Access Key configuration structures (`~/.bito/config.yaml`).
  * Custom `{{%input%}}` templating in prompt files for dynamic file injection.
  * Toggling between `BASIC` and `ADVANCED` model profiles which restrict or expand character limits directly on the client side.

## Feature Parity Targets for Maestro (TypeScript, Go, Rust, C#, Java)

1. **Macro Input Injection**:
   * Implement the exact `{{%input%}}` templating engine, where a user can provide `-p prompt.txt -f file.js` and the prompt will cleanly substitute the file's contents into the macro before executing the model request.

2. **Model Profiles (Basic vs Advanced)**:
   * Provide explicit toggles (e.g. `SetModelProfile("ADVANCED")`) which dynamically adjust client-side prompt truncations (40k chars vs 240k chars) before dispatching the payload to prevent silent failures on basic tiers.

## Reimplementation Strategy for Maestro

* **Rust/Go/C#/Java/TS**: Reimplement the `InjectPromptMacro` and `SetModelProfile` functionalities within the `BaseAgent` structures to emulate Bito CLI's exact behaviors.
