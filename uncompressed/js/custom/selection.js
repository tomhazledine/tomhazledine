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

        var tweet_markup = build_tweet_markup(selection);

        // console.log(tweet_markup);

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
        tweet_widget.appendChild(tweet_markup);
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
        if (text.length > 0 && text != ' ') {

            var range = selection.getRangeAt(0);
            var range_bounding_rect = range.getBoundingClientRect();
            var calculated_to_position = document.body.scrollTop + range_bounding_rect.bottom;

            global_position['x'] = Math.round(calculated_to_position);
            global_position['y'] = Math.round(range_bounding_rect.left);
        }
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }

    // Turn selection into "tweet" object.
    if (text){
        var tweet = build_tweet_content(text);
    } else {
        var tweet = false;
    }
    
    return tweet;
}

/**
 * --------------------------------
 * BUILD TWEET URL AND CONTENT
 * 
 * Trim the text to the appropriate
 * length, then parse the text into
 * tweet-friendly format, and add a
 * page-link and my username.
 * --------------------------------
 */
function build_tweet_content(text){
    var result = {};
    var username = '@thomashazledine';
    var link = window.location.href;
    var max_length = 139;
    var username_length = username.length;
    var max_tweet_length = max_length - (username_length + 1) - (link.length + 1);// "1" accounts for space before username.

    var trimmed_text = text.substring( 0, (max_tweet_length - 3) );
    trimmed_text = trimmed_text + '…';
    var parsed_text = trimmed_text.replace(/ /gi,'+');

    // Full tweet link.
    var tweet_href = 'https://twitter.com/intent/tweet?source=webclient&amp;text=' + parsed_text +  '+' + link + '+' + username;

    result.text = trimmed_text;
    result.url = tweet_href;
    return result;
}

function build_tweet_markup(tweet_object){
    // var string = '';
    console.log(tweet_object.text);
    
    var link_element = document.createElement('a');
    var link_text = document.createTextNode(tweet_object.text);

    link_element.className = 'tweet_widget_link';
    link_element.setAttribute('href', tweet_object.url);
    link_element.appendChild(link_text);

    return link_element;
}