import { BorgLiveProvider } from '../../main/services/BorgLiveProvider';
import { formatError, formatInfo } from '../output/formatter';

interface BorgListOptions {
	json?: boolean;
}

export async function borgList(options: BorgListOptions): Promise<void> {
	try {
		const provider = new BorgLiveProvider();
		const sessions = await provider.listSessions();

		if (options.json) {
			console.log(JSON.stringify(sessions, null, 2));
			return;
		}

		if (sessions.length === 0) {
			console.log(formatInfo('No Borg sessions found.'));
			return;
		}

		console.log('--- Borg Sessions ---');
		console.log(`${'ID'.padEnd(10)} ${'Status'.padEnd(12)} ${'Task'}`);
		console.log('-'.repeat(60));

		for (const session of sessions) {
			const id = session.sessionId.slice(0, 8);
			const status = session.status.toUpperCase();
			const task = session.task;
			console.log(`${id.padEnd(10)} ${status.padEnd(12)} ${task}`);
		}
		console.log('---------------------');
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		if (options.json) {
			console.error(JSON.stringify({ error: message }));
		} else {
			console.error(formatError(`Failed to list Borg sessions: ${message}`));
		}
		process.exit(1);
	}
}
