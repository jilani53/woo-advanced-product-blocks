// blocks/product-carousel/index.js
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

registerBlockType('wooapb/product-carousel', {
	edit: () => {
		const blockProps = useBlockProps();
		return <div {...blockProps}>Woo Product Carousel (Editor Preview)</div>;
	},
	save: () => null, // Server-side rendered
});
