/**
 * Helper library for showdown converter
 */
const showdown = require('showdown');
const converter = new showdown.Converter();

converter.setOption('simplifiedAutoLink', 'true');

module.exports = converter;