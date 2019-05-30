import * as aws from "@pulumi/aws";

class CloudWatchLogs {
    createLogGroup(): void {
        const logGroup = new aws.cloudwatch.LogGroup("myloggroup", {
            name: "myloggroup",
            retentionInDays: 7
        });
    }
    createLogSubscriptionFilter(subscriptionKinesisStream: any, logGroup: any): void {
        const testLambdafunctionLogfilter = new aws.cloudwatch.LogSubscriptionFilter("test_lambdafunction_logfilter", {
            destinationArn: subscriptionKinesisStream.arn,
            distribution: "Random",
            filterPattern: "logtype test",
            logGroup: logGroup,
            roleArn: "arn:aws:iam::932446063073:role/CWLtoKinesisRole",
        });
    }
}

export const cloudWatchLogs = new CloudWatchLogs();

