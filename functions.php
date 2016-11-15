<?php
/**
 * Tom Hazledine Theme functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Tom_Hazledine_Theme
 */

/**
 * Theme Setup
 */
require get_template_directory() . '/inc/custom-setup.php';
// require get_template_directory() . '/inc/theme-setup.php';

/**
 * Enqueuing Scripts & Styles.
 */
require get_template_directory() . '/inc/enqueuing.php';

/**
 * Implement the Custom Header feature.
 */
// require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
// require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
// require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
// require get_template_directory() . '/inc/jetpack.php';

/**
 * Load additional helper functions.
 */
require get_template_directory() . '/inc/helpers.php';

/**
 * Load custom filters.
 */
// require get_template_directory() . '/inc/filters-actions.php';

/**
 * Register menus.
 */
require get_template_directory() . '/inc/menus.php';