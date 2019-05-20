import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

class Network {
    create(): void {
        // vpcを作成
        const vpc = new awsx.ec2.Vpc("custom1", {
            cidrBlock: "10.51.0.0/16",
            enableDnsHostnames: true,
            enableClassiclinkDnsSupport: true,
            instanceTenancy: "default",
            tags: {
                Name: "custom1"
            }
        });

        // const vpc = new aws.ec2.Vpc("my-vpc", {
        //     cidrBlock: "10.0.0.0/16",
        //     tags: { Name: "my-vpc" }
        // });

        // インsターネットゲートウェイを作成
        const internatGateway = new aws.ec2.InternetGateway("custom1-igw", {
            vpcId: vpc.id,
            tags: {
                Name: "custom1-igw"
            }
        }, vpc);

        // const igw = new aws.ec2.InternetGateway("my-igw", {
        //     vpcId: vpc.id,
        //     tags: { Name: "my-igw" }
        // }, vpc);
    }
}

const network = new Network();
module.exports.network = network;

