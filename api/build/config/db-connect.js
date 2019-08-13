'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setupDBConnection = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise; /**
                                              * Module to setup mongoose connection
                                              */
var setupDBConnection = exports.setupDBConnection = function setupDBConnection(env) {
    var url = void 0;
    switch (env) {
        case 'DEV':
            url = 'mongodb://localhost/QuestApp';
            break;
        case 'PROD':
            url = 'mongodb://admin:zuko2352@ds347707.mlab.com:47707/quest-app-db';
            break;
    };
    _mongoose2.default.connect(url, {
        useNewUrlParser: true,
        useFindAndModify: false,
        autoIndex: false, // Don't build indexes
        reconnectTries: 100, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // useMongoClient: true,
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0
    });
};
//# sourceMappingURL=db-connect.js.map