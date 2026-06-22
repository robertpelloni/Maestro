using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using Maestro.Agent;

namespace Maestro
{
    public class MaestroRouter
    {
        private readonly List<object> _agents;

        public MaestroRouter()
        {
            _agents = new List<object>
            {
                new AiderAgent(),
                new ClaudeCodeAgent(),
                new GooseAgent(),
                new OpenInterpreterAgent(),
                new ClaudeDesktopAgent(),
                new OpenCodeAgent(),
                new BitoAgent(),
                new LlamafileAgent(),
                new CodexCliAgent(),
                new AmazonQAgent(),
                new OllamaAgent(),
                new LiteLlmAgent(),
                new QwenAgent(),
                new MistralVibeAgent(),
                new ShellPilotAgent(),
                new PiAgent(),
                new SmitheryAgent(),
                new TraeAgent(),
                new WarpAgent(),
                new ManusAgent(),
                new RovoAgent(),
                new AuggieAgent(),
                new ByteRoverAgent(),
                new CodebuffAgent(),
                new CodemachineAgent(),
                new FactoryAgent()
            };
        }

        public async IAsyncEnumerable<string> AutoOrchestrateAsync(string task, [EnumeratorCancellation] CancellationToken cancellationToken = default)
        {
            yield return "Starting AutoOrchestrate...";
            foreach (var agent in _agents)
            {
                var method = agent.GetType().GetMethod("ExecuteTaskAsync");
                if (method != null)
                {
                    yield return $"Routing to {agent.GetType().Name}...";
                    var asyncEnumerable = (IAsyncEnumerable<string>)method.Invoke(agent, new object[] { task, cancellationToken })!;

                    await foreach (var result in asyncEnumerable.WithCancellation(cancellationToken))
                    {
                        yield return result;
                    }
                }
            }
            yield return "AutoOrchestrate Finished";
        }
    }
}
