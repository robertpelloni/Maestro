package com.maestro;

import com.maestro.agent.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Flow;
import java.util.concurrent.SubmissionPublisher;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.lang.reflect.Method;

public class MaestroRouter {
    private final List<Object> agents;

    public MaestroRouter() {
        agents = new ArrayList<>();
        agents.add(new AiderAgent());
        agents.add(new ClaudeCodeAgent());
        agents.add(new GooseAgent());
        agents.add(new OpenInterpreterAgent());
        agents.add(new ClaudeDesktopAgent());
        agents.add(new OpenCodeAgent());
        agents.add(new BitoAgent());
        agents.add(new LlamafileAgent());
        agents.add(new CodexCliAgent());
        agents.add(new AmazonQAgent());
        agents.add(new OllamaAgent());
        agents.add(new LiteLlmAgent());
        agents.add(new QwenAgent());
        agents.add(new MistralVibeAgent());
        agents.add(new ShellPilotAgent());
        agents.add(new PiAgent());
        agents.add(new SmitheryAgent());
        agents.add(new TraeAgent());
        agents.add(new WarpAgent());
        agents.add(new ManusAgent());
        agents.add(new RovoAgent());
        agents.add(new AuggieAgent());
        agents.add(new ByteRoverAgent());
        agents.add(new CodebuffAgent());
        agents.add(new CodemachineAgent());
        agents.add(new FactoryAgent());
    }

    public Flow.Publisher<String> autoOrchestrateAsync(String task) {
        SubmissionPublisher<String> publisher = new SubmissionPublisher<>();
        ExecutorService executor = Executors.newSingleThreadExecutor();

        executor.submit(() -> {
            try {
                publisher.submit("Starting AutoOrchestrate...");

                for (Object agent : agents) {
                    publisher.submit("Routing to " + agent.getClass().getSimpleName() + "...");

                    try {
                        Method method = agent.getClass().getMethod("executeTaskAsync", String.class);
                        @SuppressWarnings("unchecked")
                        Flow.Publisher<String> agentPublisher = (Flow.Publisher<String>) method.invoke(agent, task);

                        // We need to wait for the publisher to finish before moving to the next agent
                        // A simple subscriber that notifies when done
                        Object lock = new Object();
                        final boolean[] isDone = {false};
                        final Throwable[] error = {null};

                        agentPublisher.subscribe(new Flow.Subscriber<String>() {
                            private Flow.Subscription subscription;

                            @Override
                            public void onSubscribe(Flow.Subscription subscription) {
                                this.subscription = subscription;
                                subscription.request(Long.MAX_VALUE);
                            }

                            @Override
                            public void onNext(String item) {
                                publisher.submit(item);
                            }

                            @Override
                            public void onError(Throwable throwable) {
                                synchronized(lock) {
                                    error[0] = throwable;
                                    isDone[0] = true;
                                    lock.notify();
                                }
                            }

                            @Override
                            public void onComplete() {
                                synchronized(lock) {
                                    isDone[0] = true;
                                    lock.notify();
                                }
                            }
                        });

                        synchronized(lock) {
                            while(!isDone[0]) {
                                lock.wait();
                            }
                        }
                        if (error[0] != null) throw new Exception(error[0]);

                    } catch (Exception e) {
                        publisher.submit("Error executing agent: " + e.getMessage());
                    }
                }

                publisher.submit("AutoOrchestrate Finished");
                publisher.close();

            } catch (Exception e) {
                publisher.closeExceptionally(e);
            } finally {
                executor.shutdown();
            }
        });

        return publisher;
    }
}
