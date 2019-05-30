import * as aws from "@pulumi/aws";
import * as pulumi from '@pulumi/pulumi';

class DynamoDB {
    create(): pulumi.CustomResource {
        const counterTable = new aws.dynamodb.Table("counterTable", {
            name: 'counterTable',
            readCapacity: 1,
            writeCapacity: 1,
            hashKey: 'Id',
            streamEnabled: true,
            streamViewType: "NEW_AND_OLD_IMAGES",
            attributes: [
                {
                    name: "Id",
                    type: "S"
                },
            ],
        });

        return counterTable;
    }
}

export const dynamoDB = new DynamoDB();
