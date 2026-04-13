<?php
/**
 * Add CSS to footer.
 *
 * @package WooAPB\Core
 * @since 1.0.0
 */

namespace WooAPB\Core;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Ajax class to handle AJAX requests for the plugin.
 */
class Ajax {

	/**
	 * Ajax load more.
	 *
	 * @return void
	 */
	public static function ajax_load_more() {

		check_ajax_referer( 'wooapb_load_more', 'nonce' );

		$page       = isset( $_POST['page'] ) ? absint( $_POST['page'] ) : 1;
		$attributes = isset( $_POST['attributes'] ) ? json_decode( wp_unslash( $_POST['attributes'] ), true ) : array();

		$posts_per_page = absint( $attributes['postsPerPage'] ?? 4 );
		$in_stock       = filter_var( $attributes['inStock'] ?? false, FILTER_VALIDATE_BOOLEAN );

		$query_args = array(
			'limit'   => $posts_per_page,
			'offset'  => ( $page - 1 ) * $posts_per_page,
			'status'  => 'publish',
			'orderby' => $attributes['orderby'] ?? 'date',
			'order'   => $attributes['order'] ?? 'DESC',
			'return'  => 'objects',
		);

		if ( $in_stock ) {
			$query_args['stock_status'] = 'instock';
		}

		$query    = new \WC_Product_Query( $query_args );
		$products = $query->get_products();

		if ( empty( $products ) ) {
			wp_send_json_success(
				array(
					'html'     => '',
					'has_more' => false,
				)
			);
		}

		ob_start();

		foreach ( $products as $product ) {
			?>
			<li class="wc-block-grid__product"
				data-product-id="<?php echo esc_attr( $product->get_id() ); ?>">

				<a href="<?php echo esc_url( get_permalink( $product->get_id() ) ); ?>">
					<?php echo wp_kses_post( $product->get_image() ); ?>

					<div class="wooapb-product-content">
						<h2 class="wc-block-grid__product-title">
							<?php echo esc_html( $product->get_name() ); ?>
						</h2>

						<span class="wc-block-grid__product-price">
							<?php echo wp_kses_post( $product->get_price_html() ); ?>
						</span>
					</div>
				</a>
			</li>
			<?php
		}

		wp_send_json_success(
			array(
				'html'     => ob_get_clean(),
				'has_more' => count( $products ) === $posts_per_page,
			)
		);
	}
}