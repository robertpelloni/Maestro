using System.Collections.Generic;
using System.Threading.Tasks;

namespace Maestro.Agent
{
    public class ShellPilotAgent
    {
        public async Task<string> PredictNextCommandAsync(List<string> history)
        {
            await Task.Delay(150);
            return $"Predicted command based on {history.Count} history items: git status";
        }
    }
}
