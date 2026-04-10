import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function initWooapbCarousels(root = document) {
	const elements = root.querySelectorAll('.wooapb-carousel');

	elements.forEach((el) => {
		// Hard guard (better than el.swiper)
		if (el.dataset.swiperInit === 'true') {
			return;
		}

		new Swiper(el, {
			modules: [Navigation, Pagination],
			slidesPerView: 4,
			spaceBetween: 20,
			navigation: {
				nextEl: el.querySelector('.swiper-button-next'),
				prevEl: el.querySelector('.swiper-button-prev'),
			},
			pagination: {
				el: el.querySelector('.swiper-pagination'),
				clickable: true,
			},
		});

		// Mark initialized
		el.dataset.swiperInit = 'true';
	});
}

export default initWooapbCarousels;