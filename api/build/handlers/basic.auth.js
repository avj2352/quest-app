'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BasicAuthentication = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _user = require('../controllers/user.controller');

var _user2 = require('../models/user.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BasicAuthentication = exports.BasicAuthentication = function () {
    function BasicAuthentication() {
        _classCallCheck(this, BasicAuthentication);

        this.user = new _user.UserController();
        this.getUserDetailsByEmail = this.getUserDetailsByEmail.bind(this);
        this.authenticateUser = this.authenticateUser.bind(this);
    }

    _createClass(BasicAuthentication, [{
        key: 'authenticateUser',
        value: function authenticateUser(req, res) {
            try {
                var email = req.body.email;
                var password = req.body.password;
                // console.log('email and password is: ', email, password);
                this.user.fetchUserByEmail(email).then(function (user) {
                    // console.log('User password is: ', user.password);
                    if (_bcrypt2.default.compareSync(password, user.password)) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(400);
                    }
                }).catch(function (err) {
                    res.sendStatus(400);
                });
            } catch (err) {
                res.send(err);
            }
        }
    }, {
        key: 'getUserDetailsByEmail',
        value: function getUserDetailsByEmail(req, res) {
            this.user.getUserByEmail(req.params.emailId).then(function (data) {
                // console.log('Success!', data);
                res.json(data);
            }).catch(function (err) {
                res.send(err);
            });
        }
    }]);

    return BasicAuthentication;
}();
//# sourceMappingURL=basic.auth.js.map