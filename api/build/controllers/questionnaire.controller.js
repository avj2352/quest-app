'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QuestionsController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * CRUD - Controller for Questionnaire Model
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _questionnaire = require('./../models/questionnaire.model');

var _group = require('./../models/group.model');

var _tag = require('./../models/tag.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuestionsController = exports.QuestionsController = function () {
    function QuestionsController() {
        _classCallCheck(this, QuestionsController);

        this.groupModelList = [];
        this.tagModelList = [];
    }

    // Create - new question record


    _createClass(QuestionsController, [{
        key: 'addNewQuestion',
        value: function addNewQuestion(req, res) {
            // prepare query
            var aQuestion = void 0;
            var tagList = req.body.tags;
            var groupList = req.body.groups;
            // Query Question
            aQuestion = new _questionnaire.QuestionnaireModel({
                title: req.body.title,
                type: req.body.type,
                question: req.body.question,
                answer: req.body.answer,
                tags: tagList,
                groups: groupList,
                date: new Date().getTime()
            });
            aQuestion.save(function (err, data) {
                if (err) res.send(err);else res.json(data);
            });
        }
    }, {
        key: 'getAllQuestions',
        value: function getAllQuestions(req, res) {
            _questionnaire.QuestionnaireModel.find({}).populate('tags').populate('groups').exec(function (err, data) {
                if (err) res.send(err);else res.json(data);
            });
        }

        // Retrieve - question by Id

    }, {
        key: 'getQuestionById',
        value: function getQuestionById(req, res) {
            _questionnaire.QuestionnaireModel.findOne({ _id: req.params.questionId }).populate('tags').populate('groups').exec(function (err, data) {
                if (err) res.send(err);else res.json(data);
            });
        }

        // Retrieve - questions by groupId

    }, {
        key: 'getQuestionByGroupId',
        value: function getQuestionByGroupId(req, res) {
            _questionnaire.QuestionnaireModel.find({ groups: req.params.groupId }).populate('tags').populate('groups').exec(function (err, data) {
                if (err) res.send(err);else res.json(data);
            });
        }

        // UPDATE - question by Id

    }, {
        key: 'updateQuestionById',
        value: function updateQuestionById(req, res) {
            // prepare query
            try {
                // get question by Id
                var questionId = req.params.questionId;
                // get reference for tagId and groupId
                var tagList = req.body.tags;
                var groupList = req.body.groups;

                // Query Question
                _questionnaire.QuestionnaireModel.findByIdAndUpdate({ _id: questionId }, {
                    title: req.body.title,
                    type: req.body.type,
                    question: req.body.question,
                    answer: req.body.answer,
                    date: new Date().getTime(),
                    tags: tagList,
                    groups: groupList
                }, { new: true }, function (err, data) {
                    if (err) res.send(err);else res.json(data);
                });
            } catch (err) {
                res.send(err);
            }
        }

        // DELETE - question by id

    }, {
        key: 'deleteQuestionById',
        value: function deleteQuestionById(req, res) {
            try {
                _questionnaire.QuestionnaireModel.deleteOne({ _id: req.params.questionId }, function (err) {
                    if (err) res.send(err);else res.json({ message: 'Successfully deleted question record' });
                });
            } catch (err) {
                res.send(err);
            }
        }
    }]);

    return QuestionsController;
}();
//# sourceMappingURL=questionnaire.controller.js.map