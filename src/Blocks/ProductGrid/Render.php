<?php
/**
 * Render grid style products.
 *
 * @package WooAPB\Blocks\ProductGrid
 * @since 1.0.0
 */
namespace WooAPB\Blocks\ProductGrid;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

use WC_Product_Query;
use WooAPB\Core\CssCollector;
use WooAPB\Blocks\ProductGrid\StyleBuilder;

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
	public static function render( array $attributes ) {
		$columns        = absint( $attributes['columns'] ?? 4 );
		$posts_per_page = absint( $attributes['postsPerPage'] ?? 4 );
		$in_stock       = filter_var( $attributes['inStock'] ?? false, FILTER_VALIDATE_BOOLEAN );
		$page           = 1; // always start from first page on initial render.

		$query_args = array(
			'limit'   => $posts_per_page,
			'offset'  => 0,
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

			wp_cache_set( $cache_key, $product_ids, $cache_group, 5 * MINUTE_IN_SECONDS );
		}

		if ( empty( $product_ids ) ) {
			return sprintf( '<p>%s</p>', esc_html__( 'No products found.', 'woo-advanced-product-blocks' ) );
		}

		$block_id = ! empty( $attributes['blockId'] ) ? 'wooapb-' . sanitize_key( $attributes['blockId'] ) : 'wooapb-product-grid';

		/**
		 * Dynamic CSS builder
		 */
		$css = StyleBuilder::build( $attributes, $block_id );

		$products = array_map( 'wc_get_product', $product_ids );

		/**
		 * Load More payload (for JS usage)
		 */
		$payload = array(
			'blockId'      => $block_id,
			'columns'      => $columns,
			'postsPerPage' => $posts_per_page,
			'attributes'   => $attributes,
			'currentPage'  => 1,
		);

		ob_start();
		?>

		<div
			id="<?php echo esc_attr( $block_id ); ?>"
			class="wooapb-product-grid-wrapper"
			data-wooapb='<?php echo wp_json_encode( $payload ); ?>'
		>

			<ul class="wooapb-grid products columns-<?php echo esc_attr( $columns ); ?>"
				style="grid-template-columns: repeat(<?php echo esc_attr( $columns ); ?>, 1fr);">

				<?php foreach ( $products as $product ) : ?>
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
				<?php endforeach; ?>

			</ul>

			<button type="button" class="wooapb-load-more button is-primary">
				<?php esc_html_e( 'Load More', 'woo-advanced-product-blocks' ); ?>
			</button>

		</div>

		<?php

		if ( ! empty( $css ) ) {
			CssCollector::add( $css );
		}

		return ob_get_clean();
	}
}
