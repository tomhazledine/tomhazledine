
// Initialise our audio module.
var audio_module_synth = Sounds_API({
    vco1wav: 'sawtooth'
});

/**
 * -----------------------
 * TRIGGER AUDIO
 *
 * Use the keys in the DOM
 * to trigger sounds from 
 * our audio module.
 * -----------------------
 */

// Get the key elements.
var keys = document.getElementsByClassName('audio-module-key');

// Setup event listeners.
for (var i = 0; i < keys.length; i++) {
    keys[i].addEventListener('mousedown',noteStart,false);
    keys[i].addEventListener('mouseup',noteEnd,false);
};

// Handle note start and end.
function noteStart(){
    var noteValue = this.getAttribute('data-pitch');
    audio_module_synth.note_start( noteValue );
}
function noteEnd(){
    audio_module_synth.note_end();
}

// Get the aux-in and aux-out connections for our module.
var dry_output = audio_module_synth.aux_out();
var wet_output = audio_module_synth.master_out();

// Apply delay.
var delay = delay( dry_output );
audio_module_synth.aux_in(delay);

/**
 * ------------------
 * INTERMEDIATE GAIN
 *
 * Create a gain node
 * to sit between the
 * wet_output and the
 * audio destination.
 * ------------------
 */
var intermediate_gain = dry_output.context.createGain();
intermediate_gain.gain.value = .5;
wet_output.signal.connect( intermediate_gain );

// Send the final signal to our audio-output.
intermediate_gain.connect( wet_output.context.destination );

// Set the intermediate gain node value with a slider.
var master_gain = document.getElementById('master_gain');
master_gain.addEventListener('change',_master_gain,false);
function _master_gain(){
    var sliderValue = this.value;
    intermediate_gain.gain.value = sliderValue;
};


/**
 * ---------------
 * AUDIO ANALYSIS
 *
 * Send our audio
 * output and the
 * context to our
 * analysis tools. 
 * ---------------
 */
audioAnalysis( wet_output.context, wet_output.signal, volume_1_callback);
audioAnalysis( wet_output.context, intermediate_gain, volume_2_callback);

/**
 * -----------------------------
 * DELAY FUNCTION
 *
 * Expects input to be an object
 * with `context` and `signal`.
 * -----------------------------
 */
function delay( input ) {
    var delay = input.context.createDelay();
    delay.delayTime.value = 0.2;
    var delay_feedback = input.context.createGain();
    delay_feedback.gain.value = 0.3;
    var delay_filter = input.context.createBiquadFilter();
    delay_filter.frequency.value = 2000;

    input.signal.connect(delay);
    delay.connect(delay_feedback);
    delay_feedback.connect(delay_filter);
    delay_filter.connect(delay);

    return delay;
}

var volume_1_last_peak = 0;

// Visualiser function for volume_1
function volume_1_callback( volume ){

    // Get the target elements (can these be turned into globals or params?).
    var volume_wrapper = document.getElementById( 'volume-1-display-wrapper' );
    var volume_display = document.getElementById( 'volume-1-display' );
    var volume_peak_display = document.getElementById( 'volume-1-peak' );

    // Get the max height of the display.
    var volume_wrapper_height = volume_wrapper.offsetHeight;
    // Get the max value that volume could possibly be.
    var max_input_value = Math.log( 255 );
    // Map the volume-scale to the display-scale.
    var display_height = map_range( volume, [ 0, max_input_value ], [ 0, volume_wrapper_height ] );
    // Limit to 0 decimal places
    display_height = display_height.toFixed();
    // Set the height of the display mask.
    volume_display.style.height = display_height + 'px';

    // Set the peak-monitor (decays to zero more slowly than standard volume display).
    // If the new volume is louder than our persistent value, show that.
    console.log( display_height + ' | ' + volume_1_last_peak );
    var peak_position = Math.min( display_height, volume_1_last_peak );
    // Set the peak-display position.
    volume_peak_display.style.top = peak_position + 'px';

    // Set the persistent value.
    var incremented_peak = Math.min( display_height * 1.00001, incremented_peak * 1.00001 );
    volume_1_last_peak = incremented_peak <= volume_wrapper_height ? incremented_peak : volume_wrapper_height ;
}

// Visualiser function for volume_2
function volume_2_callback( volume ){
    var volume_wrapper = document.getElementById('volume-2-display-wrapper');
    var volume_display = document.getElementById('volume-2-display');
    
    var volume_wrapper_height = volume_wrapper.offsetHeight;
    // console.log(volume_wrapper_height);
    var max_input_value = Math.log(255);
    var decibel_value = map_range(volume,[0,max_input_value],[0,96]);
    // console.log( decibel_value.toFixed( 2 ) + ' dBFS' );
    var display_height = map_range(decibel_value,[0,96],[0,volume_wrapper_height]);
    // Limit to 0 decimal places
    display_height = display_height.toFixed();
    // console.log('wet: ' + volume);
    volume_display.style.height = display_height + 'px';
}

var volume_wrapper = document.getElementById( 'volume-1-display-wrapper' );
draw_db_ticks( volume_wrapper );
var volume_wrapper = document.getElementById( 'volume-2-display-wrapper' );
draw_db_ticks( volume_wrapper );

function draw_db_ticks( target_element ){

    // Create a wrapper for our tick marks.
    var ticks = document.createElement( 'ul' );
    ticks.className = 'tick-marks';

    // Target element's height.
    var target_element_height = target_element.offsetHeight;
    var number_of_ticks = 10;
    var tick_distance = 255 / number_of_ticks;
    var max_input_value = Math.log(255);



    for (var i = 1; i < number_of_ticks; i++) {
        // Create elements for each tick.
        var tick = document.createElement( 'li' );
        tick.className = 'tick-mark';
        var tick_position = i * tick_distance;
        tick_position = Math.log( tick_position );
        // tick_position = map_range(tick_position,[0,max_input_value],[0,target_element_height]);
        var decibel_value = map_range(tick_position,[0,max_input_value],[0,96]);
        tick_position = map_range(decibel_value,[0,96],[0,target_element_height]);
        tick.style.bottom = tick_position + 'px';
        ticks.appendChild( tick );
    }

    // Add the ticks to our target.
    target_element.appendChild( ticks );
}

/**
 * --------------------
 * MAP RANGE
 *
 * Map a value from one
 * scale to another.
 * --------------------
 */
function map_range(value, srcRange, dstRange){
    // If value is outside source range, return.
    if (value < srcRange[0] || value > srcRange[1]){
        return NaN; 
    }

    var srcMax = srcRange[1] - srcRange[0],
        dstMax = dstRange[1] - dstRange[0],
        adjValue = value - srcRange[0];

    return (adjValue * dstMax / srcMax) + dstRange[0];
}