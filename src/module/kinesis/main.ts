import * as aws from "@pulumi/aws";
import * as pulumi from '@pulumi/pulumi';

class Kinesis {
    create(): pulumi.CustomResource {
        // subscription用のkinesisを作成する
        const subscriptionKinesisStream = new aws.kinesis.Stream("subscriptionKinesisStream", {
            name: "subscriptionKinesisStream",
            shardCount: 1,
            retentionPeriod: 168
        });

        return subscriptionKinesisStream;
    }
}

export const kinesis = new Kinesis();
