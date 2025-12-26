/**
 * WordPress dependencies
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');
const glob = require('glob');

// Discover all block entry points (blocks/*/index.js)
const files = glob.sync('./blocks/**/index.js');

if (!files.length) {
	throw new Error(
		'No block entry files found! Make sure blocks/*/index.js exists.'
	);
}

const entries = {};

files.forEach((file) => {
	// block name = folder name
	const blockName = path.basename(path.dirname(file));
	entries[blockName] = path.resolve(__dirname, file);
});

module.exports = {
	...defaultConfig,
	entry: entries,
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name]/index.js',
	},
};

