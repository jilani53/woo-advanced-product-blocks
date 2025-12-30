<?php
namespace WooAPB\Core;

use WooAPB\Core\Assets;

defined( 'ABSPATH' ) || exit;

class Plugin {

	public function init() {
		add_action( 'init', array( Assets::class, 'register' ) );
		// add_action( 'init', array( Assets::class, 'init' ) );
		add_action( 'init', array( BlockRegistry::class, 'register' ) );
		Assets::front();
	}

}
