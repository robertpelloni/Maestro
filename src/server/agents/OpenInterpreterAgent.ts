export class OpenInterpreterAgent {
	constructor() {}

	public async executeInRepl(code: string): Promise<string> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(`REPL execution output for: ${code}`);
			}, 200);
		});
	}

	public captureScreen(): string {
		return 'base64_encoded_screen_capture';
	}

	public executeMouseClick(x: number, y: number): void {
		console.log(`Executed mouse click at (${x}, ${y})`);
	}
}
