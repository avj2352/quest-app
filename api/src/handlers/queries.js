/**
 * PAJ - all custom queries handled here
 */
import { GroupController } from "../controllers/group.controller";
import { UserController } from "../controllers/user.controller";


export class QueriesController {
    constructor () {
        this.group = new GroupController();
        this.user = new UserController();
        this.filterGroupsByUserPremium = this.filterGroupsByUserPremium.bind(this);
    }

    filterGroupsByUserPremium (req, res) {
        const email = req.header('email');
        if(email && email !=='') {
            this.user.fetchUserByEmail(email)
            .then(data => {
                if(!data.premium) {
                    this.group.filterGroupsWithoutPremium(req, res);
                } else {
                    this.group.getAllGroups(req, res);
                }
            });
        }
        else {
            this.group.filterGroupsWithoutPremium(req, res);
        }
    }
}