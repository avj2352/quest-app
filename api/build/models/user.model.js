'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserModel = exports.UserSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = exports.UserSchema = new _mongoose.Schema({
    name: {
        type: String,
        required: 'Enter Username'
    },
    password: {
        type: String,
        required: 'Enter password',
        select: false
    },
    provider: {
        type: String,
        required: 'Enter provier'
    },
    email: {
        type: String,
        required: 'Enter Email ID'
    },
    role: {
        type: String,
        required: 'Is User a premium or free tier user'
    }
}); /**
     * Model for Questionnaire server side schema
     */
var UserModel = exports.UserModel = _mongoose2.default.model('users', UserSchema);
//# sourceMappingURL=user.model.js.map