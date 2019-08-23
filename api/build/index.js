'use strict';

var _app = require('./routes/app.routes');

var _app2 = _interopRequireDefault(_app);

var _dbConnect = require('./config/db-connect');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;
var DB_ENV = 'PROD';
var path = require('path');
(0, _dbConnect.setupDBConnection)(DB_ENV);

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get('/hello', function (req, res) {
    res.send('Hello There !');
});

//Serving static files
app.use('/', express.static(path.join(__dirname, 'public')));

//Routes
(0, _app2.default)(app);

var server = app.listen(PORT, function () {
    console.log('Server listening at ' + server.address().port);
});
//# sourceMappingURL=index.js.map