'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TagController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * CRUD - Controller for Tag Model
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


var _tag = require('./../models/tag.model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TagController = exports.TagController = function () {
    function TagController() {
        _classCallCheck(this, TagController);
    }

    _createClass(TagController, [{
        key: 'getAllTags',
        value: function getAllTags(req, res) {
            _tag.TagModel.find({}, function (err, data) {
                if (err) res.send(err);else res.json(data); // Get JSON format of contact
            });
        }

        // CREATE - new tag record

    }, {
        key: 'addNewTag',
        value: function addNewTag(req, res) {
            var newTagRecord = new _tag.TagModel(req.body);
            newTagRecord.save(function (err, data) {
                if (err) res.send(err);else res.send(data);
            });
        }

        // RETRIEVE - tag record by name

    }, {
        key: 'getTagByName',
        value: function getTagByName(req, res) {
            _tag.TagModel.find({ name: req.params.name }, function (err, data) {
                if (err) res.send(err);else res.json(data); // Get JSON format of contact
            });
        }

        // UPDATE - tag record by name

    }, {
        key: 'updateTagByName',
        value: function updateTagByName(req, res) {
            _tag.TagModel.findOneAndUpdate({ name: req.params.name }, req.body, { new: true }, function (err, data) {
                if (err) res.send(err);else res.json(data); // Get JSON format of data
            });
        }

        // DELETE - tag record by name

    }, {
        key: 'deleteTagByName',
        value: function deleteTagByName(req, res) {
            _tag.TagModel.deleteOne({ name: req.params.name }, function (err) {
                if (err) res.send(err);else res.json({ message: 'Successfully deleted tag record' });
            });
        }

        // RETRIEVE - tag record by id

    }, {
        key: 'getTagById',
        value: function getTagById(req, res) {
            _tag.TagModel.find({ _id: req.params.tagId }, function (err, data) {
                if (err) res.send(err);else res.json(data); // Get JSON format of contact
            });
        }

        // UPDATE - tag record by id

    }, {
        key: 'updateTagById',
        value: function updateTagById(req, res) {
            _tag.TagModel.findOneAndUpdate({ _id: req.params.tagId }, req.body, { new: true }, function (err, data) {
                if (err) res.send(err);else res.json(data); // Get JSON format of data
            });
        }

        // DELETE - tag record by id

    }, {
        key: 'deleteTagById',
        value: function deleteTagById(req, res) {
            _tag.TagModel.deleteOne({ _id: req.params.tagId }, function (err) {
                if (err) res.send(err);else res.json({ message: 'Successfully deleted tag record' });
            });
        }
    }]);

    return TagController;
}();
//# sourceMappingURL=tag.controller.js.map