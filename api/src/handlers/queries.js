/**
 * PAJ - all custom queries handled here
 */
import { GroupController } from "../controllers/group.controller";
import { UserController } from "../controllers/user.controller";
import { GroupModel } from './../models/group.model';
import { QuestionnaireModel } from './../models/questionnaire.model';


export class QueriesController {
    constructor () {
        this.group = new GroupController();
        this.user = new UserController();
        this._getAllGroups = this._getAllGroups.bind(this);
        this._getAllQuestionOnGroupId = this._getAllQuestionOnGroupId.bind(this);
        this.filterGroupsByUserPremium = this.filterGroupsByUserPremium.bind(this);
        this.getGroupsWithQuestions = this.getGroupsWithQuestions.bind(this);
    }

    _getAllGroups() {
        const promise = new Promise((resolve, reject) => {
            GroupModel.find({}, (err, data)=>{
                if (err) reject(err);
                else resolve(data);
            });
        });
        return promise;
    }

    _getAllQuestionOnGroupId (id) {
        const promise = new Promise((resolve, reject) => {
            QuestionnaireModel.find({groups: id}, (err, data)=>{
                if (err) reject(err);
                else resolve(data);
            });
        });
        return promise;
    }

    filterGroupsByUserPremium (req, res) {
        const email = req.header('email');
        if(email && email !=='') {
            this.user.fetchUserByEmail(email)
            .then(data => {
                if(data.role === 'normal') {
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

    getGroupsWithQuestions (req, res) {
        let result = [];
        let groupPromiseList = [];        
        this._getAllGroups()
        .then(data => {
            data.map(el => groupPromiseList.push(this._getAllQuestionOnGroupId(el._id)));
            Promise.all(groupPromiseList).then(data1 => {
                data.map((el,index)=>{
                    result.push({
                        _id:el._id, 
                        title: el.title, 
                        slug: el.slug, 
                        description: el.description,
                        premium: el.premium,
                        questionCount: data1[index].length,
                        questions: data1[index]
                    });
                });
                res.json(result);
            }, err => {
                res.send(err);
            });
        }, err => {
            res.send(err);
        });
    }

    /**
     * Function to handle search requests from the client
     * @param {*} req 
     * @param {*} res 
     */
    handleSearch(req, res) {
        console.log('Query String is: ', req.body.query);
        res.json({success: 'API hit successful'});
    }
}