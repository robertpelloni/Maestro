package ai.runmaestro.agents;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Stream;

public class Aider {

    public interface RepoMap {
        CompletableFuture<Void> parseRepository(String root);
        CompletableFuture<List<String>> calculateRelevance(String context);
    }

    public interface GitService {
        CompletableFuture<Void> commitChanges(String message);
        CompletableFuture<List<String>> getModifiedFiles();
    }

    public interface DiffApplicator {
        CompletableFuture<Void> applySearchReplaceBlock(String block);
    }

    public interface LlmProvider {
        Stream<String> streamResponse(String prompt);
    }

    public static class AiderAgent {
        private final RepoMap repoMap;
        private final GitService gitService;
        private final DiffApplicator diffApplicator;
        private final LlmProvider llmProvider;

        public AiderAgent(RepoMap repoMap, GitService gitService, DiffApplicator diffApplicator, LlmProvider llmProvider) {
            this.repoMap = repoMap;
            this.gitService = gitService;
            this.diffApplicator = diffApplicator;
            this.llmProvider = llmProvider;
        }

        public CompletableFuture<Void> runAgent(String prompt) {
            // Not implemented
            return CompletableFuture.completedFuture(null);
        }
    }
}
