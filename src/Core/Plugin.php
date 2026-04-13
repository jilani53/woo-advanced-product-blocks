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

use WooAPB\Core\Assets;
use WooAPB\Core\CssCollector;
use WooAPB\Core\Ajax;

/**
 * Core files entry point.
 */
class Plugin {

	/**
	 * Init files.
	 *
	 * @return void
	 */
	public function init() {
		add_action( 'init', array( Assets::class, 'register' ) );
		add_action( 'init', array( BlockRegistry::class, 'register' ) );

		// Cache bust the product query cache when a product is saved or updated.
		add_action( 'save_post_product', array( self::class, 'bump_cache_version' ) );
		add_action( 'woocommerce_update_product', array( self::class, 'bump_cache_version' ) );

		// Load block based inline styles.
		add_action( 'enqueue_block_assets', array( Assets::class, 'enqueue' ), 20 );
		add_action( 'wp_enqueue_scripts', array( Assets::class, 'enqueue' ), 20 );

		if ( wp_is_block_theme() ) {
			add_action( 'wp_enqueue_scripts', array( CssCollector::class, 'output' ), 20 );
		} else {
			add_action( 'wp_footer', array( CssCollector::class, 'output' ) );
		}

		// Ajax load more.
		add_action( 'wp_ajax_wooapb_load_more_products', array( Ajax::class, 'ajax_load_more' ) );
		add_action( 'wp_ajax_nopriv_wooapb_load_more_products', array( Ajax::class, 'ajax_load_more' ) );
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
