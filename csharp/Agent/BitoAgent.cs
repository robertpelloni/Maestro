using System;
using System.Threading.Tasks;

namespace Maestro.Agent
{
    public class BitoAgent
    {
        public string ModelProfile { get; private set; } = "ADVANCED";
        public int MaxContext { get; private set; } = 240000;

        public void SetModelProfile(string profile)
        {
            if (profile == "BASIC") {
                MaxContext = 40000;
            } else {
                MaxContext = 240000;
            }
            ModelProfile = profile;
            Console.WriteLine($"Bito Model Profile set to: {ModelProfile} (Limit: {MaxContext})");
        }

        public async Task<string> InjectPromptMacroAsync(string template, string fileContent)
        {
            await Task.Delay(50);

            string result = template.Replace("{{%input%}}", fileContent);

            if (result.Length > MaxContext) {
                throw new Exception($"Injected prompt exceeds maximum context length of {MaxContext}");
            }

            return result;
        }
    }
}
