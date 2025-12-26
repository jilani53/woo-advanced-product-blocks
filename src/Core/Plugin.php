<?php
namespace WooAPB\Core;

defined( 'ABSPATH' ) || exit;

final class Plugin {

	public function init() {
		add_action( 'init', array( Assets::class, 'register' ) );
		add_action( 'init', array( BlockRegistry::class, 'register' ) );
	}
}
