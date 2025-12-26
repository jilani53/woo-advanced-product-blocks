<?php
namespace WooAPB\Core;

defined( 'ABSPATH' ) || exit;

final class Assets {

	public static function register() {

		/* Shared */
		wp_register_style(
			'wooapb-base',
			plugins_url( 'assets/shared/css/base.css', WOOAPB_FILE ),
			array(),
			WOOAPB_VERSION
		);

		/* Swiper */
		wp_register_style(
			'wooapb-swiper',
			plugins_url( 'assets/vendor/swiper/swiper-bundle.min.css', WOOAPB_FILE ),
			array(),
			'11.0.5'
		);

		wp_register_script(
			'wooapb-swiper',
			plugins_url( 'assets/vendor/swiper/swiper-bundle.min.js', WOOAPB_FILE ),
			array(),
			'11.0.5',
			true
		);

		/* Grid */
		wp_register_style(
			'wooapb-grid',
			plugins_url( 'blocks/product-grid/style.css', WOOAPB_FILE ),
			array( 'wooapb-base' ),
			WOOAPB_VERSION
		);

		wp_register_script(
			'wooapb-grid',
			plugins_url( 'blocks/product-grid/view.js', WOOAPB_FILE ),
			array(),
			WOOAPB_VERSION,
			true
		);

		/* Carousel */
		wp_register_style(
			'wooapb-carousel',
			plugins_url( 'blocks/product-carousel/style.css', WOOAPB_FILE ),
			array( 'wooapb-base', 'wooapb-swiper' ),
			WOOAPB_VERSION
		);

		wp_register_script(
			'wooapb-carousel',
			plugins_url( 'blocks/product-carousel/view.js', WOOAPB_FILE ),
			array( 'wooapb-swiper' ),
			WOOAPB_VERSION,
			true
		);
	}
}
