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

/**
 * READING TIME
 *
 * Calculate an approximate reading-time for a post.
 *
 * @param  string $content The content to be measured.
 * @return  integer Reading-time in seconds.
 */
function reading_time( $content ) {

	// Predefined words-per-minute rate.
	$words_per_minute = 225;
	$words_per_second = $words_per_minute / 60;

	// Count the words in the content.
	$word_count = str_word_count( strip_tags( $content ) );

	// [UNUSED] How many minutes?
	$minutes = floor( $word_count / $words_per_minute );

	// [UNUSED] How many seconds (remainder)?
	$seconds_remainder = floor( $word_count % $words_per_minute / $words_per_second );

	// How many seconds (total)?
	$seconds_total = floor( $word_count / $words_per_second );

	return $seconds_total;
}

/**
 * PARSE TIME
 *
 * Convert seconds (int) into a nicely formatted string.
 *
 * @param  integer $seconds The number of seconds.
 * @return  string Formatted output.
 */
function parse_read_time( $seconds ) {

	// String to store our output.
	$string_output = '';

	// Double-check we're using an integer.
	$seconds = (int) $seconds;

	if ( $seconds < 60 ) {

		// If the time is less than 60 seconds, we'll call it a 1min read.
		$string_output .= '1 minute';

	} else {
		if ( $seconds < 120 ) {

			// If the time is less than 120 seconds, we'll output a singular minute.
			$string_output .= '1 minute';

		} else {

			// Calculate the number of whole minutes.
			$minutes = floor( $seconds / 60 );

			// And output our minutes, plural.
			$string_output .= $minutes . ' minutes';

		}

		if ( 0 !== $seconds % 60 ) {
			$string_output .= ', ' . floor( $seconds % 60 ) . ' second';
			if ( 1 < floor( $seconds % 60 ) ) {
				$string_output .= 's';
			}
		}
	}

	return $string_output;
}
