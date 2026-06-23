package com.maestro;

import java.util.concurrent.Flow;
import java.util.concurrent.CountDownLatch;

public class Main {
    public static void main(String[] args) {
        System.out.println("Maestro Orchestrator (Java Asynchronous Engine)");

        MaestroRouter router = new MaestroRouter();
        Flow.Publisher<String> publisher = router.autoOrchestrateAsync("Initialize multi-modal AI systems");

        CountDownLatch latch = new CountDownLatch(1);

        publisher.subscribe(new Flow.Subscriber<String>() {
            private Flow.Subscription subscription;

            @Override
            public void onSubscribe(Flow.Subscription subscription) {
                this.subscription = subscription;
                subscription.request(Long.MAX_VALUE);
            }

            @Override
            public void onNext(String item) {
                System.out.println(item);
            }

            @Override
            public void onError(Throwable throwable) {
                System.err.println("Error: " + throwable.getMessage());
                latch.countDown();
            }

            @Override
            public void onComplete() {
                System.out.println("Maestro Execution Completed.");
                latch.countDown();
            }
        });

        try {
            latch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
