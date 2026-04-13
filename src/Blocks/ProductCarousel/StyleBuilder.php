<?php
/**
 * Dynamic Style Builder for Product Carousel Block.
 *
 * @package WooAPB\Blocks\ProductCarousel
 */

namespace WooAPB\Blocks\ProductCarousel;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Style builder.
 */
class StyleBuilder {

	/**
	 * Build dynamic CSS.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $block_id   Unique block ID.
	 * @return string
	 */
	public static function build( array $attributes, string $block_id ) {

		$css      = '';
		$selector = '#' . $block_id . ' .wc-block-carousel__product-title';

		// Title color.
		if ( ! empty( $attributes['titleColor']['value'] ) ) {
			$css .= sprintf(
				'%s{color:%s;}',
				$selector,
				sanitize_hex_color( $attributes['titleColor']['value'] )
			);
		}

		$typography = $attributes['typography'] ?? array();

		if ( empty( $typography ) ) {
			return $css;
		}

		$desktop_unit = $typography['fontSize']['unit'] ?? 'px';

		// Font size.
		if ( ! empty( $typography['fontSize']['desktop'] ) ) {
			$css .= sprintf(
				'%s{font-size:%s%s;}',
				$selector,
				absint( $typography['fontSize']['desktop'] ),
				$desktop_unit
			);
		}

		// Font weight.
		if ( ! empty( $typography['fontWeight'] ) ) {
			$css .= sprintf(
				'%s{font-weight:%s;}',
				$selector,
				sanitize_text_field( $typography['fontWeight'] )
			);
		}

		// Font style.
		if ( ! empty( $typography['fontStyle'] ) ) {
			$css .= sprintf(
				'%s{font-style:%s;}',
				$selector,
				sanitize_text_field( $typography['fontStyle'] )
			);
		}

		// Text transform.
		if ( ! empty( $typography['textTransform'] ) ) {
			$css .= sprintf(
				'%s{text-transform:%s;}',
				$selector,
				sanitize_text_field( $typography['textTransform'] )
			);
		}

		// Text decoration.
		if ( ! empty( $typography['textDecoration'] ) ) {
			$css .= sprintf(
				'%s{text-decoration:%s;}',
				$selector,
				sanitize_text_field( $typography['textDecoration'] )
			);
		}

		// Line height.
		if ( ! empty( $typography['lineHeight']['desktop'] ) ) {
			$css .= sprintf(
				'%s{line-height:%s;}',
				$selector,
				esc_attr( $typography['lineHeight']['desktop'] )
			);
		}

		// Letter spacing.
		if ( ! empty( $typography['letterSpacing']['desktop'] ) ) {

			$unit = $typography['letterSpacing']['unit'] ?? 'px';

			$css .= sprintf(
				'%s{letter-spacing:%s%s;}',
				$selector,
				esc_attr( $typography['letterSpacing']['desktop'] ),
				esc_attr( $unit )
			);
		}

		return $css;
	}
}
