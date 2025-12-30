<?php
namespace WooAPB\Core;

use WooAPB\Blocks\ProductGrid\Render as GridRender;
use WooAPB\Blocks\ProductCarousel\Render as CarouselRender;

defined( 'ABSPATH' ) || exit;

class BlockRegistry {

	// public static function register() {
	// $blocks = glob( plugin_dir_path( WOOAPB_FILE ) . 'blocks/*/block.json' );

	// foreach ( $blocks as $block ) {
	// register_block_type_from_metadata(
	// dirname( $block ),
	// array(
	// 'render_callback' => function ( $attributes, $content, $block ) {
	// switch ( $block->name ) {
	// case 'wooapb/product-grid':
	// return GridRender::render( $attributes, $content );
	// case 'wooapb/product-carousel':
	// return CarouselRender::render( $attributes, $content );
	// }
	// return '';
	// },
	// )
	// );
	// }
	// }

	public static function register() {

		$blocks = glob( plugin_dir_path( WOOAPB_FILE ) . 'blocks/*/block.json' );

		foreach ( $blocks as $block_file ) {

			$block_dir  = dirname( $block_file );
			$block_json = json_decode( file_get_contents( $block_file ), true );
			$block_name = $block_json['name'] ?? '';

			if ( empty( $block_name ) ) {
				continue;
			}

			register_block_type_from_metadata(
				$block_dir,
				array(
					'render_callback' => array( self::class, 'render_block' ),
				)
			);

		}
	}

	public static function render_block( array $attributes, string $content, $block ): string {

		// Remove prefix: wooapb/product-grid → product-grid.
		$name = str_replace( 'wooapb/', '', $block->name );

		// Convert kebab-case to PascalCase: product-grid → ProductGrid.
		$pascal_case = str_replace( ' ', '', ucwords( str_replace( '-', ' ', $name ) ) );

		// Build full class namespace.
		$class_name = "\\WooAPB\\Blocks\\$pascal_case\\Render";

		if ( class_exists( $class_name ) ) {
			return $class_name::render( $attributes, $content );
		}

		return '';
	}
}
