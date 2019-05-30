import * as aws from "@pulumi/aws";

class SubscriptionFilter {
    create(crateValue: any): void {
        const logSubscriptionFilter = new aws.cloudwatch.LogSubscriptionFilter("logSubscriptionFilter", {
            name: 'testLambdaFunctionLogFilter',
            destinationArn: crateValue.destinationArn,
            filterPattern: 'logtype test',
            logGroup: crateValue.logGroup,
            roleArn: crateValue.roleArn,
        });
    }
}

export const subscriptionFilter = new SubscriptionFilter();
