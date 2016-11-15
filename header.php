<?php include"head.php"; ?>


<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'tomhazledine_theme' ); ?></a>

	<header id="masthead" class="site-header" role="banner">
		<p class="site-title"><?php bloginfo( 'name' ); ?></p>

        <nav id="site-navigation" class="main-navigation" role="navigation">
            <?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
        </nav>
	</header>

	<div id="content" class="site-content">
