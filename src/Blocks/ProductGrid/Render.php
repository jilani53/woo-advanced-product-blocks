<?php
namespace WooAPB\Blocks\ProductGrid;

use WooAPB\Query\ProductQuery;
use WC_Product_Query;

defined( 'ABSPATH' ) || exit;

class Render {

	





	public static function render( array $attributes ): string {
		$columns        = absint( $attributes['columns'] ?? 4 );
		$rows           = absint( $attributes['rows'] ?? 2 );
		// $posts_per_page = $columns * $rows;

		$posts_per_page = absint( $attributes['postsPerPage'] ?? 4 );

		// $page = $args['page'] ?? 1;

		$page = absint( $attributes['page'] ?? 1 );

		$query_args = array(
			'limit'   => $posts_per_page,
			'page'    => $page,
			'status'  => 'publish',
			'orderby' => $attributes['orderby'] ?? 'date',
			'order'   => $attributes['order'] ?? 'DESC',
			'return'  => 'objects',
		);

		if ( ! empty( $attributes['inStock'] ) ) {
			$query_args['stock_status'] = 'instock';
		}

		$query    = new WC_Product_Query( $query_args );
		$products = $query->get_products();

		if ( empty( $products ) ) {
			return '<p>No products found.</p>';
		}

		ob_start();
		?>
		<div class="wp-block-wooapb-product-grid">
			<ul class="wooapb-grid products columns-<?php echo esc_attr( $columns ); ?>" style="grid-template-columns: repeat(<?php echo esc_attr( $columns ); ?>, 1fr);">
				<?php foreach ( $products as $product ) : ?>
					<li class="wc-block-grid__product"
						data-product-id="<?php echo esc_attr( $product->get_id() ); ?>"
					>
						<a href="<?php echo esc_url( get_permalink( $product->get_id() ) ); ?>">
							<?php echo $product->get_image(); ?>
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
