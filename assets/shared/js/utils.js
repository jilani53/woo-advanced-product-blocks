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
