using System;
using System.Threading.Tasks;

namespace Maestro.Agent
{
    public class CodexCliAgent
    {
        public string SandboxMode { get; private set; } = "workspace-write";
        public bool ReasoningMode { get; private set; } = false;

        public void EnableO1Reasoning(bool enabled)
        {
            ReasoningMode = enabled;
            Console.WriteLine($"O1 Reasoning mode set to: {enabled}");
        }

        public void SetSandboxMode(string mode)
        {
            SandboxMode = mode;
            Console.WriteLine($"Sandbox mode set to: {mode}");
        }

        public async Task<bool> RequestUserApprovalAsync(string action)
        {
            Console.WriteLine($"[TUI Prompt] User approval required for: {action}");
            await Task.Delay(300);

            if (SandboxMode == "read-only")
            {
                Console.WriteLine("[TUI] Action denied by read-only sandbox");
                return false;
            }

            Console.WriteLine("[TUI] Action approved");
            return true;
        }
    }
}
