<?php
namespace WooAPB\Core;

use WooAPB\Blocks\ProductGrid\Render as GridRender;
use WooAPB\Blocks\ProductCarousel\Render as CarouselRender;

defined( 'ABSPATH' ) || exit;

final class BlockRegistry {

	public static function register() {
		$blocks = glob( plugin_dir_path( WOOAPB_FILE ) . 'blocks/*/block.json' );

		foreach ( $blocks as $block ) {
			register_block_type_from_metadata(
				dirname( $block ),
				array(
					'render_callback' => function ( $attributes, $content, $block ) {
						switch ( $block->name ) {
							case 'wooapb/product-grid':
								return GridRender::render( $attributes, $content );
							case 'wooapb/product-carousel':
								return CarouselRender::render( $attributes, $content );
						}
						return '';
					},
				)
			);
		}
	}
}
