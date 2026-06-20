using System;
using System.Threading.Tasks;

namespace Maestro.Agent
{
    public class RovoAgent
    {
        public async Task<string> QueryEnterpriseGraphAsync(string query)
        {
            await Task.Delay(400);
            return $"Enterprise graph results for: {query}";
        }

        public async Task TransitionIssueStatusAsync(string issueKey, string status)
        {
            Console.WriteLine($"Transitioned {issueKey} to {status}");
            await Task.Delay(200);
        }
    }
}
