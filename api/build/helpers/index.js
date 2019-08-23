'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.convertMarkdown = undefined;

var _showdownConverter = require('./../lib/showdown-converter');

var _showdownConverter2 = _interopRequireDefault(_showdownConverter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var convertMarkdown = exports.convertMarkdown = function convertMarkdown(req, res) {
    // console.log('Parsing', req.body);
    if (typeof req.body.content == 'undefined' || req.body.content == null) {
        res.json(["error", "No data found"]);
    } else {
        var text = req.body.content;
        var html = _showdownConverter2.default.makeHtml(text);
        res.json({
            markdown: html
        });
    }
}; /**
    * Handler Functions
    */
//# sourceMappingURL=index.js.map