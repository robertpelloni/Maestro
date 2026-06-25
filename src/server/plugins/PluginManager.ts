import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { spawn } from 'child_process';

export interface PluginManifest {
	name: string;
	description: string;
	version: string;
	command: string;
	args: string[];
	required_env: string[];
}

export class PluginManager {
	private pluginsDir: string;
	private manifests: Map<string, PluginManifest>;

	constructor(dir?: string) {
		this.pluginsDir = dir || path.join(os.homedir(), '.maestro', 'plugins');
		this.manifests = new Map();

		if (!fs.existsSync(this.pluginsDir)) {
			try {
				fs.mkdirSync(this.pluginsDir, { recursive: true });
			} catch (e: any) {
				console.error(
					`Warning: Failed to create plugin directory ${this.pluginsDir}: ${e.message}`
				);
			}
		}

		this.loadPlugins();
	}

	private loadPlugins() {
		if (!fs.existsSync(this.pluginsDir)) return;

		const entries = fs.readdirSync(this.pluginsDir, { withFileTypes: true });

		for (const entry of entries) {
			if (entry.isDirectory()) {
				const manifestPath = path.join(this.pluginsDir, entry.name, 'manifest.json');
				if (fs.existsSync(manifestPath)) {
					try {
						const data = fs.readFileSync(manifestPath, 'utf8');
						const manifest: PluginManifest = JSON.parse(data);
						this.manifests.set(manifest.name, manifest);
						console.log(`Loaded plugin: ${manifest.name} (v${manifest.version})`);
					} catch (e: any) {
						console.error(`Failed to load plugin manifest at ${manifestPath}: ${e.message}`);
					}
				}
			}
		}
	}

	public getAvailablePlugins(): PluginManifest[] {
		return Array.from(this.manifests.values());
	}

	public async *executePlugin(name: string, input: string): AsyncGenerator<string, void, unknown> {
		const manifest = this.manifests.get(name);

		if (!manifest) {
			throw new Error(`Plugin not found: ${name}`);
		}

		// Mock execution for skeleton
		yield JSON.stringify({
			status: 'streaming',
			data: `Executed plugin: ${name} with input: ${input}`,
		});
	}
}
