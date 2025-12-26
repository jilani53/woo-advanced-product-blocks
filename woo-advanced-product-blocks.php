<?php
/**
 * Plugin Name: Woo Advanced Product Blocks
 * Description: Grid & Carousel WooCommerce product blocks with filters.
 * Version: 1.0.0
 * Author: Jilani Ahmed
 * License: GPL-2.0-or-later
 *
 * @package Woo_Advanced_Product_Blocks
 */

defined( 'ABSPATH' ) || exit;

define( 'WOOAPB_FILE', __FILE__ );
define( 'WOOAPB_VERSION', '1.0.0' );

require_once __DIR__ . '/vendor/autoload.php';

use WooAPB\Core\Plugin;

( new Plugin() )->init();
