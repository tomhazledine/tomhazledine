// We sometimes want our selection-notifier position to
// persist, so we'll make a global variable for it.
var global_position = [x=0,y=0];

var tweet_widget = document.getElementById('tweet-widget');

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

    // Get the selected text
    var selection = get_selection();

    // Get page URL.
    // Calculate remaining tweet length after URL and username have been added.
    // Trim selected text to available length (if needed).
    // Build tweet-link.
    // Build widget markup.
    // Position widget markup on page.

    if (selection) {

        // Get the mouse position (if it was a mouse
        // event that triggered this function).
        // var position = get_selection_position(event);
        // console.log(global_position);
        // console.log(selection);
        // console.log(position);
        // console.log(tweet_widget.style);
        tweet_widget.style.display = 'block';
        tweet_widget.style.top = global_position['x'] + 'px';
        tweet_widget.style.left = global_position['y'] + 'px';
        // console.log(tweet_widget.style);
        
    } else {
        tweet_widget.style.display = 'none';
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
        global_position = position;
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
        var selection = window.getSelection();
        text = selection.toString();
        // console.log('getSelection');
        console.log(selection);
        var range = selection.getRangeAt(0);
        var range_bounding_rect = range.getBoundingClientRect();
        console.log(range_bounding_rect);
        global_position['x'] = range_bounding_rect.bottom;
        global_position['y'] = range_bounding_rect.left;
    } else if (document.selection && document.selection.type != "Control") {
        // console.log('document.selection');
        // console.log(document.selection);
        text = document.selection.createRange().text;
    }
    return text;
}