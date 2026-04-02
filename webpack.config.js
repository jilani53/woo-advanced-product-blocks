const path = require( 'path' );
const fs = require( 'fs' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// Remove default entry from wp-scripts.
delete defaultConfig.entry;

const blocksDir = path.resolve( process.cwd(), 'blocks' );
const entries = {};

// Auto-register every block that has an index.js
fs.readdirSync( blocksDir ).forEach( ( block ) => {
	const entryFile = path.join( blocksDir, block, 'index.js' );

	if ( fs.existsSync( entryFile ) ) {
		entries[ `${ block }/index` ] = entryFile;
	}
} );

module.exports = {
	...defaultConfig,
	entry: entries,
	output: {
		path: path.resolve( process.cwd(), 'build' ),
		filename: '[name].js',
	},
};
