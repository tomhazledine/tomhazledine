import SoundsAPI from './custom-modules/SoundsAPI';
import audioAnalysis from './custom-modules/AudioAnalysis';

// Initialise our audio module.
var audio_module_synth = SoundsAPI({
    vco1wav: 'sawtooth'
});

Sounds_API_Triggers(audio_module_synth);

/**
 * ---------------------------------------------------
 * MegaSuperSynthInputs
 *
 * handles event- and data-input for MegaSuperSynth.
 *
 * @param {element} controls Wrapper ID for controls
 * @param {element} keys     Wrapper ID for piano keys
 * ---------------------------------------------------
 */
function Sounds_API_Triggers(sounds_api, options) {
    /**
     * -----------------------
     * PARSE OPTIONS
     *
     * Make sure we have valid
     * options. If we don't we
     * should provide sensible
     * fallbacks.
     * -----------------------
     */
    options = typeof options !== 'undefined' ? options : {};

    // Get the key elements.
    var keys = document.getElementsByClassName('audio-module-key');

    // var // Note Inputs (the keyboard)
    //     synthKeys = keys.getElementsByClassName('synthKey');

    // var // Controller Inputs
    //     masterVolumeSlider = controls.getElementsByClassName('masterVolume'),
    //     oscOneVolumeSlider = controls.getElementsByClassName('oscOneVolume'),
    //     oscTwoVolumeSlider = controls.getElementsByClassName('oscTwoVolume'),
    //     oscOneWaveSlider = controls.getElementsByClassName('oscOneWave'),
    //     oscTwoWaveSlider = controls.getElementsByClassName('oscTwoWave'),
    //     oscTwoPitchSlider = controls.getElementsByClassName('oscTwoPitch');

    var // Utility Variables
        keyIsDown = false,
        keysDown = [];

    var // Map keys as array
    keyToKey = {
        65: '261.63', //'Cl',
        87: '277.18', //'C#l',
        83: '293.66', //'Dl',
        69: '311.13', //'D#l',
        68: '329.63', //'El',
        70: '349.23', //'Fl',
        84: '369.99', //'F#l',
        71: '392.00', //'Gl',
        89: '415.30', //'G#l',
        72: '440.00', //'Al',
        85: '466.16', //'A#l',
        74: '493.88', //'Bl',
        75: '523.25', //'Cu',
        79: '554.37', //'C#u',
        76: '587.33', //'Du',
        80: '622.25', //'D#u',
        186: '659.26', //'Eu',
        222: '698.46', //'Fu',
        221: '739.99', //'F#u',
        220: '783.99' //'Gu',
        // 13: '830.61'//'G#u'
    };

    /**
     * ---------------------
     * SETUP EVENT LISTENERS
     * ---------------------
     */
    for (var i = 0; i < keys.length; i++) {
        keys[i].addEventListener('mousedown', _notePress, false);
        keys[i].addEventListener('mouseover', _noteMouseover, false);
        keys[i].addEventListener('mouseout', _noteMouseout, false);
        keys[i].addEventListener('mouseup', _noteMouseup, false);

        keys[i].addEventListener('touchstart', _notePress, false);
        keys[i].addEventListener('touchmove', _noteMouseover, false);
        // keys[i].addEventListener('touchout',_noteMouseout,false);
        keys[i].addEventListener('touchend', _noteMouseup, false);
    }
    // document.addEventListener('keydown',_noteKeydown,false);
    // document.addEventListener('keyup',_noteKeyup,false);
    // masterVolumeSlider[0].addEventListener('change',_controlPress,false);
    // oscOneVolumeSlider[0].addEventListener('change',_controlPress,false);
    // oscTwoVolumeSlider[0].addEventListener('change',_controlPress,false);
    // oscOneWaveSlider[0].addEventListener('change',_controlPress,false);
    // oscTwoWaveSlider[0].addEventListener('change',_controlPress,false);
    // oscTwoPitchSlider[0].addEventListener('change',_controlPress,false);

    /**
     * ----------------------------
     * HANDLE LISTENER ROUTING
     *
     * Different types of event
     * trigger the same end-results
     * but require different paths
     * (e.g. mousedown and
     * mouseover)
     * ----------------------------
     */

    function _notePress() {
        keyIsDown = true;
        var noteValue = this.getAttribute('data-pitch');
        sounds_api.note_start(noteValue);
        noQuery.addClass(this, 'playing');
    }

    function _noteMouseover() {
        if (keyIsDown) {
            var noteValue = this.getAttribute('data-pitch');
            sounds_api.note_start(noteValue);
            noQuery.addClass(this, 'playing');
        }
    }

    function _noteMouseout() {
        if (keyIsDown) {
            var noteValue = this.getAttribute('data-pitch');
            sounds_api.note_end();
            noQuery.removeClass(this, 'playing');
        }
    }

    function _noteMouseup() {
        keyIsDown = false;
        var noteValue = this.getAttribute('data-pitch');
        sounds_api.note_end();
        noQuery.removeClass(this, 'playing');
    }

    // /**
    //  * ---------------------
    //  * CONTROLLER ROUTING
    //  *
    //  * Sends controller data
    //  * to controller
    //  * ---------------------
    //  */
    // function _controlPress(){
    //     var sliderValue = this.value;
    //     var sliderName = this.getAttribute('data-controlName');
    //     newSynth.controlChanged(sliderName,sliderValue);
    //     sliderChange(sliderName,sliderValue);
    // }

    // /**
    //  * ---------------
    //  * CONTROL DISPLAY
    //  *
    //  * Show live value
    //  * for the control
    //  * sliders.
    //  * ---------------
    //  */
    // function sliderChange(name,value){
    //     var targetClass = "controlLabel_" + name;
    //     var target = document.getElementsByClassName(targetClass);
    //     var outputValue;

    //     switch (name) {
    //         case 'masterVolume':
    //             outputValue = value * 10;
    //             break;
    //         case 'oscOneVolume':
    //             outputValue = value * 10;
    //             break;
    //         case 'oscTwoVolume':
    //             outputValue = value * 10;
    //             break;
    //         case 'oscOneWave':
    //             outputValue = newSynth.handleWaveType(value);
    //             break;
    //         case 'oscTwoWave':
    //             outputValue = newSynth.handleWaveType(value);
    //             break;
    //         case 'oscTwoPitch':
    //             outputValue = 0 - value;
    //             console.log()
    //             break;
    //     }

    //     target[0].textContent = outputValue;
    // }

    /**
     * ------------
     * KEY BINDINGS
     * ------------
     */
    function _noteKeydown(key) {
        // If the key is already being held down, abort function.
        if (key.keyCode in keysDown) {
            key.preventDefault();
            return;
        }
        // Log the key in keysDown
        keysDown[key.keyCode] = true;
        if (typeof keyToKey[key.keyCode] !== 'undefined') {
            key.preventDefault();
            noteValue = keyToKey[key.keyCode];
            sounds_api.note_start(noteValue);
        }
    }

    function _noteKeyup(key) {
        delete keysDown[key.keyCode];
        if (typeof keyToKey[key.keyCode] !== 'undefined') {
            key.preventDefault();
            noteValue = keyToKey[key.keyCode];
            //console.log(noteValue);
            sounds_api.note_end();
        }
    }
}

