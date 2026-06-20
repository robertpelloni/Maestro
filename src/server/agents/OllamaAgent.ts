export class OllamaAgent {
	constructor() {}

	public async buildModelfile(modelName: string, instructions: string): Promise<void> {
		console.log(`Building Modelfile for ${modelName}...`);
		return new Promise((resolve) => setTimeout(resolve, 300));
	}

	public async pullLocalModel(modelName: string): Promise<void> {
		console.log(`Pulling local model: ${modelName}`);
		return new Promise((resolve) => setTimeout(resolve, 500));
	}
}
