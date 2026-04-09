<?php
/**
 * Render carousel style products (converted from grid).
 *
 * @package WooAPB\Blocks\ProductCarousel
 * @since 1.0.0
 */

namespace WooAPB\Blocks\ProductCarousel;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

use WC_Product_Query;
use WooAPB\Core\CssCollector;
use WooAPB\Blocks\ProductGrid\StyleBuilder;

/**
 * Renders the Product Carousel block on the frontend.
 */
class Render {

	/**
	 * Render product carousel.
	 *
	 * @param array $attributes Block attributes.
	 * @return string
	 */
	public static function render( array $attributes ) {

		/**
		 * Enqueue Swiper assets (keep centralized, no duplication)
		 */
		wp_enqueue_style( 'wooapb-swiper' );
		wp_enqueue_script( 'wooapb-swiper' );

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
		 * Cache layer (unchanged)
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

		/**
		 * Block ID
		 */
		$block_id = ! empty( $attributes['blockId'] )
			? 'wooapb-' . sanitize_key( $attributes['blockId'] )
			: 'wooapb-product-carousel';

		/**
		 * Dynamic CSS (unchanged)
		 */
		$css = StyleBuilder::build( $attributes, $block_id );

		$products = array_map( 'wc_get_product', $product_ids );

		/**
		 * Swiper config (keeps architecture flexible)
		 */
		$swiper_settings = array(
			'slidesPerView' => $columns,
			'spaceBetween'  => 20,
			'loop'          => false,
		);

		ob_start();
		?>
		<div id="<?php echo esc_attr( $block_id ); ?>" class="wooapb-carousel swiper" data-swiper='<?php echo wp_json_encode( $swiper_settings ); ?>'>

			<div class="swiper-wrapper">

				<?php foreach ( $products as $product ) : ?>
					<?php if ( ! $product ) { continue; } ?>

					<div class="swiper-slide wc-block-grid__product"
						data-product-id="<?php echo esc_attr( $product->get_id() ); ?>">

						<a href="<?php echo esc_url( $product->get_permalink() ); ?>">

							<?php echo wp_kses_post( $product->get_image() ); ?>

							<h2 class="wc-block-grid__product-title">
								<?php echo esc_html( $product->get_name() ); ?>
							</h2>

							<span class="wc-block-grid__product-price">
								<?php echo wp_kses_post( $product->get_price_html() ); ?>
							</span>

						</a>
					</div>

				<?php endforeach; ?>

			</div>

			<!-- Controls (optional but scalable) -->
			<div class="swiper-pagination"></div>
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>

		</div>
		<?php

		/**
		 * CSS collector (unchanged)
		 */
		if ( ! empty( $css ) ) {
			CssCollector::add( $css );
		}

		return ob_get_clean();
	}
}
