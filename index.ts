import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
// import * as network from '@module/network/main';
import {network} from './src/module/network/main';
import {lambda} from './src/module/lambda/main';

(async () => {
    // lambda.create('./publish/test.js.zip');

    network.create();

})();






