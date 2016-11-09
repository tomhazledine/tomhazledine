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

	/**
	 * Add new human-readable output here.
	 */
	
	// String to store our output.
	$string_output = '';

	// Double-check we're using an integer.
	$seconds = (int) $seconds;

	// How many minutes?
	$minute_count = floor( $seconds / 60 );

	// Do we need an 's' on the end of 'minute'?
	$minute_plural = $minute_count > 1 ? 's' : '';

	// How many seconds?
	$minute_remainder = $seconds % 60;

	/**
	 * Specific responses for a range
	 * of times up to two minutes:
	 */
	if ( $seconds < 30 ) {

		$string_output .= 'hardly any time at all.';

	} elseif  ( $seconds < 50 ) {
		
		$string_output .= 'less than a minute.';

	} elseif  ( $seconds < 55 ) {
		
		$string_output .= 'nearly a minute.';

	} elseif  ( $seconds < 65 ) {
		
		$string_output .= 'one minute dead.';

	} elseif  ( $seconds < 85 ) {
		
		$string_output .= 'a minute and a bit.';

	} elseif  ( $seconds < 95 ) {
		
		$string_output .= 'roughly a minute and a half.';

	} elseif  ( $seconds < 120 ) {
		
		$string_output .= 'less than two minutes.';

	/**
	 * Dynamic responses for a variety
	 * of times over two minutes:
	 */
	} elseif ( $minute_remainder < 2 || $minute_remainder > 58 ) {

		// If we're within +/- 2 seconds of a minute:
		$string_output .= $minute_count . ' minutes, on the nose.';

	} elseif ( $minute_remainder > 50 ) {

		// If we're within less than 10 seconds short of any minute:
		$string_output .= 'just shy of ' . $minute_count . ' minutes.';

	} elseif ( $minute_remainder < 10 ) {

		// If we're within less than 10 seconds over any minute:
		$string_output .= 'a little over ' . $minute_count . ' minutes.';

	} elseif ( $minute_remainder < 15 || $minute_remainder > 45 ) {

		// If we're within +/- 15 seconds of any minute:
		$string_output .= 'about ' . $minute_count . ' minutes.';

	} elseif ( $minute_remainder > 20 && $minute_remainder < 40 ) {

		// If we're within +/- 10 seconds of any half-minute:
		$string_output .= $minute_count . ' and a half minutes.';

	} elseif ( $minute_remainder < 10 || $minute_remainder > 50 ) {
		$string_output .= $minute_count . ' minutes (ish).';
	}

	return $string_output;
}
