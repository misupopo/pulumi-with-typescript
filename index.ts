import {ec2Component} from './src/component/ec2/main';

// const lambdaZipFilePath = './publish/test.js.zip';

(async () => {


    // lambda.create(lambdaZipFilePath);

    // const netWorkValue: any = network.create();

    // ecr.create();

    // const dynamoDBCreateValue: any = dynamoDB.create();
    //
    // const lambdaCreateValue: any = lambda.create(lambdaZipFilePath);
    //
    // // lambdaを紐づける
    // lambdaEventSourceMapping.create({
    //     streamArn: dynamoDBCreateValue.streamArn,
    //     functionName: lambdaCreateValue.arn
    // });
    //
    // const kinesisCreateValue: any = kinesis.create();

    // ecsCluster.create(netWorkValue);

    // subscriptionFilter.create({
    //     destinationArn: kinesisCreateValue.arn,
    //     roleArn: 'arn:aws:iam::932446063073:role/service-role/executeSlackLambda'
    // });

    ec2Component.run();
})();

