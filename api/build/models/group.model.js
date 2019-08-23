'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GroupModel = exports.GroupSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupSchema = exports.GroupSchema = new _mongoose.Schema({
    title: {
        type: String,
        required: 'Enter group title'
    },
    slug: {
        type: String,
        required: 'Enter group slug'
    },
    description: {
        type: String,
        required: 'Provide group description'
    },
    // premium true is only made available for subscribed users
    premium: {
        type: Boolean,
        required: 'Public or Private collection'
    }
}); /**
     * Model for Group server side schema
     */
var GroupModel = exports.GroupModel = _mongoose2.default.model('groups', GroupSchema);
//# sourceMappingURL=group.model.js.map