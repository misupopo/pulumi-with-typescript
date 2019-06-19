import * as aws from "@pulumi/aws";

class Ec2 {
    create(createValue: any): void {

        // AmazonEC2FullAccess
        // AmazonEC2ReadOnlyAccess
        // AmazonEC2ContainerServiceforEC2Role
        const iamInstanceProfile = "ecsInstanceRole";

        // ec2インスタンスを作成
        const ec2Instance = new aws.ec2.Instance("customEc2Instance", {
            ami: 'ami-0008a301',
            instanceType: 't2.nano',
            iamInstanceProfile: 'customRole',
            keyName: 'test',
            associatePublicIpAddress: true,
            vpcSecurityGroupIds: [
                createValue.securityGroup.id
            ],
            subnetId: createValue.publicSubnet.id,
            privateIp: '10.31.30.30',

            tags: {
                Name: "customEc2Instance",
                AutoStop: 'true',
                monitoring: 'yes',
                env: 'dev'
            }
        });
    }
}

export const ec2 = new Ec2();
