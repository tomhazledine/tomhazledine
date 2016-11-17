<?php
// [bartag foo="foo-value"]
function sidenote_shortcode( $atts, $content = null ) {

    $output = '<span class="sidenote">';
    $output .= WPCom_Markdown::get_instance()->transform( $content );
    $output .= '</span>';

    return $output;
}
add_shortcode( 'sidenote', 'sidenote_shortcode' );