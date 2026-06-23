import { AiderAgent } from './aider';
import { ClaudeCodeAgent } from './ClaudeCodeAgent';
import { GeminiCliAgent } from './GeminiCliAgent';
import { ClaudeDesktopAgent } from './ClaudeDesktopAgent';
import { CodexCliAgent } from './CodexCliAgent';
import { OpenCodeAgent } from './OpenCodeAgent';
import { AmazonQAgent } from './AmazonQAgent';
import { GooseAgent } from './GooseAgent';
import { AmpCodeAgent } from './AmpCodeAgent';
import { AuggieAgent } from './AuggieAgent';
import { BitoAgent } from './BitoAgent';
import { ByteRoverAgent } from './ByteRoverAgent';
import { LiteLlmAgent } from './LiteLlmAgent';
import { LlamafileAgent } from './LlamafileAgent';
import { ManusAgent } from './ManusAgent';
import { MistralVibeAgent } from './MistralVibeAgent';
import { OllamaAgent } from './OllamaAgent';
import { OpenInterpreterAgent } from './OpenInterpreterAgent';
import { PiAgent } from './PiAgent';
import { QwenAgent } from './QwenAgent';
import { RovoAgent } from './RovoAgent';
import { ShellPilotAgent } from './ShellPilotAgent';
import { SmitheryAgent } from './SmitheryAgent';
import { TraeAgent } from './TraeAgent';
import { WarpAgent } from './WarpAgent';

export class MaestroRouter {
	public aider = new AiderAgent();
	public claudeCode = new ClaudeCodeAgent();
	public gemini = new GeminiCliAgent();
	public claudeDesktop = new ClaudeDesktopAgent();
	public codex = new CodexCliAgent();
	public opencode = new OpenCodeAgent();
	public amazonQ = new AmazonQAgent();
	public goose = new GooseAgent();
	public ampcode = new AmpCodeAgent();
	public auggie = new AuggieAgent();
	public bito = new BitoAgent();
	public byteRover = new ByteRoverAgent();
	public liteLlm = new LiteLlmAgent();
	public llamafile = new LlamafileAgent();
	public manus = new ManusAgent();
	public mistralVibe = new MistralVibeAgent();
	public ollama = new OllamaAgent();
	public openInterpreter = new OpenInterpreterAgent();
	public pi = new PiAgent();
	public qwen = new QwenAgent();
	public rovo = new RovoAgent();
	public shellPilot = new ShellPilotAgent();
	public smithery = new SmitheryAgent();
	public trae = new TraeAgent();
	public warp = new WarpAgent();

	constructor() {}

	/**
	 * Executes a generalized orchestration flow using various sub-agents.
	 */
	public async autoOrchestrate(prompt: string): Promise<string> {
		console.log(`[MaestroRouter] Starting orchestration for: ${prompt}`);

		// Example composite flow using ported methods:
		this.bito.setModelProfile('ADVANCED');
		this.codex.enableO1Reasoning(true);
		this.trae.setBuilderMode(true);

		const isApproved = await this.codex.requestUserApproval('Auto Orchestrate Pipeline');
		if (!isApproved) {
			return 'Orchestration cancelled due to missing approval or sandbox constraints.';
		}

		const plan = await this.claudeCode.plan(prompt);
		console.log(`[MaestroRouter] Plan generated:\n${plan}`);

		await this.claudeCode.autoDrive('Applying plan modifications...');
		const solution = await this.claudeCode.solve(prompt);

		return `[MaestroRouter] Completed. Final Solution: ${solution}`;
	}
}
