export class AuggieAgent {
    private commands: Map<string, string> = new Map();

    constructor() {}

    public loadFrontmatterCommand(name: string, content: string): void {
        this.commands.set(name, content);
        console.log(`Loaded frontmatter command: /${name}`);
    }

    public async headlessPrint(prompt: string): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`[CI OUTPUT] Successfully executed headless action for: ${prompt}`);
            }, 100);
        });
    }
}
