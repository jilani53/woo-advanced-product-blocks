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
use WooAPB\Blocks\ProductCarousel\StyleBuilder;

/**
 * Renders the Product Carousel block on the frontend.
 */
class Render {

	/**
	 * Renders the Product Carousel block on the frontend.
	 *
	 * @param array $attributes Block attributes.
	 * @return string
	 */
	public static function render( array $attributes ) {

		$slides_to_show = absint( $attributes['slidesToShow'] ?? 3 );
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

			wp_cache_set( $cache_key, $product_ids, $cache_group, 5 * MINUTE_IN_SECONDS );
		}

		if ( empty( $product_ids ) ) {
			return sprintf( '<p>%s</p>', esc_html__( 'No products found.', 'woo-advanced-product-blocks' ) );
		}

		$block_id = ! empty( $attributes['blockId'] ) ? 'wooapb-' . sanitize_key( $attributes['blockId'] ) : 'wooapb-product-carousel';

		/**
		 * Dynamic CSS builder
		 */
		$css = StyleBuilder::build( $attributes, $block_id );

		$swiper_settings = array(
			'slidesPerView' => $slides_to_show,
			'spaceBetween'  => 20,
			'loop'          => false,
		);

		ob_start();
		?>
		<div id="<?php echo esc_attr( $block_id ); ?>" class="wooapb-carousel swiper" data-swiper='<?php echo esc_attr( wp_json_encode( $swiper_settings ) ); ?>'>
			<div class="swiper-wrapper">
				<?php foreach ( $product_ids as $product ) : ?>
					<?php $product = wc_get_product( $product ); ?>
					<?php
					if ( ! $product ) {
						continue;
					}
					?>

					<div class="swiper-slide">
						<a href="<?php echo esc_url( $product->get_permalink() ); ?>">
							<?php echo wp_kses_post( $product->get_image() ); ?>
							<div class="wooapb-product-content">
								<h2 class="wc-block-carousel__product-title"><?php echo esc_html( $product->get_name() ); ?></h2>
								<span><?php echo wp_kses_post( $product->get_price_html() ); ?></span>
							</div>
						</a>
					</div>

				<?php endforeach; ?>

			</div>

			<div class="swiper-pagination"></div>
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>

		</div>
		<?php

		if ( ! empty( $css ) ) {
			CssCollector::add( $css );
		}

		return ob_get_clean();
	}
}
