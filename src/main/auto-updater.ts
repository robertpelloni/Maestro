/**
 * Auto-updater module for Maestro
 * Uses electron-updater to download and install updates from GitHub releases
 *
 * Note: electron-updater accesses electron.app at module load time, so we use
 * lazy initialization to avoid "Cannot read properties of undefined" errors
 * when the module is imported before app.whenReady().
 */

import type { UpdateInfo, ProgressInfo, AppUpdater } from 'electron-updater';
import { BrowserWindow, ipcMain } from 'electron';
import { logger } from './utils/logger';
import { isWebContentsAvailable } from './utils/safe-send';

export interface UpdateStatus {
	status:
		| 'idle'
		| 'checking'
		| 'available'
		| 'not-available'
		| 'downloading'
		| 'downloaded'
		| 'error';
	info?: UpdateInfo;
	progress?: ProgressInfo;
	error?: string;
}

let mainWindow: BrowserWindow | null = null;
let currentStatus: UpdateStatus = { status: 'idle' };
let ipcHandlersRegistered = false;

// Lazy-loaded autoUpdater instance
let _autoUpdater: AppUpdater | null = null;

/**
 * Get the autoUpdater instance, initializing it lazily
 * This is necessary because electron-updater accesses electron.app at import time
 */
function getAutoUpdater(): AppUpdater {
	if (!_autoUpdater) {
		// Dynamic require to defer the module load
		const { autoUpdater } = require('electron-updater');
		_autoUpdater = autoUpdater;
		// Configure defaults
		_autoUpdater!.autoDownload = false;
		_autoUpdater!.autoInstallOnAppQuit = true;
		_autoUpdater!.allowPrerelease = false;
		logger.info('electron-updater initialized', 'AutoUpdater', {
			autoDownload: false,
			autoInstallOnAppQuit: true,
			allowPrerelease: false,
		});
	}
	return _autoUpdater!;
}

/**
 * Initialize the auto-updater and set up event handlers
 */
export function initAutoUpdater(window: BrowserWindow): void {
	mainWindow = window;

	const autoUpdater = getAutoUpdater();

	// Update available
	autoUpdater.on('update-available', (info: UpdateInfo) => {
		logger.info(`Update available: ${info.version}`, 'AutoUpdater');
		currentStatus = { status: 'available', info };
		sendStatusToRenderer();
	});

	// No update available
	autoUpdater.on('update-not-available', (info: UpdateInfo) => {
		logger.info(
			`No update available via electron-updater (current: ${info.version})`,
			'AutoUpdater'
		);
		currentStatus = { status: 'not-available', info };
		sendStatusToRenderer();
	});

	// Download progress
	autoUpdater.on('download-progress', (progress: ProgressInfo) => {
		currentStatus = { ...currentStatus, status: 'downloading', progress };
		sendStatusToRenderer();
	});

	// Update downloaded
	autoUpdater.on('update-downloaded', (info: UpdateInfo) => {
		logger.info(`Update downloaded: ${info.version}`, 'AutoUpdater');
		currentStatus = { status: 'downloaded', info };
		sendStatusToRenderer();
	});

	// Error
	autoUpdater.on('error', (err: Error) => {
		logger.error(`Auto-update error: ${err.message}`, 'AutoUpdater', {
			stack: err.stack,
		});
		currentStatus = { status: 'error', error: err.message };
		sendStatusToRenderer();
	});

	// Set up IPC handlers
	setupIpcHandlers();
}

/**
 * Send current status to renderer
 */
function sendStatusToRenderer(): void {
	if (isWebContentsAvailable(mainWindow)) {
		mainWindow.webContents.send('updates:status', currentStatus);
	}
}

/**
 * Set up IPC handlers for update operations
 */
function setupIpcHandlers(): void {
	if (ipcHandlersRegistered) {
		return;
	}
	ipcHandlersRegistered = true;

	const autoUpdater = getAutoUpdater();

	// Check for updates using electron-updater (different from manual GitHub API check)
	ipcMain.handle('updates:checkAutoUpdater', async () => {
		logger.info('Auto-updater disabled (Custom Fork).', 'AutoUpdater');
		currentStatus = { status: 'not-available' };
		sendStatusToRenderer();
		return { success: true, updateInfo: null };
	});

	// Download update
	ipcMain.handle('updates:download', async () => {
		logger.info('Auto-updater download requested but ignored (Custom Fork).', 'AutoUpdater');
		return { success: false, error: 'Downloads disabled in custom fork' };
	});

	// Install update (quit and install)
	ipcMain.handle('updates:install', () => {
		logger.info('Auto-updater install requested but ignored (Custom Fork).', 'AutoUpdater');
	});

	// Get current status
	ipcMain.handle('updates:getStatus', () => {
		return currentStatus;
	});
}

/**
 * Manually trigger update check (can be called from main process)
 */
export async function checkForUpdatesManual(): Promise<UpdateInfo | null> {
	logger.info('Manual update check bypassed (Custom Fork).', 'AutoUpdater');
	return null;
}

/**
 * Configure whether to include prerelease/beta versions in updates
 * This should be called when the user setting changes
 */
export function setAllowPrerelease(allow: boolean): void {
	const autoUpdater = getAutoUpdater();
	autoUpdater.allowPrerelease = allow;
	logger.info(`Auto-updater prerelease mode: ${allow ? 'enabled' : 'disabled'}`, 'AutoUpdater');
}
