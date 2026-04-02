// List agents command
// Lists all agents/sessions from Maestro storage

import { readSessions, readGroups, getSessionsByGroup, resolveGroupId } from '../services/storage';
import { formatAgents, formatError, AgentDisplay } from '../output/formatter';
import { LocalCacheManager } from '../../main/services/LocalCacheManager';

interface ListAgentsOptions {
	group?: string;
	json?: boolean;
}

export async function listAgents(options: ListAgentsOptions): Promise<void> {
	try {
		let sessions;
		let groupName: string | undefined;

		if (options.group) {
			// Resolve partial group ID
			const groupId = resolveGroupId(options.group);
			sessions = getSessionsByGroup(groupId);
			// Get the group name for display
			const groups = readGroups();
			const group = groups.find((g) => g.id === groupId);
			groupName = group?.name;
		} else {
			sessions = readSessions();
		}

		// Check for latest Borg handoff to identify the active native session
		const cacheManager = new LocalCacheManager(process.cwd());
		const latestHandoff = await cacheManager.getLatestHandoff();
		const activeBorgSessionId = latestHandoff?.sessionId;

		if (options.json) {
			// JSON array output
			const output = sessions.map((s) => ({
				id: s.id,
				name: s.name,
				toolType: s.toolType,
				cwd: s.cwd,
				groupId: s.groupId,
				autoRunFolderPath: s.autoRunFolderPath,
				isBorgActive: activeBorgSessionId === s.id || activeBorgSessionId === s.agentSessionId,
			}));
			console.log(JSON.stringify(output, null, 2));
		} else {
			// Human-readable output
			const displayAgents: (AgentDisplay & { isBorgActive?: boolean })[] = sessions.map((s) => ({
				id: s.id,
				name: s.name,
				toolType: s.toolType,
				cwd: s.cwd,
				groupId: s.groupId,
				autoRunFolderPath: s.autoRunFolderPath,
				isBorgActive: activeBorgSessionId === s.id || activeBorgSessionId === s.agentSessionId,
			}));
			console.log(formatAgents(displayAgents as any, groupName));

			if (activeBorgSessionId) {
				console.log(`\n(Active Borg Session: ${activeBorgSessionId.slice(0, 8)})`);
			}
		}
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		if (options.json) {
			console.error(JSON.stringify({ error: message }));
		} else {
			console.error(formatError(`Failed to list agents: ${message}`));
		}
		process.exit(1);
	}
}
