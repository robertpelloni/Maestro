export class ShellPilotAgent {
	constructor() {}

	public async predictNextCommand(history: string[]): Promise<string> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(`Predicted command based on ${history.length} history items: git status`);
			}, 150);
		});
	}
}
