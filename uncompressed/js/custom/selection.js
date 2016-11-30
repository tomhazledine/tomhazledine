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
        if (text.length > 0 && text != ' ') {

            var tweet = build_tweet(text);
            console.log(text);

            // var tweet_url = build_tweet_url(text);

            console.log(tweet);

            var range = selection.getRangeAt(0);
            var range_bounding_rect = range.getBoundingClientRect();
            var calculated_to_position = document.body.scrollTop + range_bounding_rect.bottom;
            // console.log(range_bounding_rect);
            global_position['x'] = Math.round(calculated_to_position);
            global_position['y'] = Math.round(range_bounding_rect.left);
        }
    } else if (document.selection && document.selection.type != "Control") {
        // console.log('document.selection');
        // console.log(document.selection);
        text = document.selection.createRange().text;
    }
    return text;
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
function build_tweet(text){
    var result = {};
    var username = '@thomashazledine';
    var max_length = 139;
    var username_length = username.length;
    var max_tweet_length = max_length - username_length - 1;// "1" accounts for space before username.

    var trimmed_text = text.substring(0,max_tweet_length);

    result.parsed_text = trimmed_text.replace(/ /gi,'+');
    return result;
}


// // Parse the text for the Twitter URL.
//     $tweet_text = str_replace( ' ', '+', $text );

//     // User to be @-mentioned in tweet.
//     $tweet_username = '@thomashazledine';

//     // Full tweet link.
//     $tweet_href = 'https://twitter.com/intent/tweet?source=webclient&amp;text=' . $tweet_text .  '+' . $link . '+' . $tweet_username;

//     $full_twitter_link = '<a href="' . $tweet_href . '" class="tweet-this" target="_blank">' . $message . '</a>';

//     print( $full_twitter_link );
// }