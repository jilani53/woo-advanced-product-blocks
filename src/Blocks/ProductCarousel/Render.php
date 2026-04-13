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

		$query       = new WC_Product_Query( $query_args );
		$product_ids = $query->get_products();

		if ( empty( $product_ids ) ) {
			return '<p>No products found.</p>';
		}

		$block_id = ! empty( $attributes['blockId'] )
			? 'wooapb-' . sanitize_key( $attributes['blockId'] )
			: 'wooapb-product-carousel';

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
		<div
			id="<?php echo esc_attr( $block_id ); ?>"
			class="wooapb-carousel swiper"
			data-swiper='<?php echo esc_attr( wp_json_encode( $swiper_settings ) ); ?>'
		>

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
							<h2 class="wc-block-carousel__product-title"><?php echo esc_html( $product->get_name() ); ?></h3>
							<span><?php echo wp_kses_post( $product->get_price_html() ); ?></span>
						</a>
					</div>

				<?php endforeach; ?>

			</div>

			<div class="swiper-pagination"></div>
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>

		</div>
		<?php

		/**
		 * Render once in footer
		 */
		if ( ! empty( $css ) ) {
			CssCollector::add( $css );
		}

		return ob_get_clean();
	}
}
