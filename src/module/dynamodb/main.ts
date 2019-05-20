import * as aws from "@pulumi/aws";

class DynamoDB {
    create(): void {
        const counterTable = new aws.dynamodb.Table("counterTable", {
            attributes: [
                { name: "Id", type: "S" },
            ],
            hashKey: "Id",
            readCapacity: 1,
            writeCapacity: 1,
        });
    }
}

const dynamoDB = new DynamoDB();
module.exports.dynamoDB = dynamoDB;
