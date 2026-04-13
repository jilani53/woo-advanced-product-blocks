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

	// Carousel initialization utility.
	function initWooapbCarousels(root = document) {
		if (typeof window.Swiper === 'undefined') return;

		const elements = root.querySelectorAll('.wooapb-carousel');
		if (!elements.length) return;

		elements.forEach((el) => {
			if (el.dataset.swiperInit === 'true') return;

			const nextEl = el.querySelector('.swiper-button-next');
			const prevEl = el.querySelector('.swiper-button-prev');
			const paginationEl = el.querySelector('.swiper-pagination');

			// Read config from PHP
			let config = {};
			try {
				config = el.dataset.swiper ? JSON.parse(el.dataset.swiper) : {};
			} catch (e) {
				console.warn('Invalid swiper config', e);
			}

			new window.Swiper(el, {
				...config,
				navigation: nextEl && prevEl ? { nextEl, prevEl } : false,
				pagination: paginationEl ? { el: paginationEl, clickable: true } : false,
			});

			el.dataset.swiperInit = 'true';
		});
	}

	document.addEventListener('DOMContentLoaded', () => {
		initWooapbCarousels(document);
		console.log('test');
	});

})();