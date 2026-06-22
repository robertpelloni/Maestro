export class AmpCodeAgent {
	public remoteHost: string = 'localhost';
	public isSyncing: boolean = false;

	constructor() {}

	public async startFileSync(remote: string): Promise<void> {
		this.remoteHost = remote;
		this.isSyncing = true;
		console.log(`Started bi-directional file sync to remote: ${remote}`);
		return new Promise((resolve) => setTimeout(resolve, 100));
	}

	public async runRemoteCommand(command: string): Promise<string> {
		return new Promise((resolve, reject) => {
			if (!this.isSyncing) {
				reject(new Error('Must establish file sync before executing remote commands'));
				return;
			}
			setTimeout(() => {
				resolve(`[Remote: ${this.remoteHost}] Executed: ${command}`);
			}, 300);
		});
	}
}
