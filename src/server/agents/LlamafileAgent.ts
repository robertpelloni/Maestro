export class LlamafileAgent {
	public localEndpoint: string = '';

	constructor() {}

	public async spawnLocalModel(binaryPath: string): Promise<string> {
		console.log(`Spawning local model process: ${binaryPath}`);
		return new Promise((resolve) => {
			setTimeout(() => {
				this.localEndpoint = 'http://localhost:8080';
				resolve(this.localEndpoint);
			}, 400);
		});
	}
}
