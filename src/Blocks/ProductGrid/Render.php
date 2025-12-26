<?php
namespace WooAPB\Blocks\ProductGrid;

use WooAPB\Query\ProductQuery;

defined( 'ABSPATH' ) || exit;

final class Render {

	public static function output( array $attributes ): string {
		$columns        = absint( $attributes['columns'] ?? 4 );
		$posts_per_page = absint( $attributes['postsPerPage'] ?? 8 );

		$query  = new ProductQuery();
		$result = $query->get_products(
			[
				'posts_per_page' => $posts_per_page,
			]
		);

		if ( empty( $result ) ) {
			return '';
		}

		ob_start();
		?>
		<div
			class="wooapb-grid"
			style="grid-template-columns: repeat(<?php echo esc_attr( $columns ); ?>, 1fr);"
		>
			<?php foreach ( $result as $product ) : ?>
				<div class="wooapb-product">
					<a href="<?php echo esc_url( get_permalink( $product->get_id() ) ); ?>">
						<?php echo $product->get_image(); ?>
						<h3><?php echo esc_html( $product->get_name() ); ?></h3>
						<span><?php echo wp_kses_post( $product->get_price_html() ); ?></span>
					</a>
				</div>
			<?php endforeach; ?>
		</div>
		<?php
		return ob_get_clean();
	}
}
