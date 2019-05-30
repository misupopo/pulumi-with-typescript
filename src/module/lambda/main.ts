import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';

class Lambda {
    create(zipPath: string): pulumi.CustomResource {
        // lambdaを作成する
        const lambda = new aws.lambda.Function('mylambda', {
            name: 'mylambda',
            runtime: aws.lambda.NodeJS8d10Runtime,
            code: new pulumi.asset.AssetArchive({
                // "index.js": new pulumi.asset.StringAsset("./publish/test.js"),
                // "index.js": new pulumi.asset.FileAsset("./publish/test.js"), // ファイルそのものをアップロードする
                '.': new pulumi.asset.FileArchive(zipPath), // zipファイルの中にある物を解答してアップする
            }),
            timeout: 300,
            handler: 'index.handler',
            role: 'arn:aws:iam::932446063073:role/service-role/executeSlackLambda',
        });

        return lambda;
    };
}

// const lambda = new Lambda();
// module.exports.lambda = lambda;

export const lambda = new Lambda();
