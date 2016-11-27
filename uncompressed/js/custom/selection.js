/**
 * ---------------------
 * ON-SELECTION TRIGGER
 *
 * Initialise a function
 * whenever some text is
 * selected.
 * ---------------------
 */
function selection_handler(event){

    // Get the mouse position (if it was a mouse
    // event that triggered this function).
    var position = get_selection_position(event);

    // Get the selected text
    var selection = get_selection();

    if (selection) {
        console.log(selection);
        console.log(position);
    }


}

function get_selection_position(event){
    var position = [];
    if (event.clientX) {
        position['x'] = event.clientX;
        position['y'] = event.clientY;
    } else {
        position = false;
    }
    return position;
}

function get_selection(){
    var text = false;
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

var entry_content = document.getElementsByClassName('entry-content');

/**
 * ----------------
 * EVENT LISTENERS
 *
 * Trigger function
 * get_selection.
 * ----------------
 */

// Whenever any key has finished being pressed.
document.addEventListener('keyup',selection_handler,false);

// Whenever the mouse has finished being pressed
// inside an "entry-content" area.
for (var i = 0; i < entry_content.length; i++) {
    entry_content[i].addEventListener('mouseup',selection_handler,false);
}
