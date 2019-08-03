/**
 * Main Webservice Routes application
*/
import { handleOAuth } from './../handlers/oauth';
import { TagController } from './../controllers/tag.controller';
import { GroupController } from './../controllers/group.controller';
import { UserController } from './../controllers/user.controller';
import { QuestionsController } from './../controllers/questionnaire.controller';
import { InventoryController } from './../controllers/inventory.controller';
import { BasicAuthentication } from '../handlers/basic.auth';
import { QueriesController } from './../handlers/queries';

const tag = new TagController();
const group = new GroupController();
const user = new UserController();
const question = new QuestionsController();
const map = new InventoryController();
const auth = new BasicAuthentication();
const queries = new QueriesController();

const routes = (app) => {

    // TAGS =======================
    app.route('/tag')
    .get(tag.getAllTags)
    .post(tag.addNewTag);

    app.route('/tag/:tagId')
    .get(tag.getTagById)
    .put(tag.updateTagById)
    .delete(tag.deleteTagById);

    app.route('/tagName/:name')    
    .get(tag.getTagByName)    
    .put(tag.updateTagByName)    
    .delete(tag.deleteTagByName);
    
    // GROUPS =======================
    app.route('/group')
    .get(group.getAllGroups)
    .post(group.addNewGroup);

    // query
    app.route('/groupWithQuestions')
    .get(queries.getGroupsWithQuestions);

    // FILTERED GROUPS =============
    app.route('/filtered/group')
    .get(queries.filterGroupsByUserPremium);
    
    app.route('/group/:groupId')
    .get(group.getGroupById)
    .put(group.updateGroupById)
    .delete(group.deleteGroupById);

    // USERS ========================
    app.route('/user')
    .get(user.getAllUsers)
    .post(user.addNewUser);

    app.route('/user/:userId')
    .get(user.getUserById)
    .put(user.updateUserById)
    .delete(user.deleteUserById);

    // Get User by Email
    app.route('/user/email/:emailId')
    .get(auth.getUserDetailsByEmail);

    // QUESTIONNAIRE ================
    app.route('/question')
    .get(question.getAllQuestions)
    .post(question.addNewQuestion);

    app.route('/question/:questionId')
    .get(question.getQuestionById)
    .put(question.updateQuestionById)
    .delete(question.deleteQuestionById);

    // QUESTIONNAIRE BY GROUPID ========
    app.route('/question/groups/:groupId')
    .get(question.getQuestionByGroupId);

    // INVENTORY ===================
    app.get('/read/:userId/:questionId', map.addNewRecord);
    app.get('/unread/:userId/:questionId', map.deleteRecord);

    // Simple Authentication =========
    app.route('/login')  
    .post(auth.authenticateUser);
};


export default routes;