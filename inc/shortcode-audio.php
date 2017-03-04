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

    $output = '';

    // Close main content div.
    $output .= '</div>';

    // Parse the width & height from the attributes.
    
    // Do we want to show a frequency graph, or an oscilloscope display?
    $type = !empty($atts['type']) ? $atts['type'] : 'frequency';

    $output .= 'testing audio module';
    $output .= ' | mode = ' . $type;

    // Draw
    //  - visualizer wrapper
    //  - keyboard [with data-attr for pitch, set by $atts if available]
    //  - volume
    //  - player controls (if wanted): play/pause | loop
    //  - wave type selectors
    // Load JS
    //  - wave type
    //  - key pitches
    //  - frequency scope?
    //  - volume
    
    $pitches = [
        // Octave 4
        ['pitch' => 261.63, 'note' => "C",  'type' => 'natural'],
        ['pitch' => 277.18, 'note' => "C#", 'type' => 'accidental'],
        ['pitch' => 293.66, 'note' => "D",  'type' => 'natural'],
        ['pitch' => 311.13, 'note' => "D#", 'type' => 'accidental'],
        ['pitch' => 329.63, 'note' => "E",  'type' => 'natural'],
        ['pitch' => 349.23, 'note' => "F",  'type' => 'natural'],
        ['pitch' => 369.99, 'note' => "F#", 'type' => 'accidental'],
        ['pitch' => 392.00, 'note' => "G",  'type' => 'natural'],
        ['pitch' => 415.30, 'note' => "G#", 'type' => 'accidental'],
        ['pitch' => 440.00, 'note' => "A",  'type' => 'natural'],
        ['pitch' => 466.16, 'note' => "A#", 'type' => 'accidental'],
        ['pitch' => 493.88, 'note' => "B",  'type' => 'natural'],
        // Octave 5
        ['pitch' => 523.25, 'note' => "C",  'type' => 'natural'],
        ['pitch' => 554.37, 'note' => "C#", 'type' => 'accidental'],
        ['pitch' => 587.33, 'note' => "D",  'type' => 'natural'],
        ['pitch' => 622.25, 'note' => "D#", 'type' => 'accidental'],
        ['pitch' => 659.26, 'note' => "E",  'type' => 'natural'],
        ['pitch' => 698.46, 'note' => "F",  'type' => 'natural'],
        ['pitch' => 739.99, 'note' => "F#", 'type' => 'accidental'],
        ['pitch' => 783.99, 'note' => "G",  'type' => 'natural'],
        ['pitch' => 830.61, 'note' => "G#", 'type' => 'accidental'],
        ['pitch' => 880.00, 'note' => "A",  'type' => 'natural'],
        ['pitch' => 932.33, 'note' => "A#", 'type' => 'accidental'],
        ['pitch' => 987.77, 'note' => "B",  'type' => 'natural'],
    ];

    $keyboard = '<ul class="audio-module-keyboard clearfix">';

    foreach ($pitches as $pitch) {
        $keyboard .= '<li class="audio-module-key ' . $pitch['type'] . '" data-pitch="' . $pitch['pitch'] . '">';
        $keyboard .= '<span class="visuallyhidden">' . $pitch['note'] . '</span>';
        $keyboard .= '</li>';
    }

    $keyboard .= '</ul>';

    $output .= $keyboard;

    // Re-open main content.
    $output .= '<div class="selectable-area">';

    return $output;
}
add_shortcode( 'audio_module', 'audio_module_shortcode' );