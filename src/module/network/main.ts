import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

class Network {
    create(): void {
        // vpcを作成
        const vpc = new aws.ec2.Vpc("custom1-vpc", {
            cidrBlock: "10.51.0.0/16",
            enableDnsHostnames: true,
            enableClassiclinkDnsSupport: true,
            instanceTenancy: "default",
            tags: {
                Name: "custom1-vpc"
            }
        });

        // awsxはsubnet、routeTable、routeTableAssociation、Route、InternetGateWayなどを一括で作るっぽい
        // const vpc = new awsx.ec2.Vpc("custom1", {
        //     cidrBlock: "10.51.0.0/16",
        //     enableDnsHostnames: true,
        //     enableClassiclinkDnsSupport: true,
        //     instanceTenancy: "default",
        //     tags: {
        //         Name: "custom1"
        //     }
        // });

        // const vpc = new aws.ec2.Vpc("my-vpc", {
        //     cidrBlock: "10.0.0.0/16",
        //     tags: { Name: "my-vpc" }
        // });

        // インターネットゲートウェイを作成
        const internatGateway = new aws.ec2.InternetGateway("custom1_gateway", {
            vpcId: vpc.id
        }, vpc);



        // const igw = new aws.ec2.InternetGateway("my-igw", {
        //     vpcId: vpc.id,
        //     tags: { Name: "my-igw" }
        // }, vpc);

        // プライベートサブネットを作成する
        // const privateSubnet = new aws.ec2.Subnet("private-subnet-1", {
        //     vpcId: vpc.id,
        //     cidrBlock: "10.51.10.0/24",
        //     mapPublicIpOnLaunch: true,
        //     availabilityZone: "a",
        //     tags: {
        //         Name: "private-subnet-1"
        //     },
        // });

        // new aws.ec2.NatGateway("custom1-nat-gatway", {
        //     subnetId:
        // })
    }
}

export const network = new Network();

