# Maestro Project Dashboard

## 1. Project Directory Structure

| Directory      | Purpose                                                              |
| -------------- | -------------------------------------------------------------------- |
| `src/main`     | Electron Main process (Process management, IPC handlers, Storage)    |
| `src/renderer` | Electron Renderer process (Desktop React UI, Components, Hooks)      |
| `src/web`      | Remote Web Interface (Mobile-optimized React UI)                     |
| `src/shared`   | Code shared across Main, Renderer, and Web (Types, Utils, Constants) |
| `src/cli`      | Maestro Headless CLI implementation                                  |
| `src/prompts`  | System prompts for various agents and features                       |
| `e2e`          | Playwright end-to-end test suites                                    |
| `docs`         | Technical and user documentation                                     |
| `build`        | Build resources (icons, entitlements)                                |
| `scripts`      | Build, versioning, and refresh utilities                             |

## 2. Core Dependencies & Rationale

### Runtime (Production)

| Package          | Version    | Rationale                                                 |
| ---------------- | ---------- | --------------------------------------------------------- |
| `electron`       | `^28.3.3`  | Core framework for cross-platform desktop integration.    |
| `react`          | `^18.2.0`  | UI library for both desktop and mobile interfaces.        |
| `zustand`        | `^5.0.11`  | Lightweight, high-performance state management.           |
| `node-pty`       | `^1.1.0`   | Native terminal emulation for interactive agent sessions. |
| `better-sqlite3` | `^12.5.0`  | Fast, synchronous SQLite for session and history storage. |
| `reactflow`      | `^11.11.4` | Visualizing document relationships and mind maps.         |
| `mermaid`        | `^11.12.1` | Native rendering of architectural diagrams in chat.       |
| `fastify`        | `^4.25.2`  | High-performance backend server for the web remote.       |
| `react-markdown` | `^10.1.0`  | Standardized markdown rendering across platforms.         |
| `recharts`       | `^3.6.0`   | Data visualization for the Usage Dashboard.               |
| `electron-store` | `^8.1.0`   | Simple persistent configuration storage.                  |
| `dompurify`      | `^3.3.0`   | Security: sanitizing HTML and SVG (Mermaid) output.       |

### Development & Tooling

| Package            | Version   | Rationale                                          |
| ------------------ | --------- | -------------------------------------------------- |
| `typescript`       | `^5.3.3`  | Type safety across the entire monorepo.            |
| `vite`             | `^5.0.11` | Modern frontend build tool for Renderer and Web.   |
| `vitest`           | `^4.0.15` | Fast, multi-threaded unit and integration testing. |
| `playwright`       | `^1.57.0` | Reliable end-to-end browser automation testing.    |
| `electron-builder` | `^24.9.1` | Packaging and distribution for macOS, Win, Linux.  |
| `eslint`           | `^9.39.2` | Code quality and architectural linting rules.      |
| `prettier`         | `^3.8.0`  | Consistent code formatting (Tabs enforced).        |

## 3. Version Synchronization Status

| File           | Version               | Status              |
| -------------- | --------------------- | ------------------- |
| `package.json` | `0.15.4`              | Current             |
| `CHANGELOG.md` | `0.15.4 (Unreleased)` | Current             |
| `VERSION`      | `0.15.4`              | **Source of Truth** |

## 4. Feature Implementation Health

- **Desktop UI**: 🟢 Robust
- **Mobile Remote**: 🟢 Robust (PWA & Layout Hardening Implemented)
- **Process Mgmt**: 🟢 Hardened (Reconnection & Tree-Kill Implemented)
- **Diagrams**: 🟢 Native Mermaid Support
- **Testing**: 🟡 70+ Skipped Tests (Investigating)
