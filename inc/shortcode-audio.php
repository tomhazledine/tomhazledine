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

    // Setup audio-module JS:
    wp_enqueue_script( 'tomhazledine_audio-module-scripts', get_template_directory_uri() . '/assets/js/static/audio-module-shortcode.js', array( 'tomhazledine_theme-scripts' ), null, true );

    $output = '';

    // Close main content div.
    $output .= '</div>';

    // Parse the width & height from the attributes.
    
    // Do we want to show a frequency graph, or an oscilloscope display?
    $type = !empty($atts['type']) ? $atts['type'] : 'frequency';
    
    $output .= '<div class="audio-module-container clearfix">';

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
            ['octave' => 4, 'pitch' => 261.63, 'note' => "C",  'type' => 'natural'],
            ['octave' => 4, 'pitch' => 277.18, 'note' => "C#", 'type' => 'accidental'],
            ['octave' => 4, 'pitch' => 293.66, 'note' => "D",  'type' => 'natural'],
            ['octave' => 4, 'pitch' => 311.13, 'note' => "D#", 'type' => 'accidental'],
            ['octave' => 4, 'pitch' => 329.63, 'note' => "E",  'type' => 'natural'],
            ['octave' => 4, 'pitch' => 349.23, 'note' => "F",  'type' => 'natural'],
            ['octave' => 4, 'pitch' => 369.99, 'note' => "F#", 'type' => 'accidental'],
            ['octave' => 4, 'pitch' => 392.00, 'note' => "G",  'type' => 'natural'],
            ['octave' => 4, 'pitch' => 415.30, 'note' => "G#", 'type' => 'accidental'],
            ['octave' => 4, 'pitch' => 440.00, 'note' => "A",  'type' => 'natural'],
            ['octave' => 4, 'pitch' => 466.16, 'note' => "A#", 'type' => 'accidental'],
            ['octave' => 4, 'pitch' => 493.88, 'note' => "B",  'type' => 'natural'],
            // Octave 5
            ['octave' => 5, 'pitch' => 523.25, 'note' => "C",  'type' => 'natural'],
            ['octave' => 5, 'pitch' => 554.37, 'note' => "C#", 'type' => 'accidental'],
            ['octave' => 5, 'pitch' => 587.33, 'note' => "D",  'type' => 'natural'],
            ['octave' => 5, 'pitch' => 622.25, 'note' => "D#", 'type' => 'accidental'],
            ['octave' => 5, 'pitch' => 659.26, 'note' => "E",  'type' => 'natural'],
            ['octave' => 5, 'pitch' => 698.46, 'note' => "F",  'type' => 'natural'],
            ['octave' => 5, 'pitch' => 739.99, 'note' => "F#", 'type' => 'accidental'],
            ['octave' => 5, 'pitch' => 783.99, 'note' => "G",  'type' => 'natural'],
            ['octave' => 5, 'pitch' => 830.61, 'note' => "G#", 'type' => 'accidental'],
            ['octave' => 5, 'pitch' => 880.00, 'note' => "A",  'type' => 'natural'],
            ['octave' => 5, 'pitch' => 932.33, 'note' => "A#", 'type' => 'accidental'],
            ['octave' => 5, 'pitch' => 987.77, 'note' => "B",  'type' => 'natural'],
        ];

        $keyboard = '<ul class="audio-module-keyboard clearfix">';

        foreach ($pitches as $pitch) {
            $keyboard .= '<li class="audio-module-key ' . $pitch['type'] . ' octave-' . $pitch['octave'] . '" data-pitch="' . $pitch['pitch'] . '">';
            $keyboard .= '<span class="visuallyhidden">' . $pitch['note'] . '</span>';
            $keyboard .= '</li>';
        }

        $keyboard .= '</ul>';

        $output .= $keyboard;

        $volume_1_display = '
            <div id="volume-1-section" class="volume-section">
                <div id="volume-1-display-wrapper" class="volume-display-wrapper">
                    <div id="volume-1-display" class="volume-display"></div>
                    <div id="volume-1-peak" class="volume-peak"></div>
                </div>
                <span class="volume-label max">0dB</span>
                <span class="volume-label min">-96dB</span>
            </div>';
        $volume_2_display = '
            <div id="volume-2-section" class="volume-section">
                <div id="volume-2-display-wrapper" class="volume-display-wrapper">
                    <div id="volume-2-display" class="volume-display"></div>
                    <div id="volume-2-peak" class="volume-peak"></div>
                </div>
                <span class="volume-label max">0dB</span>
                <span class="volume-label min">-96dB</span>
            </div>';

        $output .= '<div class="volume-sections clearfix">';
            $output .= $volume_1_display;

            $output .= '<div class="controlStrip clearfix">
                    <span class="controlStrip-label">Gain</span>
                    <div class="controlStripInner">
                        <input class="pianoController master_gain" id="master_gain" data-controlName="master_gain" type="range" min="0" max="1" value="0.8" step="0.01">
                    </div>
                </div>';

            $output .= $volume_2_display;
        $output .= '</div>';
    $output .= '</div>';

    // Re-open main content.
    $output .= '<div class="selectable-area">';

    return $output;
}
add_shortcode( 'audio_module', 'audio_module_shortcode' );