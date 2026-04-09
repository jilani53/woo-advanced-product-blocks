import './editor.css';
import './style.css';

import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import initWooapbCarousels from './carousel-init';

registerBlockType('wooapb/product-carousel', {
	edit: Edit,
	save: () => null,
});

/**
 * Safe init on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
	initWooapbCarousels();
});

// const observer = new MutationObserver(() => {
// 	initWooapbCarousels();
// });

// observer.observe(document.body, {
// 	childList: true,
// 	subtree: true,
// });
