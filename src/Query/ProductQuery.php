<?php
/**
 * Global product query class to be used across blocks.
 * 
 * @package WooAPB\Query
 * @since 1.0.0
 */

namespace WooAPB\Query;

use WC_Product_Query;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * WooCommerce product query.
 */
class ProductQuery {

	/**
	 * Retrieve products based on the given arguments.
	 *
	 * @param array $args Array of arguments.
	 * @return array|\stdClass Number of pages and an array of product objects if
	 *                         paginate is true, or just an array of values.
	 */
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
