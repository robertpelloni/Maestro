using System;
using System.Threading.Tasks;

namespace Maestro.Agent
{
    public class LlamafileAgent
    {
        public string LocalEndpoint { get; private set; } = "";

        public async Task<string> SpawnLocalModelAsync(string binaryPath)
        {
            Console.WriteLine($"Spawning local model process: {binaryPath}");
            await Task.Delay(400);
            LocalEndpoint = "http://localhost:8080";
            return LocalEndpoint;
        }
    }
}
