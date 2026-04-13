<?php
/**
 * Plugin Name: Woo Advanced Product Blocks
 * Description: Grid & Carousel WooCommerce product blocks with filters.
 * Version: 1.0.0
 * Author: Jilani Ahmed
 * License: GPL-2.0-or-later
 * Requires Plugins: woocommerce
 *
 * @package Woo_Advanced_Product_Blocks
 */

defined( 'ABSPATH' ) || exit;

define( 'WOOAPB_FILE', __FILE__ );
define( 'WOOAPB_VERSION', '1.0.0' );

require_once __DIR__ . '/vendor/autoload.php';

use WooAPB\Core\Plugin;

/**
 * Check WooCommerce dependency
 */
function wooapb_is_woocommerce_active() {
	return class_exists( 'WooCommerce' );
}

/**
 * Show admin notice if missing WooCommerce
 */
function wooapb_missing_wc_notice() {

	if ( ! current_user_can( 'activate_plugins' ) ) {
		return;
	}
	?>
	<div class="notice notice-error">
		<p>
			<?php esc_html_e( 'Woo Advanced Product Blocks requires WooCommerce to be installed and active.', 'wooapb' ); ?>
		</p>
	</div>
	<?php
}

/**
 * Bootstrap plugin safely
 */
function wooapb_init() {

	if ( ! wooapb_is_woocommerce_active() ) {
		add_action( 'admin_notices', 'wooapb_missing_wc_notice' );
		return;
	}

	$plugin = new Plugin();
	$plugin->init();
}
add_action( 'plugins_loaded', 'wooapb_init', 20 );
