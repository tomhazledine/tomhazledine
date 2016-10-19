<?php
/**
 * Tabula Rasa Helpers
 *
 * @package Tabula_Rasa
 */

/**
 * Print Pre: outputs a pre-styled block to make debug prints more easy to read.
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
	print( esc_attr( $stuff_to_print ) );
	echo '</pre>';
}

