<?php
namespace WooAPB\Core;

defined( 'ABSPATH' ) || exit;

class Assets {

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


	/**
	 * Initialize block frontend style enqueue.
	 */
	public static function front(): void {
		add_action( 'wp_enqueue_scripts', array( self::class, 'enqueue_frontend_styles' ) );
	}

	/**
	 * Enqueue styles for blocks present on the page.
	 */
	public static function enqueue_frontend_styles(): void {

		$blocks_path = plugin_dir_path( WOOAPB_FILE ) . 'blocks/';
		$block_dirs  = glob( $blocks_path . '*/block.json' );

		// var_dump( $block_dirs ); // For debugging purposes.	

		foreach ( $block_dirs as $block_file ) {

			// Decode as associative array to use $block_json['name'] safely
			
			$block_json = json_decode( file_get_contents( $block_file ), true );
			

			//var_dump( $block_json ); // For debugging purposes.

			$block_name = $block_json['name'] ?? '';
			$style_file = $block_json['style'] ?? '';

			if ( empty( $block_name ) || empty( $style_file ) || ! has_block( $block_name ) ) {
				continue;
			}

			$style_file_path = dirname( $block_file ) . '/' . basename( $style_file );

			var_dump( $style_file_path ); // For debugging purposes.

			if ( file_exists( $style_file_path ) ) {
				wp_enqueue_style(
					str_replace( '/', '-', $block_name ) . '-frontend',
					plugins_url( 'blocks/' . basename( dirname( $block_file ) ) . '/build/' . basename( $style_file ), WOOAPB_FILE ),
					array(),
					filemtime( $style_file_path )
				);
			}
		}
	}
}
