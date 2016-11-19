/**
 * FOOTNOTES TO SIDENOTES
 * 
 * Turn the footnotes-markup (outputed by Jetpack)
 * into the markup needed for sidenotes. The reason
 * for doing this is to preserve the accessibility
 * of our posts (the footnotes markup works fine
 * without any CSS or JS, and shows up as-expected
 * in RSS feeds) but allow the full site to have
 * elegant footnotes.
 */

// Get the size of our window
var window_width = window.innerWidth;

// Only convert footnotes into sidenotes if we have
// enough space.
if (window_width > 750) {
    convert_footnotes_to_sidenotes();
}

function convert_footnotes_to_sidenotes() {
    // First things first, let's get all the footnotes
    // on the page. We'll need to pair the in-text links
    // (we'll need them when we want to position the
    // sidenotes) with the footnotes.
    var footnotes_wrapper = document.getElementsByClassName('footnotes');

    // Only try to create our sidenotes if we actually
    // have some footnotes...
    if (footnotes_wrapper.length) {
        var footnotes = footnotes_wrapper[0].getElementsByTagName("li");

        // Create an array to store our sidenotes info.
        var sidenotes = [];

        // Loop through the footnotes and get their IDs
        // (which we can use to find the in-text links)
        // and their content.
        for (var i = 0; i < footnotes.length; i++) {
            var new_item = [];
            new_item['link_id'] = footnotes[i].id;
            new_item['content'] = footnotes[i].innerHTML;

            // Remove the "back" link.
            new_item['content'] = new_item['content'].replace(/(&nbsp;)<a\b[^>]*>↩<\/a>/i,'');

            // Strip any start/end spaces.
            new_item['content'] = new_item['content'].trim();

            // Add the info for this sidenote
            // to our sidenotes array.
            sidenotes.push(new_item);
        }

        // Loop through the sidenotes. Build the sidenote
        // markup, then swap it with the link markup.
        for (var i = 0; i < sidenotes.length; i++) {
            var sidenote_content = sidenotes[i]['content'];
            var sidenote_link_id = sidenotes[i]['link_id'];

            // // Get the link element.
            var sidenote_link = document.querySelectorAll("a[href='#" + sidenote_link_id + "']");

            // Create a new element to hold our sidenote.
            var sidenote_markup = document.createElement("span");
            // Give it a class.
            sidenote_markup.className = 'sidenote';
            // Add the content.
            sidenote_markup.innerHTML = '<span class="sidenote-bracket"> (</span>' + sidenote_content + '<span class="sidenote-bracket">)</span>';

            // Swap the link with the new markup.
            var sidenote_link_parent = sidenote_link[0].parentNode;
            sidenote_link_parent.parentNode.replaceChild(sidenote_markup, sidenote_link_parent);
        }

        // Now we've added our sidenotes, we can remove the footnotes.
        footnotes_wrapper[0].parentNode.removeChild(footnotes_wrapper[0]);

        // Add has_sidenotes class to entry-content.
        var entry_content_wrapper = document.getElementsByClassName('entry-content');
        entry_content_wrapper[0].className += " has-sidenotes";

    }
}