import React, { useState } from 'react';

// Extend window interface to recognize our IPC bindings
declare global {
	interface Window {
		maestro: {
			autoOrchestrate: (prompt: string) => Promise<string>;
			executeTool: (server: string, tool: string) => Promise<string>;
		};
	}
}

export const MaestroDashboard: React.FC = () => {
	const [prompt, setPrompt] = useState('');
	const [result, setResult] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleOrchestrate = async () => {
		if (!prompt) return;
		setIsLoading(true);
		setResult('Orchestrating across 24+ AI sub-agents...');
		try {
			const response = await window.maestro.autoOrchestrate(prompt);
			setResult(response);
		} catch (error) {
			console.error(error);
			setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div style={{ padding: '20px', fontFamily: 'monospace', maxWidth: '800px', margin: '0 auto' }}>
			<h2>Maestro Unified Orchestrator</h2>
			<p>
				Harnessing Aider, Claude Code, Gemini CLI, Amazon Q, Goose, and 19 others simultaneously.
			</p>

			<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
				<textarea
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					placeholder="Enter your complex prompt here (e.g. 'Refactor the authentication flow')"
					rows={4}
					style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
				/>
				<button
					onClick={handleOrchestrate}
					disabled={isLoading || !prompt}
					style={{
						padding: '10px',
						backgroundColor: isLoading ? '#666' : '#007acc',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: isLoading ? 'wait' : 'pointer',
					}}
				>
					{isLoading ? 'Processing...' : 'Run Auto Orchestrate'}
				</button>
			</div>

			{result && (
				<div
					style={{
						marginTop: '20px',
						padding: '15px',
						backgroundColor: '#f5f5f5',
						borderRadius: '4px',
						whiteSpace: 'pre-wrap',
					}}
				>
					<strong>Result:</strong>
					<p>{result}</p>
				</div>
			)}
		</div>
	);
};
