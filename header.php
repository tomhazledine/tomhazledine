<?php include"head.php"; ?>

<div class="header-animation">
    <div class="header-animation-inner">
        <span class="header-animation-item header-animation-item-one"><span class="header-animation-item-inner"></span></span>
        <span class="header-animation-item header-animation-item-two"><span class="header-animation-item-inner"></span></span>
        <span class="header-animation-item header-animation-item-three"><span class="header-animation-item-inner"></span></span>
        <span class="header-animation-item header-animation-item-four"><span class="header-animation-item-inner"></span></span>
        <span class="header-animation-item header-animation-item-five"><span class="header-animation-item-inner"></span></span>
        <span class="header-animation-item header-animation-item-six"><span class="header-animation-item-inner"></span></span>
    </div>
</div>

<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'tomhazledine_theme' ); ?></a>

<header id="masthead" class="site-header" role="banner">
    <div class="header-inner">
		<p class="site-title"><?php bloginfo( 'name' ); ?></p>

        <nav id="site-navigation" class="main-navigation" role="navigation">
            <?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
        </nav>
    </div>
</header>

<?php if ( ! is_front_page() ) { ?>
    <a href="/" class="home-link"><span class="">Home</span></a>
<?php } ?>
