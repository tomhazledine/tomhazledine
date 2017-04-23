<?php

// Increment to invalidate all old cookies (increment in cookies.js too).
$cookie_validation = '1';

if ( !isset( $_COOKIE['newsletterprompt'] ) || $_COOKIE['newsletterprompt'] != $cookie_validation ) {
    $newsletter_cookie_is_set = false;
} else {
    $newsletter_cookie_is_set = true;
}

echo '<input type="hidden" name="newsletter-cookie" id="newsletter-cookie" value="' . $newsletter_cookie_is_set . '">';