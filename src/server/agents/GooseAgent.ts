export class GooseAgent {
    public hintsFile: string = ".goosehints";
    public acpSessionActive: boolean = false;

    constructor() {}

    public async loadGooseHints(filepath: string): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Loaded hints from ${filepath}: Avoid mutating core databases`);
            }, 50);
        });
    }

    public async initAcpSession(provider: string): Promise<boolean> {
        console.log(`Initializing ACP Session for provider: ${provider}`);
        return new Promise((resolve) => {
            setTimeout(() => {
                this.acpSessionActive = true;
                resolve(true);
            }, 300);
        });
    }
}
