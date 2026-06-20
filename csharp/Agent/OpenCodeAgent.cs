using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Maestro.Agent
{
    public class OpenCodeAgent
    {
        private Dictionary<string, string> CustomCommands = new Dictionary<string, string>();
        public bool LspEnabled { get; set; } = true;

        public void LoadCustomCommand(string id, string template)
        {
            CustomCommands[id] = template;
            Console.WriteLine($"Loaded custom command macro: {id}");
        }

        public async Task<string> ExecuteCustomCommandAsync(string id, Dictionary<string, string> args)
        {
            if (!CustomCommands.TryGetValue(id, out string template))
            {
                throw new Exception($"Custom command not found: {id}");
            }

            foreach (var kvp in args)
            {
                template = template.Replace($"${kvp.Key}", kvp.Value);
            }

            await Task.Delay(100);
            return $"Executed macro '{id}' resulting in: {template}";
        }

        public async Task<string> RequestLspDiagnosticsAsync(string filepath)
        {
            if (!LspEnabled)
            {
                throw new Exception("LSP is currently disabled");
            }
            await Task.Delay(150);
            return $"[{{\"file\": \"{filepath}\", \"line\": 42, \"msg\": \"simulated lsp error\"}}]";
        }
    }
}
