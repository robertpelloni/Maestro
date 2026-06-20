using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Maestro.Agent
{
    public class PiAgent
    {
        public async Task<List<string>> ScanMonorepoWorkspacesAsync(string directory)
        {
            Console.WriteLine($"Scanning monorepo workspaces in {directory}...");
            await Task.Delay(200);
            return new List<string> { "packages/core", "packages/web", "apps/desktop" };
        }
    }
}
