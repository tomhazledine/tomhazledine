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
    audio_module_synth.noteStart( noteValue );
}
function noteEnd(){
    audio_module_synth.noteEnd();
}

var dry_output = audio_module_synth.aux_out();
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