'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QuestionnaireModel = exports.QuestionnaireSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuestionnaireSchema = exports.QuestionnaireSchema = new _mongoose.Schema({
    title: {
        type: String,
        required: 'Enter Question title'
    },
    type: {
        type: String,
        required: 'QA type question or Article type'
    },
    question: {
        type: String
    },
    answer: {
        type: String
    },
    date: {
        type: Number,
        required: 'Provide Date of creation'
    },
    tags: [{
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'tags'
    }],
    groups: [{
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'groups'
    }]
}); /**
     * Model for Questionnaire server side schema
     */
var QuestionnaireModel = exports.QuestionnaireModel = _mongoose2.default.model('questions', QuestionnaireSchema);
//# sourceMappingURL=questionnaire.model.js.map