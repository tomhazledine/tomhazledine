<?php
// [bartag foo="foo-value"]
function sidenote_shortcode( $atts, $content = null ) {

    print_pre($content);

    $output = '<span class="sidenote">';
        $output .= '<span class="visuallyhidden"> (</span>';
        $output .= WPCom_Markdown::get_instance()->transform( $content );
        $output .= '<span class="visuallyhidden">)</span>';
    $output .= '</span>';

    return $output;
}
add_shortcode( 'sidenote', 'sidenote_shortcode' );