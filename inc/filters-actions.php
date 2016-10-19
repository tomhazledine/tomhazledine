<?php
/**
 * Custom Filters & Actions
 *
 * @package Tabula_Rasa
 */

/**
 * Change editor fields that are hidden by default.
 *
 * Specifically, we want the Expert field to always be shown on the edit screen.
 *
 * @param  array  $hidden An array of meta boxes hidden by default.
 * @param  object $screen WP_Screen object of the current screen.
 * @return array          The altered array of meta boxes to be hidden.
 */
function custom_hidden_meta_boxes( $hidden, $screen ) {
	if ( 'post' === $screen->base || 'page' === $screen->base ) {
		// removed `postexcerpt` from array.
		$hidden = array(
			'slugdiv',
			'trackbacksdiv',
			'postcustom',
			'commentstatusdiv',
			'commentsdiv',
			'authordiv',
			'revisionsdiv',
		);
	}
	return $hidden;
}
add_filter( 'default_hidden_meta_boxes', 'custom_hidden_meta_boxes', 10, 2 );

/**
 * Move Excerpt Box Above Editor
 *
 * @param  object $post Post object.
 */
function move_excerpt_meta_box( $post ) {
	if ( post_type_supports( $post->post_type, 'excerpt' ) ) {
		// Remove the default postexcerpt meta_box.
		remove_meta_box( 'postexcerpt', $post->post_type, 'normal' );
		// Create a new box with a new custom context of 'under_title' (instead of 'normal', 'advanced' or 'side').
		add_meta_box(
			'postexcerpt', __( 'Excerpt' ), 'post_excerpt_meta_box', $post->post_type, 'under_title', 'high'
		);
		// Trigger our new context (which loads our new excerpt box).
		do_meta_boxes( get_current_screen(), 'under_title', $post );
	}
}
add_action( 'edit_form_after_title', 'move_excerpt_meta_box' );

/**
 * Reset Default Excerpt Length
 *
 * @param  integer $length Original excerpt length.
 * @return integer         New excerpt length.
 */
function custom_excerpt_length( $length ) {
	return 20;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

