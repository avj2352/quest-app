'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _oauth = require('./../handlers/oauth');

var _tag = require('./../controllers/tag.controller');

var _group = require('./../controllers/group.controller');

var _user = require('./../controllers/user.controller');

var _questionnaire = require('./../controllers/questionnaire.controller');

var _inventory = require('./../controllers/inventory.controller');

var _basic = require('../handlers/basic.auth');

var _queries = require('./../handlers/queries');

var _index = require('./../helpers/index');

var tag = new _tag.TagController(); /**
                                     * Main Webservice Routes application
                                    */

var group = new _group.GroupController();
var user = new _user.UserController();
var question = new _questionnaire.QuestionsController();
var map = new _inventory.InventoryController();
var auth = new _basic.BasicAuthentication();
var queries = new _queries.QueriesController();

var routes = function routes(app) {

    // TAGS =======================
    app.route('/tag').get(tag.getAllTags).post(tag.addNewTag);

    app.route('/tag/:tagId').get(tag.getTagById).put(tag.updateTagById).delete(tag.deleteTagById);

    app.route('/tagName/:name').get(tag.getTagByName).put(tag.updateTagByName).delete(tag.deleteTagByName);

    // GROUPS =======================
    app.route('/group').get(group.getAllGroups).post(group.addNewGroup);

    // query
    app.route('/groupWithQuestions').get(queries.getGroupsWithQuestions);

    // FILTERED GROUPS =============
    app.route('/filtered/group').get(queries.filterGroupsByUserPremium);

    app.route('/group/:groupId').get(group.getGroupById).put(group.updateGroupById).delete(group.deleteGroupById);

    // USERS ========================
    app.route('/user').get(user.getAllUsers).post(user.addNewUser);

    app.route('/user/:userId').get(user.getUserById).put(user.updateUserById).delete(user.deleteUserById);

    // Get User by Email
    app.route('/user/email/:emailId').get(auth.getUserDetailsByEmail);

    // QUESTIONNAIRE ================
    app.route('/question').get(question.getAllQuestions).post(question.addNewQuestion);

    app.route('/question/:questionId').get(question.getQuestionById).put(question.updateQuestionById).delete(question.deleteQuestionById);

    // QUESTIONNAIRE BY GROUPID ========
    app.route('/question/groups/:groupId').get(question.getQuestionByGroupId);

    // INVENTORY ===================
    app.get('/read/:userId/:questionId', map.addNewRecord);
    app.get('/unread/:userId/:questionId', map.deleteRecord);

    // Simple Authentication =========
    app.route('/login').post(auth.authenticateUser);

    // convert json to markdown
    app.route('/convert').post(_index.convertMarkdown);
};

exports.default = routes;
//# sourceMappingURL=app.routes.js.map