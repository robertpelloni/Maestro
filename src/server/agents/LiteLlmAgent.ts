export class LiteLlmAgent {
	public fallbacks: string[] = [];

	constructor() {}

	public configureFallbacks(models: string[]): void {
		this.fallbacks = models;
		console.log(`Configured fallback models: ${models.join(', ')}`);
	}

	public async standardizeModelPayload(payload: string): Promise<string> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(`{"standardized": true, "raw": "${payload}"}`);
			}, 50);
		});
	}
}
