import re
import os

with open('src/__tests__/web/hooks/useCommandHistory.test.ts', 'r') as f:
    content = f.read()

# We need to COMPLETELY rewrite the file to use an isolated wrapper for storage.
# The user asked me to refactor the test suite relying on `safeStorage` to be robust.

new_content = """import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// Setup pure isolated mock storage BEFORE importing the hook
const memoryStore = new Map<string, string>();

vi.mock('../../../web/utils/storage', () => ({
	safeStorage: {
		getItem: vi.fn((key: string) => memoryStore.get(key) || null),
		setItem: vi.fn((key: string, value: string) => { memoryStore.set(key, value); }),
		removeItem: vi.fn((key: string) => { memoryStore.delete(key); }),
		clear: vi.fn(() => { memoryStore.clear(); }),
	}
}));

import { safeStorage } from '../../../web/utils/storage';
import { useCommandHistory } from '../../../web/hooks/useCommandHistory';
import { webLogger } from '../../../web/utils/logger';

vi.mock('../../../web/utils/logger', () => ({
	webLogger: {
		debug: vi.fn(),
		info: vi.fn(),
		warn: vi.fn(),
		error: vi.fn(),
	}
}));

describe('useCommandHistory (Refactored Mocks)', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        memoryStore.clear();
    });

    afterEach(() => {
        vi.clearAllMocks();
        memoryStore.clear();
    });

    it('should initialize with empty history', () => {
        const { result } = renderHook(() => useCommandHistory());
        expect(result.current.history).toEqual([]);
    });

    it('should add a command to history and update navigation', () => {
        const { result } = renderHook(() => useCommandHistory());

        act(() => {
            result.current.addCommand('hello world');
        });

        expect(result.current.history.length).toBe(1);
        expect(result.current.history[0].command).toBe('hello world');

        // It persists to storage
        expect(safeStorage.setItem).toHaveBeenCalled();
        expect(memoryStore.get('maestro_command_history')).toContain('hello world');
    });

    it('should deduplicate unique commands ignoring case', () => {
        const { result } = renderHook(() => useCommandHistory());

        act(() => {
            result.current.addCommand('TEST COMMAND');
            result.current.addCommand('test command');
            result.current.addCommand('other command');
        });

        const unique = result.current.getUniqueCommands();
        // test command and other command (2 unique)
        expect(unique.length).toBe(2);
    });

    it('should navigate up and down', () => {
        const { result } = renderHook(() => useCommandHistory());

        act(() => {
            result.current.addCommand('first');
            result.current.addCommand('second');
        });

        let command;
        act(() => {
            command = result.current.navigateUp();
        });
        expect(command).toBe('second'); // Most recent is at index 0

        act(() => {
            command = result.current.navigateUp();
        });
        expect(command).toBe('first'); // Older is at index 1

        act(() => {
            command = result.current.navigateDown();
        });
        expect(command).toBe('second');
    });

    it('should recover gracefully from corrupted storage', () => {
        memoryStore.set('maestro_command_history', 'INVALID_JSON_HERE{]');

        const { result } = renderHook(() => useCommandHistory());

        expect(result.current.history).toEqual([]);
        expect(webLogger.error).toHaveBeenCalledWith('Failed to load from storage', 'CommandHistory', expect.any(Error));
    });
});
"""

with open('src/__tests__/web/hooks/useCommandHistory.test.ts', 'w') as f:
    f.write(new_content)
