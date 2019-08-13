'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TagModel = exports.TagSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TagSchema = exports.TagSchema = new _mongoose.Schema({
    name: {
        type: String,
        required: 'Enter tag name'
    },
    description: {
        type: String,
        required: 'Provide Description'
    }
}); /**
     * Model for Tag server side schema
     */
var TagModel = exports.TagModel = _mongoose2.default.model('tags', TagSchema);
//# sourceMappingURL=tag.model.js.map