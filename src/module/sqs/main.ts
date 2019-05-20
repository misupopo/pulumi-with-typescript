import * as aws from "@pulumi/aws";

class Sqs {
    create(): void {
        const sqs = new aws.sqs.Queue("mysqs.fifo", {
            name: "mysqs.fifo",
            visibilityTimeoutSeconds: 30,
            messageRetentionSeconds: 345600,
            maxMessageSize: 262144,
            delaySeconds: 0,
            receiveWaitTimeSeconds: 20,
            fifoQueue: true,
            contentBasedDeduplication: true,
        });
    }
}

const sqs = new Sqs();
module.exports.sqs = sqs;
