<?php
/**
 * Add CSS to footer.
 *
 * @package WooAPB\Core
 * @since 1.0.0
 */

namespace WooAPB\Core;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * CssCollector collects CSS rules from blocks and outputs them in the footer.
 */
class CssCollector {

	/**
	 * All CSS rules collected from blocks.
	 *
	 * @var array
	 */
	private static array $css = array();

	/**
	 * Add CSS rule
	 *
	 * @param string $css CSS rule to add.
	 */
	public static function add( string $css ) {
		if ( ! empty( $css ) ) {
			self::$css[] = $css;
		}
	}

	/**
	 * Get all CSS
	 *
	 * @return string All collected CSS rules concatenated together.
	 */
	public static function get() {
		return implode( '', self::$css );
	}

	/**
	 * Render once in footer
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public static function output() {
		$css = self::get();

		if ( empty( $css ) ) {
			return;
		}

		// Minify CSS.
		$css = preg_replace( '/\s+/', ' ', trim( $css ) );

		if ( ! empty( $css ) ) {
			wp_add_inline_style( 'wooapb-base', $css );
		}
	}
}
