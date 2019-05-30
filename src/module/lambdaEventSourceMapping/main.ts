import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';

class LambdaEventSourceMapping {
    create(lambdaCreateValue: any): void {
        // lambdaEventSourceMappingを作成し、lambdaと他のresourceを紐づける

        // eventSourceMappingはSQSからLambdaにも紐づけることができる
        // eventSourceMappingを通して、DynamoDBとLambdaを紐づけるにはLambdaにセットしてあるロールにDynamoDBのFullAccess権限がないとエラーになる
        const example = new aws.lambda.EventSourceMapping("eventSourceMapping", {
            batchSize: 1,
            eventSourceArn: lambdaCreateValue.streamArn,
            enabled: true,
            functionName: lambdaCreateValue.functionName,
            startingPosition: "TRIM_HORIZON",
        });
    };
}

export const lambdaEventSourceMapping = new LambdaEventSourceMapping();
