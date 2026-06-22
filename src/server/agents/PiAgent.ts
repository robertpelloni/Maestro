export class PiAgent {
	constructor() {}

	public async scanMonorepoWorkspaces(directory: string): Promise<string[]> {
		console.log(`Scanning monorepo workspaces in ${directory}...`);
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(['packages/core', 'packages/web', 'apps/desktop']);
			}, 200);
		});
	}
}
