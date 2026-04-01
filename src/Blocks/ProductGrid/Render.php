<?php
/**
 * Render grid style products.
 *
 * @package WooAPB\Blocks\ProductGrid
 * @since 1.0.0
 */
namespace WooAPB\Blocks\ProductGrid;

use WC_Product_Query;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Renders the Product Grid block on the frontend.
 */
class Render {

	/**
	 * Renders the Product Grid block on the frontend.
	 *
	 * @param array $attributes Block attributes.
	 * @return string
	 */
	public static function render( array $attributes ): string {
		$columns        = absint( $attributes['columns'] ?? 4 );
		$posts_per_page = absint( $attributes['postsPerPage'] ?? 4 );
		$in_stock       = filter_var( $attributes['inStock'] ?? false, FILTER_VALIDATE_BOOLEAN );
		$page           = absint( $attributes['page'] ?? 1 );

		$query_args = array(
			'limit'   => $posts_per_page,
			'page'    => $page,
			'status'  => 'publish',
			'orderby' => $attributes['orderby'] ?? 'date',
			'order'   => $attributes['order'] ?? 'DESC',
			'return'  => 'objects',
		);

		if ( $in_stock ) {
			$query_args['stock_status'] = 'instock';
		}

		/**
		 * Generate cache key (stable + unique per query)
		 */
		$version     = (int) get_option( 'wooapb_cache_version', 1 );
		$cache_key   = 'wooapb_products_' . $version . '_' . md5( wp_json_encode( $query_args ) );
		$cache_group = 'wooapb_products';

		$product_ids = wp_cache_get( $cache_key, $cache_group );

		if ( false === $product_ids ) {
			$query       = new WC_Product_Query( $query_args );
			$product_ids = $query->get_products();

			// Store in object cache (persistent if Redis/Memcached exists).
			wp_cache_set( $cache_key, $product_ids, $cache_group, 5 * MINUTE_IN_SECONDS );
		}

		if ( empty( $product_ids ) ) {
			return '<p>No products found.</p>';
		}

		// Lazy load product objects only when needed.
		$products = array_map( 'wc_get_product', $product_ids );

		ob_start();
		?>
		<div class="wp-block-wooapb-product-grid">
			<ul class="wooapb-grid products columns-<?php echo esc_attr( $columns ); ?>" style="grid-template-columns: repeat(<?php echo esc_attr( $columns ); ?>, 1fr);">
				<?php foreach ( $products as $product ) : ?>
					<li class="wc-block-grid__product"
						data-product-id="<?php echo esc_attr( $product->get_id() ); ?>"
					>
						<a href="<?php echo esc_url( get_permalink( $product->get_id() ) ); ?>">
							<?php echo wp_kses_post( $product->get_image() ); ?>
							<h2 class="wc-block-grid__product-title"><?php echo esc_html( $product->get_name() ); ?></h2>
							<span class="wc-block-grid__product-price"><?php echo wp_kses_post( $product->get_price_html() ); ?></span>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>
		</div>
		<?php
		return ob_get_clean();
	}
}
