<?php
namespace WooAPB\Query;

use WC_Product_Query;

defined( 'ABSPATH' ) || exit;

final class ProductQuery {

	public static function get_products( array $args ) {

		$query = new WC_Product_Query(
			array(
				'limit'        => $args['per_page'] ?? 8,
				'status'       => 'publish',
				'stock_status' => ! empty( $args['in_stock'] ) ? 'instock' : '',
				'min_price'    => $args['min_price'] ?? '',
				'max_price'    => $args['max_price'] ?? '',
				'orderby'      => 'date',
				'order'        => 'DESC',
				'return'       => 'objects',
			)
		);

		return $query->get_products();
	}
}
