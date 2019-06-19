import {ec2} from '../../module/ec2/main';
import {securityGroup} from '../../module/securityGroup/main';
import {network} from '../../module/network/main';
import {iam} from '../../module/iam/main';

class Ec2Component {
    run(): void {
        const customNetwork = network.create();
        const customSecurityGroup = securityGroup.create(customNetwork.vpc);
        const customIam = iam.create();

        ec2.create({
            role: customIam,
            securityGroup: customSecurityGroup,
            publicSubnet: customNetwork.publicSubnet
        });
    }
}

export const ec2Component = new Ec2Component();
