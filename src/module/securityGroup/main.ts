import * as aws from "@pulumi/aws";
import * as pulumi from '@pulumi/pulumi';

class SecurityGroup {
    create(vpc: any): pulumi.CustomResource {
        const customSecurityGroup = new aws.ec2.SecurityGroup('customSecurityGroup', {
            name: "customSecurityGroup",
            description: "customSecurityGroup-sg",
            vpcId: vpc.id,
            tags: {
                Name: "customSecurityGroup"
            }
        });

        return customSecurityGroup;
    }
}

export const securityGroup = new SecurityGroup();
