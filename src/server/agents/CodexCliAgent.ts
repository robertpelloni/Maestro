export class CodexCliAgent {
    public sandboxMode: string = "workspace-write";
    public reasoningMode: boolean = false;

    constructor() {}

    public enableO1Reasoning(enabled: boolean): void {
        this.reasoningMode = enabled;
        console.log(`O1 Reasoning mode set to: ${enabled}`);
    }

    public setSandboxMode(mode: string): void {
        this.sandboxMode = mode;
        console.log(`Sandbox mode set to: ${mode}`);
    }

    public async requestUserApproval(action: string): Promise<boolean> {
        console.log(`[TUI Prompt] User approval required for: ${action}`);

        return new Promise((resolve) => {
            setTimeout(() => {
                if (this.sandboxMode === "read-only") {
                    console.log("[TUI] Action denied by read-only sandbox");
                    resolve(false);
                } else {
                    console.log("[TUI] Action approved");
                    resolve(true);
                }
            }, 300);
        });
    }
}
