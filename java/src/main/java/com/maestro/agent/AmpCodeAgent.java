package com.maestro.agent;

import java.util.concurrent.CompletableFuture;

public class AmpCodeAgent {
    private String remoteHost = "localhost";
    private boolean isSyncing = false;

    public CompletableFuture<Void> startFileSync(String remote) {
        return CompletableFuture.runAsync(() -> {
            this.remoteHost = remote;
            this.isSyncing = true;
            System.out.println("Started bi-directional file sync to remote: " + remote);
            try { Thread.sleep(100); } catch (InterruptedException e) {}
        });
    }

    public CompletableFuture<String> runRemoteCommand(String command) {
        return CompletableFuture.supplyAsync(() -> {
            if (!this.isSyncing) {
                throw new RuntimeException("Must establish file sync before executing remote commands");
            }
            try { Thread.sleep(300); } catch (InterruptedException e) {}
            return "[Remote: " + this.remoteHost + "] Executed: " + command;
        });
    }
}
