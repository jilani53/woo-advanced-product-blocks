<?php
/**
 * Core entry.
 *
 * @package WooAPB
 * @since 1.0.0
 */

namespace WooAPB\Core;

if ( ! function_exists( 'add_action' ) ) {
	exit;
}

/**
 * Core files entry point.
 */
class Plugin {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'save_post_product', array( self::class, 'bump_cache_version' ) );
		add_action( 'woocommerce_update_product', array( self::class, 'bump_cache_version' ) );
	}

	/**
	 * Init files.
	 *
	 * @return void
	 */
	public function init() {
		add_action( 'init', array( Assets::class, 'register' ) );
		add_action( 'init', array( BlockRegistry::class, 'register' ) );
	}

	/**
	 * Flush product query cache.
	 * 
	 * @param int $product_id Post ID.
	 *
	 * @return void
	 */
	public static function bump_cache_version( $product_id ) {
		if ( 'product' !== get_post_type( $product_id ) ) {
			return;
		}

		update_option( 'wooapb_cache_version', time() );
	}
}
