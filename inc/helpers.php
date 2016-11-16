<?php
/**
 * Tom Hazledine Theme Helpers
 *
 * @package Tom_Hazledine_Theme
 */

/**
 * PRINT PRE
 *
 * Outputs a pre-styled block to make debug prints more easy to read.
 *
 * @param string $stuff_to_print Text to be wrapped in styled pre-tag.
 */
function print_pre( $stuff_to_print ) {
	echo '<pre style="
		background:#ededed;
		color:#444;
		border:1px solid #ccc;
		border-radius:10px;
		font-size:10px;
		padding:10px;
		margin:10px;
	">';
	var_dump( $stuff_to_print );
	echo '</pre>';
}
