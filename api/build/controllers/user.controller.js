'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserController = exports.saltRounds = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * CRUD - Controller for User Model
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


var _user = require('./../models/user.model');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var saltRounds = exports.saltRounds = 10;

var UserController = exports.UserController = function () {
    function UserController() {
        _classCallCheck(this, UserController);
    }

    _createClass(UserController, [{
        key: 'addNewUser',

        // Create - new User record
        value: function addNewUser(req, res) {
            var aUser = void 0;
            try {
                aUser = new _user.UserModel({
                    name: req.body.name,
                    provider: req.body.provider,
                    password: _bcrypt2.default.hashSync(req.body.password, saltRounds),
                    email: req.body.email,
                    role: req.body.role
                });
            } catch (err) {
                res.send(err);
            } finally {
                aUser.save(function (err, data) {
                    if (err) res.send(err);else res.json(data);
                });
            }
        }

        // Create new record - without req, res

    }, {
        key: 'createRecord',
        value: function createRecord(data) {
            var aUser = void 0;
            try {
                // Query Question
                aUser = new _user.UserModel({
                    name: data.name,
                    provider: data.provider,
                    password: data.password,
                    email: data.email,
                    role: data.role
                });
            } catch (err) {
                console.log('Error while populating data: ', err);
            } finally {
                return aUser.save();
            }
        }

        // Retrieve - Get all Users

    }, {
        key: 'getAllUsers',
        value: function getAllUsers(req, res) {
            _user.UserModel.find({}, function (err, data) {
                if (err) res.send(err);else res.json(data);
            });
        }

        // Retrieve - Get User by userId

    }, {
        key: 'getUserById',
        value: function getUserById(req, res) {
            _user.UserModel.findOne({ _id: req.params.userId }).exec(function (err, data) {
                if (err) res.send(err);else res.json(data);
            });
        }

        // Retrieve - Get user by email

    }, {
        key: 'getUserByEmail',
        value: function getUserByEmail(email) {
            var promise = new Promise(function (resolve, reject) {
                _user.UserModel.findOne({ email: email }).exec(function (err, data) {
                    if (err) reject(err);else resolve(data);
                });
            });
            return promise;
        }

        // Fetch userDetails

    }, {
        key: 'fetchUserByEmail',
        value: function fetchUserByEmail(email) {
            var promise = new Promise(function (resolve, reject) {
                _user.UserModel.findOne({ email: email }).select('+password').exec(function (err, data) {
                    if (err) reject(err);else resolve(data);
                });
            });
            return promise;
        }

        // Update - User by UserId

    }, {
        key: 'updateUserById',
        value: function updateUserById(req, res) {
            try {
                var aUser = _user.UserModel.findByIdAndUpdate({ _id: req.params.userId }, {
                    name: req.body.name,
                    provider: req.body.provider,
                    password: _bcrypt2.default.hashSync(req.body.password, saltRounds),
                    email: req.body.email,
                    role: req.body.role
                }, { new: true }, function (err, data) {
                    if (err) res.send(err);else res.json(data);
                });
            } catch (err) {
                res.send(err);
            }
        }

        // DELETE - User by UserId

    }, {
        key: 'deleteUserById',
        value: function deleteUserById(req, res) {
            try {
                _user.UserModel.deleteOne({ _id: req.params.userId }, function (err) {
                    if (err) res.send(err);else res.json({ message: 'Successfully deleted user record' });
                });
            } catch (err) {
                res.send(err);
            }
        }
    }]);

    return UserController;
}();
//# sourceMappingURL=user.controller.js.map