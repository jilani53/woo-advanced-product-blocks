import './editor.css';
import './style.css';

// blocks/product-grid/index.js
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { __ } from '@wordpress/i18n';

registerBlockType('wooapb/product-grid', {
	edit: ({ attributes, setAttributes }) => {
		const blockProps = useBlockProps();

		return (
			<div {...blockProps}>
				<InspectorControls>
					<PanelBody title={__('Grid Settings', 'wooapb')} initialOpen={true}>
						<RangeControl
							label={__('Columns', 'wooapb')}
							value={attributes.columns}
							onChange={(value) => setAttributes({ columns: value })}
							min={1}
							max={6}
						/>
						<RangeControl
							label={__('Products per Page', 'wooapb')}
							value={attributes.postsPerPage}
							onChange={(value) => setAttributes({ postsPerPage: value })}
							min={1}
							max={50}
						/>
					</PanelBody>
				</InspectorControls>

				<div className="wooapb-product-grid">
					{/* SSR preview in editor */}
					<ServerSideRender
						block="wooapb/product-grid"
						attributes={attributes}
					/>
					<p>
						{__('Columns:', 'wooapb')} {attributes.columns},{' '}
						{__('Products per page:', 'wooapb')} {attributes.postsPerPage}
					</p>
				</div>
			</div>
		);
	},

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

