import * as aws from "@pulumi/aws";

class Kinesis {
    create(): void {
        // kinesisを作成する
        const stream = new aws.kinesis.Stream("mystream", {
            shardCount: 1
        });

        // subscription用のkinesisを作成する
        const subscriptionKinesisStream = new aws.kinesis.Stream("RootAccess", {
            name: "RootAccess",
            shardCount: 1
        });
    }
}

const kinesis = new Kinesis();
module.exports.kinesis = kinesis;
