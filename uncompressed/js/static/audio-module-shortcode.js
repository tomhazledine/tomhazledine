console.log('audio shortcode scripts loaded!');

var wave = Sounds_API.handleWaveType('1');
console.log(wave);

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
    Sounds_API.noteStart( noteValue );
}
function noteEnd(){
    var noteValue = this.getAttribute('data-pitch');
    Sounds_API.noteEnd(noteValue);
}