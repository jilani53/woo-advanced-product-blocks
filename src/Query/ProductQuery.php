<?php
namespace WooAPB\Query;

use WC_Product_Query;

defined( 'ABSPATH' ) || exit;

class ProductQuery {

	public static function get_products( array $args ) {

		$page = $args['page'] ?? 1;

		$query = new WC_Product_Query(
			array(
				'limit'        => $args['per_page'] ?? 4,
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

		return $query->get_products();
	}
}
