import fs from 'fs/promises';
import path from 'path';
import { logger } from '../utils/logger';

const LOG_CONTEXT = 'BorgEnvironment';

export interface BorgEnvInfo {
	isBorgProject: boolean;
	isSandboxed: boolean;
	sandboxId?: string;
	handoffDirExists: boolean;
}

export class BorgEnvironment {
	/**
	 * Detects the current Borg environment state.
	 */
	static async detect(workspaceRoot: string = process.cwd()): Promise<BorgEnvInfo> {
		const borgDir = path.join(workspaceRoot, '.borg');
		const sandboxDir = path.join(borgDir, 'sandbox');
		const handoffDir = path.join(borgDir, 'handoffs');

		let isBorgProject = false;
		let isSandboxed = false;
		let sandboxId: string | undefined;
		let handoffDirExists = false;

		try {
			const stats = await fs.stat(borgDir);
			isBorgProject = stats.isDirectory();
		} catch {
			// Not a borg project
		}

		try {
			const stats = await fs.stat(handoffDir);
			handoffDirExists = stats.isDirectory();
		} catch {
			// No handoff dir
		}

		// Detect sandbox via specific metadata file or env var
		if (process.env.BORG_SANDBOX_ID) {
			isSandboxed = true;
			sandboxId = process.env.BORG_SANDBOX_ID;
		} else {
			try {
				const activeSandboxPath = path.join(sandboxDir, 'active.json');
				const content = await fs.readFile(activeSandboxPath, 'utf-8');
				const data = JSON.parse(content);
				isSandboxed = true;
				sandboxId = data.id;
			} catch {
				// Not explicitly sandboxed via local file
			}
		}

		const info = {
			isBorgProject,
			isSandboxed,
			sandboxId,
			handoffDirExists,
		};

		logger.debug('Borg environment detected', LOG_CONTEXT, info);
		return info;
	}
}
