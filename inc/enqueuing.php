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
	wp_enqueue_style( 'tomhazledine_theme-style', get_template_directory_uri() . '/assets/css/main.min.css', array(), null );

    // Use a non-WP version of jquery (to get around the native .noConflict() version that WP uses by default).
    // wp_deregister_script('jquery');
    // wp_register_script('jquery', ("//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"), false, '1.11.2', false, true);
    // wp_enqueue_script('jquery');

	// wp_enqueue_script( 'tomhazledine_theme-scripts', get_template_directory_uri() . '/assets/js/app.js', array( 'jquery' ), '20151215', true );
    // wp_enqueue_script( 'tomhazledine_theme-scripts', get_template_directory_uri() . '/assets/js/app.min.js', array( 'jquery' ), false, true );
    wp_enqueue_script( 'tomhazledine_theme-scripts', get_template_directory_uri() . '/assets/js/app.min.js', array(), null, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'tomhazledine_theme_scripts' );
