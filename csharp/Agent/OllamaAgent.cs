using System;
using System.Threading.Tasks;

namespace Maestro.Agent
{
    public class OllamaAgent
    {
        public async Task BuildModelfileAsync(string modelName, string instructions)
        {
            Console.WriteLine($"Building Modelfile for {modelName}...");
            await Task.Delay(300);
        }

        public async Task PullLocalModelAsync(string modelName)
        {
            Console.WriteLine($"Pulling local model: {modelName}");
            await Task.Delay(500);
        }
    }
}
