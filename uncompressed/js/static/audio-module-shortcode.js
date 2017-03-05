console.log('audio shortcode scripts loaded!');

var audio_module_synth = Sounds_API();

var keys = document.getElementsByClassName('audio-module-key');

// SETUP EVENT LISTENERS
for (var i = 0; i < keys.length; i++) {
    keys[i].addEventListener('mousedown',noteStart,false);
    // keys[i].addEventListener('mouseover',_noteMouseover,false);
    // keys[i].addEventListener('mouseout',_noteMouseout,false);
    keys[i].addEventListener('mouseup',noteEnd,false);
};

function noteStart(){
    var noteValue = this.getAttribute('data-pitch');
    audio_module_synth.noteStart( noteValue );
}
function noteEnd(){
    audio_module_synth.noteEnd();
}