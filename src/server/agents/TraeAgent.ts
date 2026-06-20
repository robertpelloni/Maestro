export class TraeAgent {
	public builderMode: boolean = false;

	constructor() {}

	public setBuilderMode(enabled: boolean): void {
		this.builderMode = enabled;
		console.log(`Trae Builder Mode set to: ${enabled}`);
	}
}
