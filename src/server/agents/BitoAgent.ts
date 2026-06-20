export class BitoAgent {
	public modelProfile: string = 'ADVANCED';
	public maxContext: number = 240000;

	constructor() {}

	public setModelProfile(profile: 'BASIC' | 'ADVANCED'): void {
		if (profile === 'BASIC') {
			this.maxContext = 40000;
		} else {
			this.maxContext = 240000;
		}
		this.modelProfile = profile;
		console.log(`Bito Model Profile set to: ${this.modelProfile} (Limit: ${this.maxContext})`);
	}

	public async injectPromptMacro(template: string, fileContent: string): Promise<string> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const result = template.split('{{%input%}}').join(fileContent);
				if (result.length > this.maxContext) {
					reject(new Error(`Injected prompt exceeds maximum context length of ${this.maxContext}`));
					return;
				}
				resolve(result);
			}, 50);
		});
	}
}
