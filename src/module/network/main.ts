import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as pulumi from '@pulumi/pulumi';

class Network {
    create(): {
        vpc: pulumi.CustomResource,
        publicSubnet: pulumi.CustomResource
    } {
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
            vpcId: vpc.id,
            tags: {
                Name: "custom1_gateway"
            },
        });

        // const igw = new aws.ec2.InternetGateway("my-igw", {
        //     vpcId: vpc.id,
        //     tags: { Name: "my-igw" }
        // }, vpc);

        // プライベートサブネットを作成する
        const privateSubnet = new aws.ec2.Subnet("private-subnet-1", {
            vpcId: vpc.id,
            cidrBlock: "10.51.10.0/24",
            mapPublicIpOnLaunch: false,
            availabilityZone: "ap-northeast-1a",
            tags: {
                Name: "private-subnet-1"
            },
        });

        // パブリックサブネットを作成する
        const publicSubnet = new aws.ec2.Subnet("public-subnet-1", {
            vpcId: vpc.id,
            cidrBlock: "10.51.1.0/24",
            mapPublicIpOnLaunch: true,
            availabilityZone: "ap-northeast-1a",
            tags: {
                Name: "public-subnet-1"
            },
        });

        // ナットゲートウェイを作成する
        // const natGateway = new aws.ec2.NatGateway("nat-gateway", {
        //     subnetId:
        // });

        // プラベートルートテーブルを作成する
        const privateRouteTable = new aws.ec2.RouteTable("private-route-table", {
            vpcId: vpc.id,
            tags: {
                cidrBlock: "0.0.0.0/0",
                gatewayId: "",
                Name: "private-route-table"
            }
        });

        // パブリックルートテーブルを作成する
        const publicRouteTable = new aws.ec2.RouteTable("public-route-table", {
            vpcId: vpc.id,
            tags: {
                cidrBlock: "0.0.0.0/0",
                gatewayId: "",
                Name: "public-route-table"
            }
        });


        // new aws.ec2.NatGateway("custom1-nat-gatway", {
        //     subnetId:
        // })

        // プライベートを紐付け
        const routeTablePrivateAssociation = new aws.ec2.RouteTableAssociation("routeTable-private-association", {
            routeTableId: privateRouteTable.id,
            subnetId: privateSubnet.id,
        });

        // パブリックを紐付け
        const routeTablePublicAssociation = new aws.ec2.RouteTableAssociation("routeTable-public-association", {
            routeTableId: publicRouteTable.id,
            subnetId: publicSubnet.id,
        });

        return {
            vpc,
            publicSubnet
        };
    }
}

export const network = new Network();

