import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
// import * as network from '@module/network/main';
import {network} from './src/module/network/main';
import {lambda} from './src/module/lambda/main';
import {lambdaEventSourceMapping} from './src/module/lambdaEventSourceMapping/main';
import {dynamoDB} from './src/module/dynamodb/main';
import {ecr} from './src/module/ecr/main';
import {kinesis} from './src/module/kinesis/main';
import {subscriptionFilter} from './src/module/subscriptionFilter/main';
import {ecsCluster} from './src/module/ecsCluster/main';
import {iam} from './src/module/iam/main';

const lambdaZipFilePath = './publish/test.js.zip';

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

    iam.create();

})();






