# Maestro Deployment & Build Instructions

## Prerequisites

- **Node.js**: v22.0.0 or higher
- **Package Manager**: npm

## Local Development

To run the application locally with hot-reloading:

```bash
# Install dependencies
npm install

# Run the app (Main process + Renderer)
npm run dev
```

### Specialized Dev Commands

- `npm run dev:prod-data`: Run dev environment using your actual production data/sessions.
- `npm run dev:web`: Run only the web interface.

## Building for Production

To compile TypeScript, generate prompts, and build the Vite renderer:

```bash
npm run build
```

_Note: This triggers `build:prompts`, `build:main`, `build:preload`, `build:renderer`, `build:web`, and `build:cli`._

## Packaging

Maestro uses `electron-builder` to package executables for all major platforms. The package scripts automatically run the build process and update the version number.

### Cross-Platform Build

```bash
npm run package
```

### Specific Platforms

- **macOS** (x64 and arm64 dmg/zip): `npm run package:mac`
- **Windows** (NSIS installer and portable exe): `npm run package:win`
- **Linux** (AppImage, deb, rpm): `npm run package:linux`

## Continuous Integration

Maestro uses GitHub Actions (`.github/workflows/ci.yml`).

- On Push/PR to `main` or `rc` branches, the CI pipeline automatically runs:
  - `npm ci`
  - `npm run lint` & `npm run lint:eslint`
  - `npx prettier --check .`
  - `npm run test`

## Releasing

For version bumping, update the `version` field in `package.json`. The packaging scripts utilize `scripts/set-version.mjs` to ensure the version is synced across all necessary files before packaging.
