import { ipcMain } from 'electron';
import { MaestroRouter } from '../../server/agents/MaestroRouter';

export function setupMaestroHandlers() {
	const router = new MaestroRouter();

	ipcMain.handle('maestro:autoOrchestrate', async (event, prompt: string) => {
		try {
			return await router.autoOrchestrate(prompt);
		} catch (e) {
			console.error(e);
			throw e;
		}
	});

	ipcMain.handle('maestro:executeTool', async (event, server: string, tool: string) => {
		try {
			return await router.claudeDesktop.executeMCPTool(server, tool);
		} catch (e) {
			console.error(e);
			throw e;
		}
	});
}
