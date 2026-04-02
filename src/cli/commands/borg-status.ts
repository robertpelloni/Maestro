import { BorgLiveProvider } from '../../main/services/BorgLiveProvider';
import { LocalCacheManager } from '../../main/services/LocalCacheManager';
import { formatError } from '../output/formatter';

interface BorgStatusOptions {
	json?: boolean;
}

export async function borgStatus(options: BorgStatusOptions): Promise<void> {
	try {
		const provider = new BorgLiveProvider();
		const cacheManager = new LocalCacheManager(process.cwd());

		const [liveStatus, latestHandoff] = await Promise.all([
			provider.getStatus(),
			cacheManager.getLatestHandoff(),
		]);

		const syncSkew = latestHandoff ? Date.now() - latestHandoff.timestamp : null;

		if (options.json) {
			console.log(
				JSON.stringify(
					{
						connected: liveStatus.connected,
						latencyMs: liveStatus.latencyMs,
						hasLocalCache: !!latestHandoff,
						syncSkewMs: syncSkew,
						latestSessionId: latestHandoff?.sessionId,
					},
					null,
					2
				)
			);
		} else {
			console.log('--- Borg Coordination Status ---');
			console.log(`Core Connected: ${liveStatus.connected ? '✅ YES' : '❌ NO'}`);
			if (liveStatus.connected) {
				console.log(`Core Latency:   ${liveStatus.latencyMs}ms`);
			}
			console.log(`Local Cache:    ${latestHandoff ? '✅ ACTIVE' : '⚠️ EMPTY'}`);
			if (syncSkew !== null) {
				console.log(`Sync Skew:      ${(syncSkew / 1000).toFixed(1)}s ago`);
			}
			console.log('-------------------------------');
		}
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		if (options.json) {
			console.error(JSON.stringify({ error: message }));
		} else {
			console.error(formatError(`Failed to get Borg status: ${message}`));
		}
		process.exit(1);
	}
}
