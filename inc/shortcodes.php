<?php
// [bartag foo="foo-value"]
function sidenote_shortcode( $atts, $content = null ) {

    // print_pre($content);

    $output = '<span class="sidenote">';
        $output .= '<span class="visuallyhidden"> (</span>';
        $output .= WPCom_Markdown::get_instance()->transform( $content );
        $output .= '<span class="visuallyhidden">)</span>';
    $output .= '</span>';

    return $output;
}
add_shortcode( 'sidenote', 'sidenote_shortcode' );


/**
 * ---------------------
 * SVG vs PNG COMPARISON
 *
 * Display an .svg and a
 * .png side-by-side and
 * at different levels of
 * zoom (1x, 2x, & 1/2x)
 * ---------------------
 */
// [svg_vs_png foo="foo-value"]
function svg_vs_png_shortcode( $atts ) {

    // print_pre($content);
    ?>
    <div class="svg_vs_png">
        <div class="one_x">
            <svg class="svg">
                <use xlink:href="#code" />
            </svg>
            <img src="<?= get_template_directory_uri(); ?>/assets/images/code_128.png"/>
        </div>
        <div class="two_x">
            <svg class="svg">
                <use xlink:href="#code" />
            </svg>
            <img src="<?= get_template_directory_uri(); ?>/assets/images/code_128.png"/>
        </div>
    </div>
    <?php

    // return $output;
}
add_shortcode( 'svg_vs_png', 'svg_vs_png_shortcode' );