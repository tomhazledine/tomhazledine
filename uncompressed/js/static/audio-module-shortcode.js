console.log('audio shortcode scripts loaded!');

var audio_module_synth = Sounds_API({
    vco1wav: 'sawtooth'
});

var keys = document.getElementsByClassName('audio-module-key');

// SETUP EVENT LISTENERS
for (var i = 0; i < keys.length; i++) {
    keys[i].addEventListener('mousedown',noteStart,false);
    keys[i].addEventListener('mouseup',noteEnd,false);
};

function noteStart(){
    var noteValue = this.getAttribute('data-pitch');
    audio_module_synth.note_start( noteValue );
}
function noteEnd(){
    audio_module_synth.note_end();
}

var dry_output = audio_module_synth.aux_out();
var wet_output = audio_module_synth.master_out();

// Connect master to output
// master_gain.connect(context.destination);
// wet_output.signal.connect( wet_output.context.destination );

function volume_1_callback( volume ){
    var volume_wrapper = document.getElementById('volume-1-display-wrapper');
    var volume_display = document.getElementById('volume-1-display');
    
    var volume_wrapper_height = volume_wrapper.offsetHeight;
    // console.log(volume_wrapper_height);
    var display_height = map_range(volume,[0,255],[0,volume_wrapper_height]);
    // Limit to 0 decimal places
    display_height = display_height.toFixed();
    console.log('dry: ' + volume);
    volume_display.style.height = display_height + 'px';
}

function volume_2_callback( volume ){
    var volume_wrapper = document.getElementById('volume-2-display-wrapper');
    var volume_display = document.getElementById('volume-2-display');
    
    var volume_wrapper_height = volume_wrapper.offsetHeight;
    // console.log(volume_wrapper_height);
    var display_height = map_range(volume,[0,255],[0,volume_wrapper_height]);
    // Limit to 0 decimal places
    display_height = display_height.toFixed();
    console.log('wet: ' + volume);
    volume_display.style.height = display_height + 'px';
}

function map_range(value, srcRange, dstRange){
    // value is outside source range return
    if (value < srcRange[0] || value > srcRange[1]){
        return NaN; 
    }

    var srcMax = srcRange[1] - srcRange[0],
        dstMax = dstRange[1] - dstRange[0],
        adjValue = value - srcRange[0];

    return (adjValue * dstMax / srcMax) + dstRange[0];
}

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

// Apply delay.
var delay = delay( dry_output );
audio_module_synth.aux_in(delay);

audioAnalysis( wet_output.context, wet_output.signal, volume_1_callback);

var intermediate_gain = dry_output.context.createGain();
intermediate_gain.gain.value = .5;

wet_output.signal.connect( intermediate_gain );
// delay.connect( intermediate_gain );

intermediate_gain.connect( wet_output.context.destination );


audioAnalysis( wet_output.context, intermediate_gain, volume_2_callback);