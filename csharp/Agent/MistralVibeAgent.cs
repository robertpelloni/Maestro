using System;

namespace Maestro.Agent
{
    public class MistralVibeAgent
    {
        public string VibeProfile { get; private set; } = "default";

        public void SetVibeProfile(string profile)
        {
            VibeProfile = profile;
            Console.WriteLine($"Vibe profile set to: {profile}");
        }
    }
}
