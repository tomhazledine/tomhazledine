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

audioAnalysis( wet_output.context, wet_output.signal, volume_callback);

function volume_callback( volume ){
    var volume_wrapper = document.getElementById('volume-display-wrapper');
    var volume_display = document.getElementById('volume-display');
    
    var volume_wrapper_height = volume_wrapper.offsetHeight;
    // console.log(volume_wrapper_height);
    var display_height = map_range(volume,[0,100],[0,volume_wrapper_height]);
    console.log(volume + ' | ' + display_height);
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

// console.log(dry_output);

// DELAY
var delay = dry_output.context.createDelay();
delay.delayTime.value = 0.2;
var delay_feedback = dry_output.context.createGain();
delay_feedback.gain.value = 0.3;
var delay_filter = dry_output.context.createBiquadFilter();
delay_filter.frequency.value = 2000;

dry_output.signal.connect(delay);
delay.connect(delay_feedback);
delay_feedback.connect(delay_filter);
delay_filter.connect(delay);

// With effects:
// vca.connect(distortion);
// distortion.connect(delay);
// delay.connect(master);
audio_module_synth.aux_in(delay);