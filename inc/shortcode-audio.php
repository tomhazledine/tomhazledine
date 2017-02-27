<?php 
/**
 * --------------
 * INTERACTIVE AUDIO MODULE
 *
 * Builds an audio player with
 * mini-keyboard, visualization
 * display, & various options.
 *
 * use:
 * [audio_module]
 * --------------
 */
function audio_module_shortcode( $atts ) {

    // Parse the width & height from the attributes.
    
    // Do we want to show a frequency graph, or an oscilloscope display?
    $type = !empty($atts['type']) ? $atts['type'] : 'frequency';

    $output = 'testing audio module';

    return $output;
}
add_shortcode( 'audio_module', 'audio_module_shortcode' );