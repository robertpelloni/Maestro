# Maestro Deployment Instructions

## Development Deployment

As of v0.15.6, Maestro is transitioning to a **Wails v3** backend with a Vite/React frontend.

### Prerequisites

- Node.js (v20+)
- Go (v1.22+)
- Wails v3 CLI (`go install github.com/wailsapp/wails/v2/cmd/wails@latest`)

### Running in Development

1.  Navigate to the `/go` directory.
2.  Run `wails dev`.
3.  This command will automatically spin up the Go backend and the Vite dev server for the React frontend with full HMR (Hot Module Replacement) support.

## Production Build

1.  Navigate to the `/go` directory.
2.  Run `wails build`.
3.  The compiled standalone executable will be output to the `build/bin/` directory.

_Note: The legacy Electron build pipeline (`npm run build:electron`) remains in `package.json` for rollback purposes but will be deprecated in v0.16.0._
