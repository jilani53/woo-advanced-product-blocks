import './editor.css';
import './style.css';

// blocks/product-grid/index.js
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';

registerBlockType('wooapb/product-grid', {
	edit: Edit,

	// Server-side rendered via PHP
	save: () => null,
});
