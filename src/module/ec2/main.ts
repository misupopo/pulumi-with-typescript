import * as aws from "@pulumi/aws";
import * as pulumi from '@pulumi/pulumi';

class Ec2 {
    create(crateValue: any): pulumi.CustomResource {

        // AmazonEC2FullAccess
        // AmazonEC2ReadOnlyAccess
        // AmazonEC2ContainerServiceforEC2Role
        const iamInstanceProfile = "ecsInstanceRole";

        // ec2インスタンスを作成
        const ec2Instance = new aws.ec2.Instance("customEc2Instance", {
            instanceType: "t2.nano",

        })
    }
}

export const ec2 = new Ec2();
