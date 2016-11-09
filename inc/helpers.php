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

	// How many minutes?
	$minute_count = floor( $seconds / 60 );
	$minute_count = convert_number_to_words( $minute_count );

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
	} else {
		$string_output .= 'something like ' . $minute_count . ' minutes.';
	}

	return $string_output;
}

/**
 * -------------------
 * DISPLAY NUMBERS
 * 
 * Convert numbers
 * into human-readable
 * words.
 *
 * Borrowed from:
 * http://www.karlrixon.co.uk/writing/convert-numbers-to-words-with-php/
 * -------------------
 */
function convert_number_to_words($number) {
    
    $hyphen      = '-';
    $conjunction = ' and ';
    $separator   = ', ';
    $negative    = 'negative ';
    $decimal     = ' point ';
    $dictionary  = array(
        0                   => 'zero',
        1                   => 'one',
        2                   => 'two',
        3                   => 'three',
        4                   => 'four',
        5                   => 'five',
        6                   => 'six',
        7                   => 'seven',
        8                   => 'eight',
        9                   => 'nine',
        10                  => 'ten',
        11                  => 'eleven',
        12                  => 'twelve',
        13                  => 'thirteen',
        14                  => 'fourteen',
        15                  => 'fifteen',
        16                  => 'sixteen',
        17                  => 'seventeen',
        18                  => 'eighteen',
        19                  => 'nineteen',
        20                  => 'twenty',
        30                  => 'thirty',
        40                  => 'fourty',
        50                  => 'fifty',
        60                  => 'sixty',
        70                  => 'seventy',
        80                  => 'eighty',
        90                  => 'ninety',
        100                 => 'hundred',
        1000                => 'thousand',
        1000000             => 'million',
        1000000000          => 'billion',
        1000000000000       => 'trillion',
        1000000000000000    => 'quadrillion',
        1000000000000000000 => 'quintillion'
    );
    
    if (!is_numeric($number)) {
        return false;
    }
    
    if (($number >= 0 && (int) $number < 0) || (int) $number < 0 - PHP_INT_MAX) {
        // overflow
        trigger_error(
            'convert_number_to_words only accepts numbers between -' . PHP_INT_MAX . ' and ' . PHP_INT_MAX,
            E_USER_WARNING
        );
        return false;
    }

    if ($number < 0) {
        return $negative . convert_number_to_words(abs($number));
    }
    
    $string = $fraction = null;
    
    if (strpos($number, '.') !== false) {
        list($number, $fraction) = explode('.', $number);
    }
    
    switch (true) {
        case $number < 21:
            $string = $dictionary[$number];
            break;
        case $number < 100:
            $tens   = ((int) ($number / 10)) * 10;
            $units  = $number % 10;
            $string = $dictionary[$tens];
            if ($units) {
                $string .= $hyphen . $dictionary[$units];
            }
            break;
        case $number < 1000:
            $hundreds  = $number / 100;
            $remainder = $number % 100;
            $string = $dictionary[$hundreds] . ' ' . $dictionary[100];
            if ($remainder) {
                $string .= $conjunction . convert_number_to_words($remainder);
            }
            break;
        default:
            $baseUnit = pow(1000, floor(log($number, 1000)));
            $numBaseUnits = (int) ($number / $baseUnit);
            $remainder = $number % $baseUnit;
            $string = convert_number_to_words($numBaseUnits) . ' ' . $dictionary[$baseUnit];
            if ($remainder) {
                $string .= $remainder < 100 ? $conjunction : $separator;
                $string .= convert_number_to_words($remainder);
            }
            break;
    }
    
    if (null !== $fraction && is_numeric($fraction)) {
        $string .= $decimal;
        $words = array();
        foreach (str_split((string) $fraction) as $number) {
            $words[] = $dictionary[$number];
        }
        $string .= implode(' ', $words);
    }
    
    return $string;
}
