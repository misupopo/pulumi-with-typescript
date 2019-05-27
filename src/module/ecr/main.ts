import * as aws from "@pulumi/aws";

class Ecr {
    create(): void {
        // ecrを作成
        const repository = new aws.ecr.Repository("myrepository", {
            name: "myrepository"
        });
    }
}

export const ecr = new Ecr();

