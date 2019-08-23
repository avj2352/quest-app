'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InventoryController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Controller to add a list of all Users who have completed a question
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * contains two fields - List of users, List of Questions
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


var _inventory = require('./../models/inventory.model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InventoryController = exports.InventoryController = function () {
    function InventoryController() {
        _classCallCheck(this, InventoryController);
    }

    _createClass(InventoryController, [{
        key: 'addNewRecord',
        value: function addNewRecord(req, res) {
            var newRecord = void 0;
            try {
                // Query Question
                newRecord = new _inventory.InventoryModel({
                    user: req.params.userId,
                    group: req.params.groupId,
                    question: req.params.questionId
                });
            } catch (err) {
                res.send(err);
            } finally {
                newRecord.save(function (err, data) {
                    if (err) res.send(err);else res.json(data);
                });
            }
        }

        // Delete - Delete a record by searching userId and questionId

    }, {
        key: 'deleteRecord',
        value: function deleteRecord(req, res) {
            try {
                _inventory.InventoryModel.deleteOne({
                    user: req.params.userId,
                    group: req.params.groupId,
                    question: req.params.questionId
                }, function (err) {
                    if (err) res.send(err);else res.json({ message: 'Successfully deleted inventory record' });
                });
            } catch (err) {
                res.send(err);
            }
        }
    }]);

    return InventoryController;
}();
//# sourceMappingURL=inventory.controller.js.map