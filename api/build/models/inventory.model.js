'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InventoryModel = exports.InventorySchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InventorySchema = exports.InventorySchema = new _mongoose.Schema({
    user: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    group: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'group'
    },
    question: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'questions'
    }
}); /**
     * Creating a Map collection containing a list of Users and the Question ID they have read
     */
/**
 * Model for Questionnaire server side schema
 */
var InventoryModel = exports.InventoryModel = _mongoose2.default.model('inventory', InventorySchema);
//# sourceMappingURL=inventory.model.js.map