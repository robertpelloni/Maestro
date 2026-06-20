export class OpenCodeAgent {
	private customCommands: Map<string, string> = new Map();
	public lspEnabled: boolean = true;

	constructor() {}

	public loadCustomCommand(id: string, template: string): void {
		this.customCommands.set(id, template);
		console.log(`Loaded custom command macro: ${id}`);
	}

	public async executeCustomCommand(id: string, args: Record<string, string>): Promise<string> {
		return new Promise((resolve, reject) => {
			let template = this.customCommands.get(id);
			if (!template) {
				reject(new Error(`Custom command not found: ${id}`));
				return;
			}

			for (const [key, value] of Object.entries(args)) {
				template = template.split(`$${key}`).join(value);
			}

			setTimeout(() => {
				resolve(`Executed macro '${id}' resulting in: ${template}`);
			}, 100);
		});
	}

	public async requestLspDiagnostics(filepath: string): Promise<string> {
		return new Promise((resolve, reject) => {
			if (!this.lspEnabled) {
				reject(new Error('LSP is currently disabled'));
				return;
			}
			setTimeout(() => {
				resolve(`[{"file": "${filepath}", "line": 42, "msg": "simulated lsp error"}]`);
			}, 150);
		});
	}
}
