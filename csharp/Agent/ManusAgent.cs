using System;
using System.Threading.Tasks;

namespace Maestro.Agent
{
    public class ManusAgent
    {
        public bool ContainerActive { get; private set; } = false;

        public async Task<string> RequestRpaContainerAsync()
        {
            Console.WriteLine("Provisioning secure RPA container...");
            await Task.Delay(300);
            ContainerActive = true;
            return "rpa-container-id-9912";
        }
    }
}
