'use strict';

/**
 * Helper library for showdown converter
 */
var showdown = require('showdown');
var converter = new showdown.Converter();

converter.setOption('simplifiedAutoLink', 'true');

module.exports = converter;
//# sourceMappingURL=showdown-converter.js.map