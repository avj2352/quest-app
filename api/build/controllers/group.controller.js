'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GroupController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * CRUD - Controller for Group Model
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


var _group = require('./../models/group.model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GroupController = exports.GroupController = function () {
    function GroupController() {
        _classCallCheck(this, GroupController);
    }

    _createClass(GroupController, [{
        key: 'getAllGroups',
        value: function getAllGroups(req, res) {
            _group.GroupModel.find({}, function (err, data) {
                if (err) res.send(err);else res.json(data);
            });
        }
    }, {
        key: 'filterGroupsWithoutPremium',
        value: function filterGroupsWithoutPremium(req, res) {
            _group.GroupModel.find({ premium: false }, function (err, data) {
                if (err) res.send(err);else res.json(data);
            });
        }

        // CREATE - group record

    }, {
        key: 'addNewGroup',
        value: function addNewGroup(req, res) {
            var newGroupRecord = new _group.GroupModel(req.body);
            newGroupRecord.save(function (err, data) {
                if (err) res.send(err);else res.send(data);
            });
        }

        // RETRIEVE - group record by id

    }, {
        key: 'getGroupById',
        value: function getGroupById(req, res) {
            _group.GroupModel.find({ _id: req.params.groupId }, function (err, data) {
                if (err) res.send(err);else res.json(data);
            });
        }
    }, {
        key: 'updateGroupById',
        value: function updateGroupById(req, res) {
            _group.GroupModel.findOneAndUpdate({ _id: req.params.groupId }, req.body, { new: true }, function (err, data) {
                if (err) res.send(err);else res.json(data); // Get JSON format of contact
            });
        }
    }, {
        key: 'deleteGroupById',
        value: function deleteGroupById(req, res) {
            _group.GroupModel.deleteOne({ _id: req.params.groupId }, function (err) {
                if (err) res.send(err);else res.json({ message: 'Successfully deleted group id: ' + req.params.groupId });
            });
        }
    }]);

    return GroupController;
}();
//# sourceMappingURL=group.controller.js.map