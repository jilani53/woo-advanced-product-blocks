<?php
/**
 * Register assets for the plugin.
 * 
 * @package WooAPB\Core
 * @since 1.0.0
 */

namespace WooAPB\Core;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Register assets for the plugin.
 */
class Assets {

	/**
	 * Register styles and scripts.
	 *
	 * @return void
	 */
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
			'wooapb-utils',
			plugins_url( 'assets/shared/utils.js', WOOAPB_FILE ),
			array( 'wooapb-swiper' ),
			WOOAPB_VERSION,
			true
		);
	}

	/**
	 * Enqueue assets.
	 *
	 * @return void
	 */
	public static function enqueue() {
		wp_enqueue_style( 'wooapb-base' );
		wp_enqueue_style( 'wooapb-swiper' );
		wp_enqueue_script( 'wooapb-swiper' );
		wp_enqueue_script( 'wooapb-utils' );
	}
}
