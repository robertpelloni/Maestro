# TODO

## Immediate Actions
* Proceed to create the **Unified Maestro API** in all 5 languages that instantiates and orchestrates all the individual sub-agents (Aider, Claude, Gemini, Q, Goose, Amp, Auggie) into one central interface.
* Create the backend IPC bindings so the TypeScript frontend can call `window.maestro.executeTool()`.

## Short-term Features
* Completely refactor the test suites that rely on mocking `safeStorage` using actual robust memory stores in Vitest.
