"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QueriesController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * PAJ - all custom queries handled here
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _group = require("../controllers/group.controller");

var _user = require("../controllers/user.controller");

var _group2 = require("./../models/group.model");

var _questionnaire = require("./../models/questionnaire.model");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QueriesController = exports.QueriesController = function () {
    function QueriesController() {
        _classCallCheck(this, QueriesController);

        this.group = new _group.GroupController();
        this.user = new _user.UserController();
        this._getAllGroups = this._getAllGroups.bind(this);
        this._getAllQuestionOnGroupId = this._getAllQuestionOnGroupId.bind(this);
        this.filterGroupsByUserPremium = this.filterGroupsByUserPremium.bind(this);
        this.getGroupsWithQuestions = this.getGroupsWithQuestions.bind(this);
    }

    _createClass(QueriesController, [{
        key: "_getAllGroups",
        value: function _getAllGroups() {
            var promise = new Promise(function (resolve, reject) {
                _group2.GroupModel.find({}, function (err, data) {
                    if (err) reject(err);else resolve(data);
                });
            });
            return promise;
        }
    }, {
        key: "_getAllQuestionOnGroupId",
        value: function _getAllQuestionOnGroupId(id) {
            var promise = new Promise(function (resolve, reject) {
                _questionnaire.QuestionnaireModel.find({ groups: id }, function (err, data) {
                    if (err) reject(err);else resolve(data);
                });
            });
            return promise;
        }
    }, {
        key: "filterGroupsByUserPremium",
        value: function filterGroupsByUserPremium(req, res) {
            var _this = this;

            var email = req.header('email');
            if (email && email !== '') {
                this.user.fetchUserByEmail(email).then(function (data) {
                    if (data.role === 'normal') {
                        _this.group.filterGroupsWithoutPremium(req, res);
                    } else {
                        _this.group.getAllGroups(req, res);
                    }
                });
            } else {
                this.group.filterGroupsWithoutPremium(req, res);
            }
        }
    }, {
        key: "getGroupsWithQuestions",
        value: function getGroupsWithQuestions(req, res) {
            var _this2 = this;

            var result = [];
            var groupPromiseList = [];
            this._getAllGroups().then(function (data) {
                data.map(function (el) {
                    return groupPromiseList.push(_this2._getAllQuestionOnGroupId(el._id));
                });
                Promise.all(groupPromiseList).then(function (data1) {
                    data.map(function (el, index) {
                        result.push({
                            _id: el._id,
                            title: el.title,
                            slug: el.slug,
                            description: el.description,
                            premium: el.premium,
                            questionCount: data1[index].length,
                            questions: data1[index]
                        });
                    });
                    res.json(result);
                }, function (err) {
                    res.send(err);
                });
            }, function (err) {
                res.send(err);
            });
        }
    }]);

    return QueriesController;
}();
//# sourceMappingURL=queries.js.map