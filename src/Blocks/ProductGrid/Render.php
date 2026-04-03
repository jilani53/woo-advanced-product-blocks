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
			return sprintf( '<p>%s</p>', esc_html__( 'No products found.', 'woo-advanced-product-blocks' ) );
		}

		/**
		 * Generate unique block ID
		 */
		$block_id = ! empty( $attributes['blockId'] ) ? 'wooapb-' . sanitize_key( $attributes['blockId'] ) : 'wooapb-product-grid';

		/**
		 * Dynamic CSS builder
		 */
		$css = '';

		$selector = '#' . $block_id . ' .wc-block-grid__product-title';

		if ( ! empty( $attributes['titleColor'] ) ) {
			$css .= $selector . '{color:' . sanitize_text_field( $attributes['titleColor'] ) . ';}';
		}

		if ( ! empty( $attributes['titleFontSize'] ) ) {
			$css .= $selector . '{font-size:' . sanitize_text_field( $attributes['titleFontSize'] ) . ';}';
		}

		if ( ! empty( $attributes['fontWeight'] ) ) {
			$css .= $selector . '{font-weight:' . sanitize_text_field( $attributes['fontWeight'] ) . ';}';
		}

		if ( ! empty( $attributes['lineHeight'] ) ) {
			$css .= $selector . '{line-height:' . sanitize_text_field( $attributes['lineHeight'] ) . ';}';
		}

		// Typography group.
		$typo = $attributes['typography'] ?? array();

		if ( ! empty( $typo['fontFamily'] ) ) {
			$css .= $selector . '{font-family:' . sanitize_text_field( $typo['fontFamily'] ) . ';}';
		}

		if ( ! empty( $typo['fontWeight'] ) ) {
			$css .= $selector . '{font-weight:' . sanitize_text_field( $typo['fontWeight'] ) . ';}';
		}

		if ( ! empty( $typo['fontStyle'] ) ) {
			$css .= $selector . '{font-style:' . sanitize_text_field( $typo['fontStyle'] ) . ';}';
		}

		if ( ! empty( $typo['textTransform'] ) ) {
			$css .= $selector . '{text-transform:' . sanitize_text_field( $typo['textTransform'] ) . ';}';
		}

		if ( ! empty( $typo['textDecoration'] ) ) {
			$css .= $selector . '{text-decoration:' . sanitize_text_field( $typo['textDecoration'] ) . ';}';
		}

		if ( ! empty( $typo['fontSize']['desktop'] ) ) {
			$unit = $typo['fontSize']['unit'] ?? 'px';
			$css .= $selector . '{font-size:' . floatval( $typo['fontSize']['desktop'] ) . $unit . ';}';
		}

		if ( ! empty( $typo['lineHeight']['desktop'] ) ) {
			$unit = $typo['lineHeight']['unit'] ?? 'px';
			$css .= $selector . '{line-height:' . floatval( $typo['lineHeight']['desktop'] ) . $unit . ';}';
		}

		if ( ! empty( $typo['letterSpacing']['desktop'] ) ) {
			$unit = $typo['letterSpacing']['unit'] ?? 'px';
			$css .= $selector . '{letter-spacing:' . floatval( $typo['letterSpacing']['desktop'] ) . $unit . ';}';
		}

		// Lazy load product objects only when needed.
		$products = array_map( 'wc_get_product', $product_ids );

		ob_start();
		?>
		<div id="<?php echo esc_attr( $block_id ); ?>">
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
		/**
		 * Render once in footer
		 */
		if ( ! empty( $css ) ) {
			CssCollector::add( $css );
		}

		return ob_get_clean();
	}
}
