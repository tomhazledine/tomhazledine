<?php
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
 * DISPLAY NUMBERS
 * 
 * Convert numbers
 * into human-readable
 * words.
 *
 * Borrowed from:
 * http://www.karlrixon.co.uk/writing/convert-numbers-to-words-with-php/
 * 
 * @param  integer $number Raw number.
 * @return string         Number as a word.
 */
function convert_number_to_words($number) {
    
    $dictionary  = array(
        0   => 'zero',
        1   => 'one',
        2   => 'two',
        3   => 'three',
        4   => 'four',
        5   => 'five',
        6   => 'six',
        7   => 'seven',
        8   => 'eight',
        9   => 'nine',
        10  => 'ten',
        11  => 'eleven',
        12  => 'twelve',
        13  => 'thirteen',
        14  => 'fourteen',
        15  => 'fifteen',
        16  => 'sixteen',
        17  => 'seventeen',
        18  => 'eighteen',
        19  => 'nineteen',
        20  => 'twenty',
        30  => 'thirty',
        40  => 'fourty',
        50  => 'fifty',
        60  => 'sixty',
        70  => 'seventy',
        80  => 'eighty',
        90  => 'ninety',
        100 => 'hundred'
    );

    $string = $dictionary[$number];

    return $string;
}