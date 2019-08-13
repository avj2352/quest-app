'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useGoogleOAuth = undefined;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportGoogleOauth = require('passport-google-oauth20');

var _googleOauthConfig = require('../config/google-oauth-config');

var _user = require('../models/user.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create an instance of GoogleStrategy and configure it in passport
/**
 * Authentication Handler Functions
 */
var useGoogleOAuth = exports.useGoogleOAuth = function useGoogleOAuth(callback) {

    _passport2.default.use(new _passportGoogleOauth.Strategy({
        clientID: _googleOauthConfig.gClientID,
        clientSecret: _googleOauthConfig.gClientSecret,
        callbackURL: '/auth/google/callback',
        passReqToCallback: true
    }, function (request, accessToken, refreshToken, profile, done) {
        console.log('From server: ', accessToken, profile);
        _user.UserModel.findOne({ email: profile.emails[0].value }).then(function (user) {
            if (user) {
                done(null, user);
            } else {
                new _user.UserModel({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    provider: 'google',
                    premium: false
                }).save().then(function (user) {
                    return done(null, user);
                });
            }
        });
    }));
};
//# sourceMappingURL=oauth.js.map