/**
 * -----------------------
 * TRIGGER AUDIO
 *
 * Use the keys in the DOM
 * to trigger sounds from
 * our audio module.
 * -----------------------
 */

// // Get the key elements.
// var keys = document.getElementsByClassName('audio-module-key');

// // Setup event listeners.
// for (var i = 0; i < keys.length; i++) {
//     keys[i].addEventListener('mousedown',noteStart,false);
//     keys[i].addEventListener('mouseup',noteEnd,false);
// };

// // Handle note start and end.
// function noteStart(){
//     var noteValue = this.getAttribute('data-pitch');
//     audio_module_synth.note_start( noteValue );
// }
// function noteEnd(){
//     audio_module_synth.note_end();
// }

// Get the aux-in and aux-out connections for our module.
var dry_output = audio_module_synth.aux_out();
var wet_output = audio_module_synth.master_out();

// Apply delay.
var delay = delay(dry_output);
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
intermediate_gain.gain.value = 0.5;
wet_output.signal.connect(intermediate_gain);

// Send the final signal to our audio-output.
intermediate_gain.connect(wet_output.context.destination);

// Set the intermediate gain node value with a slider.
var master_gain = document.getElementById('master_gain');
master_gain.addEventListener('change', _master_gain, false);
function _master_gain() {
    var sliderValue = this.value;
    intermediate_gain.gain.value = sliderValue;
}

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
audioAnalysis(wet_output.context, wet_output.signal, volume_1_callback);
audioAnalysis(wet_output.context, intermediate_gain, volume_2_callback);

/**
 * -----------------------------
 * DELAY FUNCTION
 *
 * Expects input to be an object
 * with `context` and `signal`.
 * -----------------------------
 */
