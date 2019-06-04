import * as aws from "@pulumi/aws";
import * as pulumi from '@pulumi/pulumi';

class EcsCluster {
    create(crateValue: any): pulumi.CustomResource {
        const customEcsCluster = new aws.ecs.Cluster("customEcsCluster", {
            name: "customEcsCluster"
        });

        // tagsのnameをしないとSecurityGroupそのものに名前がつかず空文字になる
        const customSecurityGroup = new aws.ec2.SecurityGroup("customSecurityGroup", {
            name: "customSecurityGroup",
            description: "customSecurityGroup-sg",
            vpcId: crateValue.id,
            tags: {
                Name: "customSecurityGroup"
            }
        });

        const createSecurityData = [
            {
                description: "in",
                type: "ingress",
                fromPort: 22,
                toPort: 22,
                protocol: "tcp",
                cidrBlocks: ["10.51.0.0/16"],
                self: false
            },
            {
                description: "e",
                type: "egress",
                fromPort: 0,
                toPort: 0,
                protocol: "-1",
                cidrBlocks: ["0.0.0.0/0"],
                self: false
            }
        ];

        createSecurityData.map((createSecurity, index) => {
            const customSecurityGroupRule = new aws.ec2.SecurityGroupRule(`customSecurityGroupRule${index}`, {
                description: createSecurity.description,
                securityGroupId: customSecurityGroup.id,
                type: createSecurity.type,
                fromPort: createSecurity.fromPort,
                toPort: createSecurity.toPort,
                protocol: createSecurity.protocol,
                cidrBlocks: createSecurity.cidrBlocks,
                self: createSecurity.self
            });
        });

        const customLaunchConfiguration = new aws.ec2.LaunchConfiguration("customLaunchConfiguration", {
            name: "customLaunchConfiguration",
            imageId: "ami-0f1d6a4410bcb48d1",
            instanceType: "t2.small",
            securityGroups: [customSecurityGroup.id],
            iamInstanceProfile: "ecsInstanceRole",
            keyName: "customEcsService",
            associatePublicIpAddress: false,

        });

        return customEcsCluster;
    }
}

export const ecsCluster = new EcsCluster();
