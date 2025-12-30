<?php
namespace WooAPB\Blocks\ProductGrid;

use WooAPB\Query\ProductQuery;
use WC_Product_Query;

defined( 'ABSPATH' ) || exit;

class Render {

	public static function render( array $attributes ): string {
		$columns        = absint( $attributes['columns'] ?? 4 );
		$posts_per_page = absint( $attributes['postsPerPage'] ?? 4 );

		$page = $args['page'] ?? 1;

		$query = new WC_Product_Query(
			array(
				'limit'        => $posts_per_page,
				'page'         => $page,
				'status'       => 'publish',
				'stock_status' => ! empty( $args['in_stock'] ) ? 'instock' : '',
				'min_price'    => $args['min_price'] ?? '',
				'max_price'    => $args['max_price'] ?? '',
				'orderby'      => 'date',
				'order'        => 'DESC',
				'return'       => 'objects',
			)
		);

		$products = $query->get_products();

		if ( empty( $products ) ) {
			return '';
		}

		ob_start();
		?>
		<div class="wp-block-wooapb-product-grid">
		<div
			class="wooapb-grid"
			style="grid-template-columns: repeat(<?php echo esc_attr( $columns ); ?>, 1fr);"
		>
			<?php foreach ( $products as $product ) : ?>
				<div class="wooapb-product">
					<a href="<?php echo esc_url( get_permalink( $product->get_id() ) ); ?>">
						<?php echo $product->get_image(); ?>
						<h3><?php echo esc_html( $product->get_name() ); ?></h3>
						<span><?php echo wp_kses_post( $product->get_price_html() ); ?></span>
					</a>
				</div>
			<?php endforeach; ?>
		</div>
		</div>
		<?php
		return ob_get_clean();
	}
}
