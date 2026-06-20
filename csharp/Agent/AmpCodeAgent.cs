using System;
using System.Threading.Tasks;

namespace Maestro.Agent
{
    public class AmpCodeAgent
    {
        public string RemoteHost { get; private set; } = "localhost";
        public bool IsSyncing { get; private set; } = false;

        public async Task StartFileSyncAsync(string remote)
        {
            RemoteHost = remote;
            IsSyncing = true;
            Console.WriteLine($"Started bi-directional file sync to remote: {remote}");
            await Task.Delay(100);
        }

        public async Task<string> RunRemoteCommandAsync(string command)
        {
            if (!IsSyncing)
            {
                throw new Exception("Must establish file sync before executing remote commands");
            }
            await Task.Delay(300);
            return $"[Remote: {RemoteHost}] Executed: {command}";
        }
    }
}
