/**
 * WordPress dependencies
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');
const glob = require('glob');

const files = glob.sync('./blocks/**/index.js');

if (!files.length) {
	throw new Error(
		'No block entry files found! Make sure blocks/*/index.js exists.'
	);
}

// Build entries object in the format webpack expects
const entries = {};
files.forEach((file) => {
	const blockName = path.basename(path.dirname(file));
	entries[blockName] = path.resolve(__dirname, file);
});

module.exports = {
	...defaultConfig,
	entry: () => entries,
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name]/index.js',
	},
};
