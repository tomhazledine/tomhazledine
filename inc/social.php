<?php
/**
 * SOCIAL FUNCTIONS
 *
 * Sharing links for
 * social media.
 */

function tweet_this_link( $text, $link, $message ){

    // Parse the text for the Twitter URL.
    $tweet_text = str_replace( ' ', '+', $text );

    // User to be @-mentioned in tweet.
    $tweet_username = '@thomashazledine';

    // Full tweet link.
    $tweet_href = 'https://twitter.com/intent/tweet?source=webclient&amp;text=\'' . $tweet_text .  '\'+' . $link . '+' . $tweet_username;

    $full_twitter_link = '<a href="' . $tweet_href . '" class="tweet-this" target="_blank">' . $message . '</a>';

    print( $full_twitter_link );
}