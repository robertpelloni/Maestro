export class GeminiCliAgent {
	public useSearchGrounding: boolean = true;
	private checkpoints: Map<string, string> = new Map();

	constructor() {}

	/**
	 * Generates a response with Google Search grounding
	 */
	public async generateWithGrounding(prompt: string): Promise<string> {
		return new Promise((resolve) => {
			setTimeout(() => {
				const grounding = this.useSearchGrounding
					? 'Searched Google for: latest context'
					: 'Grounding disabled';
				resolve(`Response for '${prompt}' [${grounding}]`);
			}, 400);
		});
	}

	public saveCheckpoint(name: string, state: string): void {
		this.checkpoints.set(name, state);
	}

	public loadCheckpoint(name: string): string {
		const state = this.checkpoints.get(name);
		if (!state) throw new Error(`Checkpoint not found: ${name}`);
		return state;
	}

	/**
	 * Simulates a JSON stream output
	 */
	public async *streamJson(prompt: string): AsyncGenerator<string> {
		for (let i = 0; i < 3; i++) {
			yield `{"chunk": ${i}, "content": "part ${i}"}`;
			await new Promise((r) => setTimeout(r, 100));
		}
	}
}
