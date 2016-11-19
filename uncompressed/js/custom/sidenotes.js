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


// First things first, let's get all the footnotes
// on the page. We'll need to pair the in-text links
// (we'll need them when we want to position the
// sidenotes) with the footnotes.
var footnotes = document.getElementsByClassName('footnotes')[0].getElementsByTagName("li");

// Create an array to store our sidenotes info.
var sidenotes = [];

// Loop through the footnotes and get their IDs
// (which we can use to find the in-text links)
// and their content.
for (var i = 0; i < footnotes.length; i++) {
    var new_item = [];
    new_item['link_id'] = footnotes[i].id;
    new_item['content'] = footnotes[i].innerHTML;

    new_item['content'] = new_item['content'].replace(/<a\b[^>]*>↩<\/a>/i,'');

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
    sidenote_markup.innerHTML = '<span class="visuallyhidden"> (</span>' + sidenote_content + '<span class="visuallyhidden"> (</span>';

    // Swap the link with the new markup.
    var sidenote_link_parent = sidenote_link[0].parentNode;
    sidenote_link_parent.parentNode.replaceChild(sidenote_markup, sidenote_link_parent);
}