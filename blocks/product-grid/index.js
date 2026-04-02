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




// wp.hooks.addFilter(
//     'woocommerce_product_block_product_template',
//     'wooapb/gallery-badge-before-title',
//     function( BlockHTML, blockProps ) {
//         const product = blockProps.attributes.product;

//         if ( product.my_custom_badge ) {
//             // Insert badge before product title <h2>
//             BlockHTML = BlockHTML.replace(
//                 /(<h2[^>]*>)/,
//                 `<span class="wooapb-badge">${product.my_custom_badge}</span>$1`
//             );
//         }

//         return BlockHTML;
//     }
// );

