using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Maestro.Agent
{
    public class LiteLlmAgent
    {
        public List<string> Fallbacks { get; private set; } = new List<string>();

        public void ConfigureFallbacks(List<string> models)
        {
            Fallbacks = models;
            Console.WriteLine($"Configured fallback models: {string.Join(", ", Fallbacks)}");
        }

        public async Task<string> StandardizeModelPayloadAsync(string payload)
        {
            await Task.Delay(50);
            return $"{{\"standardized\": true, \"raw\": \"{payload}\"}}";
        }
    }
}
