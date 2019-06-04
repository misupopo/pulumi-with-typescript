import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

class IAM {
    create(): pulumi.CustomResource {
        // const role = new aws.iam.Role('customRole', {
        //     assumeRolePolicy: JSON.stringify({
        //         Version: '2012-10-17',
        //         Statement: [
        //             {
        //                 "Action": "ec2:*",
        //                 "Effect": "Allow",
        //                 "Resource": "*"
        //             }
        //         ],
        //     }),
        // });

        const role = new aws.iam.Role('customRole', {
            name: 'customRole',
            assumeRolePolicy: JSON.stringify({
                Version: '2012-10-17',
                Statement: [{
                    Action: 'sts:AssumeRole',
                    Principal: {
                        Service: 'ec2.amazonaws.com',
                    },
                    Effect: 'Allow',
                    Sid: '',
                }],
            }),
        });

        // const rolePolicy = new aws.iam.RolePolicy('customRolePolicy', {
        //     name: 'customRolePolicy',
        //     role: role,
        //     policy: JSON.stringify({
        //         Version: '2012-10-17',
        //         Statement: [
        //             {
        //                 "Effect": "Allow",
        //                 "Action": "ec2:Describe*",
        //                 "Resource": "*"
        //             },
        //             {
        //                 "Effect": "Allow",
        //                 "Action": "elasticloadbalancing:Describe*",
        //                 "Resource": "*"
        //             },
        //             {
        //                 "Effect": "Allow",
        //                 "Action": [
        //                     "cloudwatch:ListMetrics",
        //                     "cloudwatch:GetMetricStatistics",
        //                     "cloudwatch:Describe*"
        //                 ],
        //                 "Resource": "*"
        //             },
        //             {
        //                 "Effect": "Allow",
        //                 "Action": "autoscaling:Describe*",
        //                 "Resource": "*"
        //             }
        //         ],
        //     }),
        // });

        // AWS管理ポリシーを当てる
        const amazonEC2ReadOnlyAccess = new aws.iam.RolePolicyAttachment("amazonEC2ReadOnlyAccess", {
            role: role,
            policyArn: 'arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess'
        });
        //
        // const cloudWatchLogsFullAccess = new aws.iam.RolePolicyAttachment("cloudWatchLogsFullAccess", {
        //     role: role,
        //     policyArn: 'arn:aws:iam::aws:policy/CloudWatchLogsFullAccess'
        // });

        // ポリシーが二つ以上つかないため保留
        // const policyData = [
        //     'arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess',
        //     // 'arn:aws:iam::aws:policy/CloudWatchLogsFullAccess'
        // ];
        //
        // for (let i = 0; i < policyData.length; i++) {
        //
        //     console.log(policyData[i]);
        //
        //     new aws.iam.RolePolicyAttachment("cloudWatchLogsFullAccess" + i, {
        //         role: role,
        //         policyArn: policyData[i]
        //     });
        // }

        return role;
    }
}

export const iam = new IAM();
