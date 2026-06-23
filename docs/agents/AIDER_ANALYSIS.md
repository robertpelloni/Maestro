# Aider Architecture Analysis

Based on examining the source code in `submodules/aider`, the Aider agent has the following core architectural features and implementation specifics:

## 1. Repository Mapping (`repomap.py`)
Aider uses a highly sophisticated code mapping system to handle large codebases.
- It uses `grep_ast` and `tree_sitter` to parse code structure and generate concise representations of the repository.
- A local SQLite cache (versioned, e.g. `.aider.tags.cache.v4`) is used to store code tags.
- It calculates relevance scores for code nodes based on Graph Theory/PageRank-like algorithms to fit the most relevant context into the LLM token window.

## 2. Git Integration (`repo.py`)
Aider provides deep, interactive Git integration.
- It uses `GitPython` to manage the repository state.
- Features include dirty-state checking, auto-committing, tracking which files have been modified, and generating AI-assisted commit messages for the applied diffs.

## 3. Diff Editing & Application (`diffs.py`, `coders/`)
Aider uses specialized search-and-replace block formatting to apply code edits accurately.
- It calculates partial updates and streams diffs to the user in real-time.
- Supports multiple "coder" backends (e.g., Whole File, Search/Replace block, unified diff) depending on the LLM's capabilities.

## 4. LLM Abstraction (`llm.py`)
- Aider uses `litellm` to dynamically support a vast array of models (OpenAI, Anthropic, Gemini, DeepSeek, local models via Ollama/OpenRouter).
- It lazy-loads the LLM modules to improve startup times.

## Multi-Language Harness Translation Strategy
To port Aider's features across Maestro's 5 supported languages (TS, Go, Rust, C#, Java), we must implement stub interfaces that mirror these core capabilities:
1. `RepoMap` (TreeSitter AST parsing and graph relevance)
2. `GitService` (Automated commit and state management)
3. `DiffApplicator` (Search/replace block parsing and file writing)
4. `LLMProvider` (Multi-model streaming orchestration)
