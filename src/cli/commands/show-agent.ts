// Show agent command
// Displays detailed information about a specific agent including history and usage stats

import { getSessionById, readHistory, readGroups } from '../services/storage';
import { formatAgentDetail, formatError } from '../output/formatter';
import { LocalCacheManager } from '../../main/services/LocalCacheManager';

interface ShowAgentOptions {
	json?: boolean;
}

export async function showAgent(agentId: string, options: ShowAgentOptions): Promise<void> {
	try {
		const agent = getSessionById(agentId);

		if (!agent) {
			throw new Error(`Agent not found: ${agentId}`);
		}

		// Get group name if agent belongs to a group
		const groups = readGroups();
		const group = agent.groupId ? groups.find((g) => g.id === agent.groupId) : undefined;

		// Get history entries for this agent
		const history = readHistory(undefined, agent.id);

		// Check for Borg handoff state
		const cacheManager = new LocalCacheManager(process.cwd());
		const borgHandoff = await cacheManager.getLatestHandoff();
		const isBorgNative = borgHandoff && (borgHandoff.sessionId === agent.id || (agent.agentSessionId && borgHandoff.sessionId === agent.agentSessionId));

		// Calculate aggregate stats from history
		let totalInputTokens = 0;
		let totalOutputTokens = 0;
		let totalCacheReadTokens = 0;
		let totalCacheCreationTokens = 0;
		let totalCost = 0;
		let totalElapsedMs = 0;
		let successCount = 0;
		let failureCount = 0;

		for (const entry of history) {
			if (entry.usageStats) {
				totalInputTokens += entry.usageStats.inputTokens || 0;
				totalOutputTokens += entry.usageStats.outputTokens || 0;
				totalCacheReadTokens += entry.usageStats.cacheReadInputTokens || 0;
				totalCacheCreationTokens += entry.usageStats.cacheCreationInputTokens || 0;
				totalCost += entry.usageStats.totalCostUsd || 0;
			}
			if (entry.elapsedTimeMs) {
				totalElapsedMs += entry.elapsedTimeMs;
			}
			if (entry.success === true) {
				successCount++;
			} else if (entry.success === false) {
				failureCount++;
			}
		}

		// Get recent history (last 10 entries)
		const recentHistory = history.sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);

		const output = {
			id: agent.id,
			name: agent.name,
			toolType: agent.toolType,
			cwd: agent.cwd,
			projectRoot: agent.projectRoot,
			groupId: agent.groupId,
			groupName: group?.name,
			autoRunFolderPath: agent.autoRunFolderPath,
			borg: isBorgNative ? {
				version: borgHandoff.version,
				lastUpdated: borgHandoff.timestamp,
				stats: borgHandoff.stats,
				maestro: borgHandoff.maestro
			} : undefined,
			stats: {
				historyEntries: history.length,
				successCount,
				failureCount,
				totalInputTokens,
				totalOutputTokens,
				totalCacheReadTokens,
				totalCacheCreationTokens,
				totalCost,
				totalElapsedMs,
			},
			recentHistory: recentHistory.map((entry) => ({
				id: entry.id,
				type: entry.type,
				timestamp: entry.timestamp,
				summary: entry.summary,
				success: entry.success,
				elapsedTimeMs: entry.elapsedTimeMs,
				cost: entry.usageStats?.totalCostUsd,
			})),
		};

		if (options.json) {
			console.log(JSON.stringify(output, null, 2));
		} else {
			console.log(formatAgentDetail(output));
			if (isBorgNative) {
				console.log('\n--- BORG ASSIMILATED STATE ---');
				console.log(`Borg Version:  ${borgHandoff.version}`);
				console.log(`Last Handoff:  ${new Date(borgHandoff.timestamp).toLocaleString()}`);
				if (borgHandoff.maestro) {
					console.log(`Maestro Status: ${borgHandoff.maestro.status}`);
					console.log(`Current Phase:  ${borgHandoff.maestro.currentPhase}`);
				}
				console.log('------------------------------');
			}
		}
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		if (options.json) {
			console.error(JSON.stringify({ error: message }));
		} else {
			console.error(formatError(message));
		}
		process.exit(1);
	}
}
