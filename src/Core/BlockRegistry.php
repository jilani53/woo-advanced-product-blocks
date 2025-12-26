<?php
namespace WooAPB\Core;

defined( 'ABSPATH' ) || exit;

final class BlockRegistry {

	// public static function register() {
	// 	$blocks = glob( plugin_dir_path( WOOAPB_FILE ) . 'blocks/*/block.json' );

	// 	foreach ( $blocks as $block ) {
	// 		register_block_type_from_metadata( dirname( $block ) );
	// 	}
	// }


	public static function register() {
		$blocks = [
			'product-grid',
			'product-carousel',
		];

		foreach ( $blocks as $block ) {
			register_block_type( plugin_dir_path( dirname( __DIR__ ) ) . "blocks/{$block}/block.json" );
		}
	}
}
