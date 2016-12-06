<?php

// Featured Image Support
if ( function_exists( 'add_theme_support' ) ) { 
    add_theme_support( 'post-thumbnails' );
    add_image_size( 'thumbnail', 150, 100, true );
    add_image_size( 'medium', 400, '', true );
}