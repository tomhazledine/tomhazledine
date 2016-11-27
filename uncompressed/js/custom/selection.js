
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

    // Get page URL.
    // Calculate remaining tweet length after URL and username have been added.
    // Trim selected text to available length (if needed).
    // Build tweet-link.
    // Build widget markup.
    // Position widget markup on page.

    if (selection) {
        console.log(selection);
        console.log(position);
    }


}

/**
 * ---------------------------
 * ON-SELECTION EVENT LISTENER
 *
 * There is no direct listener
 * for selection events, so we
 * need to check for events if
 * the mouse or a key has been
 * pressed.
 * ---------------------------
 */
document.addEventListener('keyup',selection_handler,false);
document.addEventListener('mouseup',selection_handler,false);

/**
 * ----------------------
 * GET SELECTION POSITION
 *
 * If trigger is a mouse-
 * event, then get the x/
 * y coordinates. If not,
 * return false.
 * ----------------------
 */
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

/**
 * ---------------------
 * GET SELECTED TEXT
 *
 * If some text has been 
 * selected, get it. If
 * not, return false.
 * ---------------------
 */
function get_selection(){
    var text = false;
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}