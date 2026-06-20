export class WarpAgent {
	constructor() {}

	public async parseTerminalBlock(ptyStream: string): Promise<string> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(`Parsed semantic block from PTY stream size: ${ptyStream.length}`);
			}, 50);
		});
	}
}
