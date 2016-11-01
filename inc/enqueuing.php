<?php
/**
 * Enqueuing Scripts & Styles
 *
 * @package  Tom_Hazledine_Theme
 */

/**
 * Enqueue scripts and styles.
 */
function tomhazledine_theme_scripts() {
	wp_enqueue_style( 'tomhazledine_theme-style', get_template_directory_uri() . '/assets/css/main.css' );

	wp_enqueue_script( 'tomhazledine_theme-scripts', get_template_directory_uri() . '/assets/js/app.js', array( 'jquery' ), '20151215', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'tomhazledine_theme_scripts' );
