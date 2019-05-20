import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";



(async () => {

    // Create an AWS resource (S3 Bucket)
    // const bucket = new aws.s3.Bucket("my-bucket");

    // Export the name of the bucket
    // export const bucketName = bucket.id;

    // dynamoDBを作成する
    let counterTable = new aws.dynamodb.Table("counterTable", {
        attributes: [
            { name: "Id", type: "S" },
        ],
        hashKey: "Id",
        readCapacity: 1,
        writeCapacity: 1,
    });

    // lambdaを作成する
    const createLambda = () => {
        let lambda = new aws.lambda.Function("mylambda", {
            runtime: aws.lambda.NodeJS8d10Runtime,
            code: new pulumi.asset.AssetArchive({
                // "index.js": new pulumi.asset.StringAsset("./publish/test.js"),
                // "index.js": new pulumi.asset.FileAsset("./publish/test.js"), // ファイルそのものをアップロードする
                ".": new pulumi.asset.FileArchive("./publish/test.js.zip"), // zipファイルの中にある物を解答してアップする
            }),
            timeout: 300,
            handler: "index.handler",
            role: "arn:aws:iam::932446063073:role/service-role/executeSlackLambda",
        });
    };

    // kinesisを作成する
    const stream = new aws.kinesis.Stream("mystream", {
        shardCount: 1
    });

    // subscription用のkinesisを作成する
    const subscriptionKinesisStream = new aws.kinesis.Stream("RootAccess", {
        name: "RootAccess",
        shardCount: 1
    });

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

    const logGroup = new aws.cloudwatch.LogGroup("myloggroup", {
        name: "myloggroup",
        retentionInDays: 7
    });

    // 指定されたkinesisに紐づくように設定
    const testLambdafunctionLogfilter = new aws.cloudwatch.LogSubscriptionFilter("test_lambdafunction_logfilter", {
        destinationArn: subscriptionKinesisStream.arn,
        distribution: "Random",
        filterPattern: "logtype test",
        logGroup: logGroup,
        roleArn: "arn:aws:iam::932446063073:role/CWLtoKinesisRole",
    });

    createLambda();

})();






