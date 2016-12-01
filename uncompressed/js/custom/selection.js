/**
 * ----------------
 * GLOBAL VARIABLES
 *
 * We need to store
 * a couple of vars
 * for later. It is
 * gross, I know, &
 * will break if we
 * use strict-mode,
 * but it works...
 * ----------------
 */

// We sometimes want our selection-notifier position to
// persist, so we'll make a global variable for it.
var global_position = [x=0,y=0];

// We'll always want to use the same element as a wrapper
// for our widget. This is it.
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

    if (selection) {

        // Turn selection into "tweet" object.
        var tweet_object = build_tweet_content(selection);

        // Get the markup (dom element) for the widget.
        var tweet_markup = build_tweet_markup(tweet_object);
        
        // Make the widget visible.
        tweet_widget.style.display = 'block';

        // Set the position for the tweet widget (using the
        // global vars set by the get_selection function).
        tweet_widget.style.top = global_position['x'] + 'px';
        tweet_widget.style.left = global_position['y'] + 'px';

        // Remove old markup (otherwise we'll see any previous selections as well as our new one).

        // Add our new markup to the widget.
        tweet_widget.appendChild(tweet_markup);
        
    } else {

        // Hide the widget if there's no content to display.
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
function build_tweet_content(text){

    // Setup an object to hold our results.
    var result = {};

    // Which twitter username do we want to mention in the tweet?
    var username = '@thomashazledine';

    // What's the page's URL?
    var link = window.location.href;

    // How many characters can we use in a tweet?
    var max_length = 140;

    // How many characters is our username?
    var username_length = username.length + 1;// "1" accounts for a space.

    // How many characters is the page URL?
    var link_length = link.length + 1;// "1" accounts for a space.
    
    // Calculate how many characters we have left over for text.
    var max_tweet_length = max_length - username_length - link_length;

    // Crop our text to fit the remaining character-count.
    var trimmed_text = text.substring( 0, (max_tweet_length - 3) );
    trimmed_text = trimmed_text + '…';

    // Replace spaces with "+" (so the sharing-link works).
    var parsed_text = trimmed_text.replace(/ /gi,'+');

    // Build the full tweet link.
    var tweet_href = 'https://twitter.com/intent/tweet?source=webclient&amp;text=' + parsed_text +  '+' + link + '+' + username;

    // Save our results to our "results" object.
    result.text = trimmed_text;
    result.url = tweet_href;

    return result;
}

/**
 * ------------------
 * BUILD TWEET MARKUP
 *
 * Using the provided
 * text & url, create
 * a new dom-node for
 * our tweet-widget.
 * ------------------
 */
function build_tweet_markup(tweet_object){
    
    // Create a link element.
    var link_element = document.createElement('a');

    // Give our new link element a class.
    link_element.className = 'tweet_widget_link';
    
    // Set the text-content for the link.
    var link_text = document.createTextNode(tweet_object.text);
    link_element.appendChild(link_text);
    
    // Set the HREF for our link.
    link_element.setAttribute('href', tweet_object.url);

    return link_element;
}