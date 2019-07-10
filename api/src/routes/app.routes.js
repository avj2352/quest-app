/**
 * Main Webservice Routes application
*/
import { TagController } from './../controllers/tag.controller';
import { GroupController } from './../controllers/group.controller';
import { UserController } from './../controllers/user.controller';
import { QuestionsController } from './../controllers/questionnaire.controller';
import { InventoryController } from './../controllers/inventory.controller';

const tag = new TagController();
const group = new GroupController();
const user = new UserController();
const question = new QuestionsController();
const map = new InventoryController();

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

    // QUESTIONNAIRE ================
    app.route('/question')
    .get(question.getAllQuestions)
    .post(question.addNewQuestion);

    app.route('/question/:questionId')
    .get(question.getQuestionById)
    .put(question.updateQuestionById)
    .delete(question.deleteQuestionById);

    // INVENTORY ===================
    app.get('/read/:userId/:questionId', map.addNewRecord);
    app.get('/unread/:userId/:questionId', map.deleteRecord);

};


export default routes;