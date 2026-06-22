using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Maestro.Agents
{
    public interface IRepoMap
    {
        Task ParseRepositoryAsync(string root);
        Task<List<string>> CalculateRelevanceAsync(string context);
    }

    public interface IGitService
    {
        Task CommitChangesAsync(string message);
        Task<List<string>> GetModifiedFilesAsync();
    }

    public interface IDiffApplicator
    {
        Task ApplySearchReplaceBlockAsync(string block);
    }

    public interface ILlmProvider
    {
        IAsyncEnumerable<string> StreamResponseAsync(string prompt);
    }

    public class AiderAgent
    {
        private readonly IRepoMap _repoMap;
        private readonly IGitService _gitService;
        private readonly IDiffApplicator _diffApplicator;
        private readonly ILlmProvider _llmProvider;

        public AiderAgent(IRepoMap repoMap, IGitService gitService, IDiffApplicator diffApplicator, ILlmProvider llmProvider)
        {
            _repoMap = repoMap;
            _gitService = gitService;
            _diffApplicator = diffApplicator;
            _llmProvider = llmProvider;
        }

        public async Task RunAgentAsync(string prompt)
        {
            // Not implemented
            await Task.CompletedTask;
        }
    }
}
