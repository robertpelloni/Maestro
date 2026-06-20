using System;

namespace Maestro.Agent
{
    public class TraeAgent
    {
        public bool BuilderMode { get; private set; } = false;

        public void SetBuilderMode(bool enabled)
        {
            BuilderMode = enabled;
            Console.WriteLine($"Trae Builder Mode set to: {enabled}");
        }
    }
}
