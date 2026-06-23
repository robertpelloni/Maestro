export class ManusAgent {
	public containerActive: boolean = false;

	constructor() {}

	public async requestRpaContainer(): Promise<string> {
		console.log('Provisioning secure RPA container...');
		return new Promise((resolve) => {
			setTimeout(() => {
				this.containerActive = true;
				resolve('rpa-container-id-9912');
			}, 300);
		});
	}
}
