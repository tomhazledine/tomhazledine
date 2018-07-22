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
var global_position = { x: 0, y: 0 };

// We'll always want to use the same element as a wrapper
// for our widget. This is it.
var tweet_widget = document.getElementById('tweet-widget');
var tweet_widget_inner = document.getElementById('tweet-widget-inner');

/**
 * ---------------------
 * ON-SELECTION TRIGGER
 *
 * Initialise a function
 * whenever some text is
 * selected.
 * ---------------------
 */
function selection_handler(event) {
    // console.log(event.target);
    var click_target = event.target;
    var selectable_wrapper = document.getElementsByClassName('selectable-area');

    for (var i = selectable_wrapper.length - 1; i >= 0; i--) {
        var parent = selectable_wrapper[i];
        var is_child = check_relationship(parent, click_target);
    }

    // Only run the selection-code if the click
    // happens inside a `.selectable-area` element.
    if (is_child) {
        // Get the selected text
        var selection = get_selection();

        // If there is a selection & the selection
        // is more than 15 characters long...
        if (selection && selection.length > 15) {
            // Turn selection into "tweet" object.
            var tweet_object = build_tweet_content(selection);

            // Set the link for the widget.
            tweet_widget.setAttribute('href', tweet_object.url);

            // Make the widget visible.
            tweet_widget.style.display = 'block';

            // Set the position for the tweet widget (using the
            // global vars set by the get_selection function).
            tweet_widget.style.top = global_position.x + 'px';
            tweet_widget.style.left = global_position.y + 'px';
        } else {
            // Hide the widget if there's no content to display.
            tweet_widget.style.display = 'none';
        }
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
document.addEventListener('keyup', selection_handler, false);
document.addEventListener('mouseup', selection_handler, false);

/**
 * ---------------------
 * CHECK RELATIONSHIP
 *
 * Work out if element-1
 * is a descendant of
 * element-2.
 * ---------------------
 */
function check_relationship(parent, child) {
    var node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

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
function get_selection_position(event) {
    var position = {};
    if (event.clientX) {
        position.x = event.clientX;
        position.y = event.clientY;
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
function get_selection() {
    var text = false;
    if (window.getSelection) {
        var selection = window.getSelection();
        text = selection.toString();
        if (text.length > 0 && text != ' ') {
            var range = selection.getRangeAt(0);
            var range_bounding_rect = range.getBoundingClientRect();
            var calculated_to_position = document.body.scrollTop + range_bounding_rect.top;

            var center_point = (range_bounding_rect.left + range_bounding_rect.right) / 2;

            global_position.x = Math.round(calculated_to_position);
            global_position.y = Math.round(center_point);
        }
    } else if (document.selection && document.selection.type != 'Control') {
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
function build_tweet_content(text) {
    // NOTE: use %23 rather than # if adding a hashtag.

    // Setup an object to hold our results.
    var result = {};

    // Which twitter username do we want to mention in the tweet?
    var username = '@thomashazledine';

    // What's the page's URL?
    var link = window.location.href;

    // t.co URL-shortener length
    var tco_length = 22;

    // How many characters can we use in a tweet?
    var max_length = 140;

    // How many characters is our username?
    var username_length = username.length + 1; // "1" accounts for a space.

    // How many characters is the page URL?
    var link_length = link.length + 1; // "1" accounts for a space.

    // Calculate how many characters we have left over for text.
    var max_tweet_length = max_length - username_length - tco_length;

    // Crop our text to fit the remaining character-count.
    if (text.length > max_tweet_length) {
        var trimmed_text = text.substring(0, max_tweet_length - 3);
        // Remove start/end spaces.
        trimmed_text = trimmed_text.replace(/^\s+|\s+$/g, '');
        // Add an ellipsis if the text has been cropped.
        trimmed_text = trimmed_text + '…';
    } else {
        // Remove start/end spaces.
        var trimmed_text = text.replace(/^\s+|\s+$/g, '');
    }

    // Replace spaces with "+" (so the sharing-link works).
    var parsed_text = trimmed_text.replace(/ /gi, '+');

    // Build the full tweet link.
    var tweet_href =
        'https://twitter.com/intent/tweet?source=webclient&amp;text=' +
        parsed_text +
        '+' +
        link +
        '+' +
        username;

    // Save our results to our "results" object.
    result.url = tweet_href;

    return result;
}