function delay(input) {
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
function volume_1_callback(volume) {
    // Get the target elements (can these be turned into globals or params?).
    var volume_wrapper = document.getElementById('volume-1-display-wrapper');
    var volume_display = document.getElementById('volume-1-display');
    var volume_peak_display = document.getElementById('volume-1-peak');

    // Get the max height of the display.
    var volume_wrapper_height = volume_wrapper.offsetHeight;
    // Get the max value that volume could possibly be.
    var max_input_value = Math.log(255);
    // Map the volume-scale to the display-scale.
    var display_height = map_range(volume, [0, max_input_value], [0, volume_wrapper_height]);
    // Limit to 0 decimal places
    display_height = display_height.toFixed();
    // Set the height of the display mask.
    volume_display.style.height = display_height + 'px';

    // Set the peak-monitor (decays to zero more slowly than standard volume display).
    // If the new volume is louder than our persistent value, show that.
    var peak_position = Math.min(display_height, volume_1_last_peak);

    // Set the peak-display position.
    volume_peak_display.style.top = peak_position + 'px';

    // Set the colour of the peak-marker based on the clipping level.
    // if (peak_position < ( volume_wrapper_height * 0.1 ) ) {
    //     // If the volume is in the top 10%, show red.
    //     volume_peak_display.style.borderColor = 'red';
    // } else if (peak_position < ( volume_wrapper_height * 0.2 ) ) {
    //     // If the volume is in the top 20%, show yellow.
    //     volume_peak_display.style.borderColor = 'yellow';
    // } else {
    //     // If the volume is in the less than 80%, show green.
    //     volume_peak_display.style.borderColor = 'green';
    // }

    // Set the persistent value.
    var incremented_peak = Math.min(display_height, volume_1_last_peak);
    volume_1_last_peak =
        incremented_peak <= volume_wrapper_height ? incremented_peak + 8 : volume_wrapper_height;
}

var volume_2_last_peak = 0;

// Visualiser function for volume_2
function volume_2_callback(volume) {
    // Get the target elements (can these be turned into globals or params?).
    var volume_wrapper = document.getElementById('volume-2-display-wrapper');
    var volume_display = document.getElementById('volume-2-display');
    var volume_peak_display = document.getElementById('volume-2-peak');

    // Get the max height of the display.
    var volume_wrapper_height = volume_wrapper.offsetHeight;
    // Get the max value that volume could possibly be.
    var max_input_value = Math.log(255);
    // Map the volume-scale to the display-scale.
    var display_height = map_range(volume, [0, max_input_value], [0, volume_wrapper_height]);
    // Limit to 0 decimal places
    display_height = display_height.toFixed();
    // Set the height of the display mask.
    volume_display.style.height = display_height + 'px';

    // Set the peak-monitor (decays to zero more slowly than standard volume display).
    // If the new volume is louder than our persistent value, show that.
    var peak_position = Math.min(display_height, volume_2_last_peak);

    // Set the peak-display position.
    volume_peak_display.style.top = peak_position + 'px';

    // Set the colour of the peak-marker based on the clipping level.
    // if (peak_position < ( volume_wrapper_height * 0.1 ) ) {
    //     // If the volume is in the top 10%, show red.
    //     volume_peak_display.style.borderColor = 'red';
    // } else if (peak_position < ( volume_wrapper_height * 0.2 ) ) {
    //     // If the volume is in the top 20%, show yellow.
    //     volume_peak_display.style.borderColor = 'yellow';
    // } else {
    //     // If the volume is in the less than 80%, show green.
    //     volume_peak_display.style.borderColor = 'green';
    // }

    // Set the persistent value.
    var incremented_peak = Math.min(display_height, volume_2_last_peak);
    volume_2_last_peak =
        incremented_peak <= volume_wrapper_height ? incremented_peak + 8 : volume_wrapper_height;
}

var volume_wrapper = document.getElementById('volume-1-display-wrapper');
draw_db_ticks(volume_wrapper);
var volume_wrapper = document.getElementById('volume-2-display-wrapper');
draw_db_ticks(volume_wrapper);

function draw_db_ticks(target_element) {
    // Create a wrapper for our tick marks.
    var ticks = document.createElement('ul');
    ticks.className = 'tick-marks';

    // Target element's height.
    var target_element_height = target_element.offsetHeight;
    var number_of_ticks = 10;
    var tick_distance = 255 / number_of_ticks;
    var max_input_value = Math.log(255);

    for (var i = 1; i < number_of_ticks; i++) {
        // Create elements for each tick.
        var tick = document.createElement('li');
        tick.className = 'tick-mark';
        var tick_position = i * tick_distance;
        tick_position = Math.log(tick_position);
        // tick_position = map_range(tick_position,[0,max_input_value],[0,target_element_height]);
        var decibel_value = map_range(tick_position, [0, max_input_value], [0, 96]);
        tick_position = map_range(decibel_value, [0, 96], [0, target_element_height]);
        tick.style.bottom = tick_position + 'px';
        ticks.appendChild(tick);
    }

    // Add the ticks to our target.
    target_element.appendChild(ticks);
}

/**
 * --------------------
 * MAP RANGE
 *
 * Map a value from one
 * scale to another.
 * --------------------
 */
function map_range(value, srcRange, dstRange) {
    // If value is outside source range, return.
    if (value < srcRange[0] || value > srcRange[1]) {
        return NaN;
    }

    var srcMax = srcRange[1] - srcRange[0],
        dstMax = dstRange[1] - dstRange[0],
        adjValue = value - srcRange[0];

    return adjValue * dstMax / srcMax + dstRange[0];
}
