# Universal LLM Instructions

> **CRITICAL MANDATE**: All AI Agents (Claude, Gemini, GPT, Codex, Factory Droid) MUST adhere to these unified instructions when operating within the Maestro repository.

## 1. Core Behavioral Guidelines

### Surface Assumptions Early

Before implementing non-trivial work, explicitly state assumptions. Never silently fill in ambiguous requirements.
_Format:_ "Assumptions: 1) X, 2) Y. Correct me now or I proceed."

### Manage Confusion Actively

When encountering inconsistencies, conflicting requirements, or unclear specs: **STOP**. Name the specific confusion, present the tradeoff, and wait for resolution.
_Good:_ "I see X in file A but Y in file B—which takes precedence?"

### Push Back When Warranted

If an approach has clear problems: point out the issue directly, explain the concrete downside, propose an alternative, then accept the decision if overridden. No blind sycophancy.

### Enforce Simplicity

Actively resist overcomplication. Prefer the boring, obvious solution. Ask yourself: "Would a senior dev say 'why didn't you just...'?"

### Maintain Scope Discipline

Touch ONLY what is asked. Do NOT:

- Remove comments you don't understand.
- "Clean up" orthogonal code.
- Refactor adjacent systems as side effects.
- Delete seemingly-unused code without approval.

### Dead Code Hygiene

After refactoring, explicitly list unreachable code and ask: "Should I remove these now-unused elements: [list]?" Do not delete without permission.

### Validate Before Completion

Before declaring a task finished, re-run relevant formatting, lint, type-check, and test commands. Fix any issues discovered and include those fixes in your submission.

## 2. Coding Standards

- **Indentation**: Use **TABS**, not spaces. Always match existing file indentation.
- **Theme Awareness**: Use inline styles for theme-aware colors: `style={{ color: theme.colors.textMain }}`. Avoid hardcoded tailwind colors for primary UI elements.
- **Error Handling (Main Process)**: Let exceptions bubble up so Sentry can capture them. Only catch expected, recoverable errors.
- **Error Handling (Renderer/Services)**: Never throw. Return safe defaults to prevent UI crashes.
- **Security**: Always use `execFileNoThrow` for external commands to prevent injection. Never use shell-based command execution.

## 3. Architecture Rules

- **IPC Security**: All renderer-to-main communication MUST use the `window.maestro` contextBridge in `preload.ts`. The renderer has NO Node.js access.
- **Process Management**:
  - Each agent runs two processes: AI agent (`-ai`) and Terminal (`-terminal`).
  - `node-pty`: Used ONLY for interactive terminal sessions.
  - `child_process.spawn`: Used for AI assistants (run with `shell: false`).
- **SSH Awareness**: Any feature that spawns agent processes MUST support SSH remote execution.
  - Check `session.sessionSshRemoteConfig.enabled`.
  - Use `wrapSpawnWithSsh()` from `src/main/utils/ssh-spawn-wrapper.ts`.
  - Account for different lifecycles: `session.sshRemoteId` (post-spawn) vs `session.sessionSshRemoteConfig.remoteId` (pre-spawn).
- **Unified Tab System**: `unifiedTabOrder` is the source of truth for the TabBar. When adding or activating tabs, always ensure `aiTabs`/`filePreviewTabs` and `unifiedTabOrder` are synchronized.
- **Encore Features (Feature Gating)**: Optional features must be gated. State must live in `App.tsx` and propagate via props to `SettingsModal.tsx`. Access points (shortcuts, menus, palette) must all be guarded by the feature flag.

## 4. Operational Environment Limitations

- **Shell Execution**: In headless or CI environments, `run_shell_command` is often **DENIED BY POLICY**.
- AI Agents must NOT rely on shell commands for `git` operations, testing (`npm test`), or builds when policy denies it. Fall back to code generation, documentation updates, and provide clear manual instructions to the user.
- **Testing**: Maestro uses **Vitest** for unit/integration tests and **Playwright** for E2E tests.

## 5. Documentation & Lifecycle

- **Versioning**: Every build should have a new version number. Sync `package.json` version with `CHANGELOG.md`.
- **Changelog**: Maintain `CHANGELOG.md` following [Keep a Changelog](https://keepachangelog.com/) standards.
- **Persistent State**: Continuously update `TODO.md`, `ROADMAP.md`, and `HANDOFF.md` to persist state across different models and sessions.
- **Shared Components**: Shared logic between desktop and mobile should reside in `src/shared/`.
