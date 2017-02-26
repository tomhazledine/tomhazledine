var intro_note_link = document.getElementsByClassName( 'intro-note-link' );

for (var i = intro_note_link.length - 1; i >= 0; i--) {
    intro_note_link[i].addEventListener( 'click', track_intro_note_click );
}

function track_intro_note_click(e) {
    e.preventDefault();
    var target_url = e.target.href;
    ga('send', 'event', 'Intro Note Link', 'click', target_url);
    window.location = target_url;
}