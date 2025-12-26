<?php
namespace WooAPB\Blocks\ProductCarousel;

use WooAPB\Query\ProductQuery;

defined( 'ABSPATH' ) || exit;

final class Render {

	public static function render( array $attributes ) {

		wp_enqueue_style( 'wooapb-base' );
		wp_enqueue_style( 'wooapb-swiper' );
		wp_enqueue_script( 'wooapb-swiper' );
		wp_enqueue_style( 'wooapb-carousel' );
		wp_enqueue_script( 'wooapb-carousel' );

		$products = ProductQuery::get_products( $attributes );

		if ( empty( $products ) ) {
			return '<p>No products found.</p>';
		}

		ob_start();
		echo '<div class="wooapb-carousel swiper">';
		echo '<div class="swiper-wrapper">';
		foreach ( $products as $product ) {
			echo '<div class="swiper-slide">';
			echo '<a href="' . esc_url( $product->get_permalink() ) . '">';
			echo $product->get_image();
			echo '<h3>' . esc_html( $product->get_name() ) . '</h3>';
			echo '</a></div>';
		}
		echo '</div><div class="swiper-pagination"></div></div>';
		return ob_get_clean();
	}
}
