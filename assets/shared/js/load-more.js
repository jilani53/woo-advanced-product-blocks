/**
 * WooCommerce Advanced Product Blocks - Load More Utility
 *
 * @package woo-advanced-product-blocks
 * @author  WooCommerce
 * @version 1.0.0
 */

(function () {
	'use strict';

	// Load More functionality for Product Grid block.
	document.addEventListener('click', async function (e) {
		const btn = e.target.closest('.wooapb-load-more');
		if (!btn) return;

		const wrapper = btn.closest('.wooapb-product-grid-wrapper');
		if (!wrapper) return;

		const data = JSON.parse(wrapper.dataset.wooapb || '{}');

		// Initialize page if not set
		data.currentPage = data.currentPage || 1;
		data.currentPage++;

		btn.disabled = true;
		const originalText = btn.textContent;
		btn.textContent = 'Loading...';

		try {
			const formData = new URLSearchParams();
			formData.append('action', 'wooapb_load_more_products');
			formData.append('nonce', wooapb.nonce);
			formData.append('page', data.currentPage);
			formData.append('attributes', JSON.stringify(data.attributes));

			const response = await fetch(wooapb.ajax_url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				},
				body: formData.toString(),
			});

			const result = await response.json();

			if (result.success && result.data.html) {
				const list = wrapper.querySelector('ul.wooapb-grid');
				list.insertAdjacentHTML('beforeend', result.data.html);

				// restore button
				btn.disabled = false;
				btn.textContent = originalText;

				// update state
				wrapper.dataset.wooapb = JSON.stringify(data);

				// hide if no more products
				if (!result.data.has_more) {
					btn.remove();
				}
			} else {
				btn.remove();
			}
		} catch (error) {
			console.error('Load more error:', error);
			btn.disabled = false;
			btn.textContent = originalText;
		}
	});

})();