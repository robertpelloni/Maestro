import { renderHook, act } from '@testing-library/react';
import { useCommandHistory } from '../../../renderer/hooks/useCommandHistory';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

const safeStorage = new Map<string, string>();

const mockGetItem = vi.fn((key: string) => safeStorage.get(key) || null);
const mockSetItem = vi.fn((key: string, value: string) => {
	safeStorage.set(key, value);
});

vi.stubGlobal('localStorage', {
	getItem: mockGetItem,
	setItem: mockSetItem,
});

describe('useCommandHistory', () => {
	beforeEach(() => {
		safeStorage.clear();
		mockGetItem.mockClear();
		mockSetItem.mockClear();
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('should initialize with an empty history if localStorage is empty', () => {
		const { result } = renderHook(() => useCommandHistory());
		expect(result.current.history).toEqual([]);
		expect(result.current.historyIndex).toBe(-1);
	});

	it('should load history from localStorage on mount', () => {
		const mockHistory = ['cmd1', 'cmd2'];
		safeStorage.set('maestro_command_history', JSON.stringify(mockHistory));
		const { result } = renderHook(() => useCommandHistory());
		expect(result.current.history).toEqual(mockHistory);
	});

	it('should add a command to history and update localStorage', () => {
		const { result } = renderHook(() => useCommandHistory());
		act(() => {
			result.current.addToHistory('new cmd');
		});
		expect(result.current.history).toEqual(['new cmd']);
		expect(mockSetItem).toHaveBeenCalledWith(
			'maestro_command_history',
			JSON.stringify(['new cmd'])
		);
	});

	it('should not add duplicate sequential commands', () => {
		const { result } = renderHook(() => useCommandHistory());
		act(() => {
			result.current.addToHistory('cmd1');
		});
		act(() => {
			result.current.addToHistory('cmd1');
		});
		expect(result.current.history).toEqual(['cmd1']);
	});

	it('should navigate up and down in history', () => {
		const { result } = renderHook(() => useCommandHistory());
		act(() => {
			result.current.addToHistory('cmd1');
		});
		act(() => {
			result.current.addToHistory('cmd2');
		});

		act(() => {
			result.current.navigateHistory('up');
		});
		expect(result.current.historyIndex).toBe(1);

		act(() => {
			result.current.navigateHistory('up');
		});
		expect(result.current.historyIndex).toBe(0);

		act(() => {
			result.current.navigateHistory('down');
		});
		expect(result.current.historyIndex).toBe(1);
	});
});
