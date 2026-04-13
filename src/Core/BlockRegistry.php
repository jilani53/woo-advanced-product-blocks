<?php
/**
 * Regier all blocks
 *
 * @package WooAPB\Core
 * @since 1.0.0
 */

namespace WooAPB\Core;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Register blocks.
 */
class BlockRegistry {

	/**
	 * Register blocks.
	 *
	 * @return void
	 */
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

	/**
	 * Render block dynamic callback.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $block      Block instance.
	 * @return string
	 */
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
