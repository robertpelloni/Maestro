import React, { useState } from 'react';

export const MaestroDashboard: React.FC = () => {
  const [task, setTask] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [agents, setAgents] = useState<string[]>([]);
  const [isWails, setIsWails] = useState(false);

  // Check if we are running in Wails (Go backend) or Electron (Node backend)
  React.useEffect(() => {
    if (window.go && window.go.wailsbindings && window.go.wailsbindings.MaestroApp) {
        setIsWails(true);
        window.go.wailsbindings.MaestroApp.GetAvailableAgents().then((res: string[]) => {
            setAgents(res);
        }).catch((err: any) => console.error("Failed to load Wails agents", err));
    } else {
        setIsWails(false);
    }
  }, []);

  const handleOrchestrate = async () => {
    setOutput([]);
    try {
        if (isWails) {
            // Wails Bridge
            const result = await window.go.wailsbindings.MaestroApp.AutoOrchestrate(task);
            setOutput(prev => [...prev, result]);
        } else if (window.maestro) {
            // Electron Bridge
            const result = await window.maestro.autoOrchestrate(task);
            setOutput(prev => [...prev, result]);
        } else {
            setOutput(["Error: No IPC bridge found."]);
        }
    } catch (err: any) {
        setOutput(prev => [...prev, `Error: ${err.message}`]);
    }
  };

  const handleHypercodeState = async () => {
    try {
        if (isWails) {
             const result = await window.go.wailsbindings.MaestroApp.HypercodeIPC("GetSessionState", "");
             setOutput(prev => [...prev, `Hypercode State (Wails): ${result}`]);
        } else if (window.maestro) {
             const result = await window.maestro.hypercodeIPC("GetSessionState", "");
             setOutput(prev => [...prev, `Hypercode State (Electron): ${result}`]);
        }
    } catch(err: any) {
        setOutput(prev => [...prev, `Hypercode Error: ${err.message}`]);
    }
  }

  return (
    <div className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4">Maestro Orchestrator ({isWails ? 'Go/Wails' : 'Node/Electron'})</h2>

      {agents.length > 0 && (
          <div className="mb-4">
              <strong>Available Agents:</strong> {agents.join(", ")}
          </div>
      )}

      <div className="flex flex-col gap-2 mb-4">
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter orchestration task..."
          className="w-full p-2 border rounded resize-y text-black"
          rows={3}
        />
        <div className="flex gap-2">
            <button
            onClick={handleOrchestrate}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
            Auto Orchestrate
            </button>
            <button
            onClick={handleHypercodeState}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
            Fetch Hypercode State
            </button>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded min-h-[200px] font-mono text-sm max-h-[400px] overflow-y-auto">
        {output.length === 0 ? (
          <span className="text-gray-500">Awaiting execution...</span>
        ) : (
          output.map((line, i) => (
            <div key={i} className="mb-1 text-green-600 dark:text-green-400">{line}</div>
          ))
        )}
      </div>
    </div>
  );
};
