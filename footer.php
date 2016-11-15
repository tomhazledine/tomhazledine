<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Tom_Hazledine_Theme
 */

?>

	</div>
	<footer id="colophon" class="site-footer" role="contentinfo">

        <p class="site-title"><!-- <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"> --><?php bloginfo( 'name' ); ?><!-- </a> --></p>

        <nav id="site-navigation" class="main-navigation" role="navigation">
            <!-- <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'tomhazledine_theme' ); ?></button> -->
            <?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
        </nav>

		<!-- <div class="site-info">
			<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'tomhazledine_theme' ) ); ?>"><?php printf( esc_html__( 'Proudly powered by %s', 'tomhazledine_theme' ), 'WordPress' ); ?></a>
			<span class="sep"> | </span>
			<?php printf( esc_html__( 'Theme: %1$s by %2$s.', 'tomhazledine_theme' ), 'tomhazledine_theme', '<a href="http://tomhazledine.com" rel="designer">Tom Hazledine</a>' ); ?>
		</div> -->

	</footer>
</div>

<?php wp_footer(); ?>

</body>
</html>
