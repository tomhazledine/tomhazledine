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
    <div class="svg-vs-png">
        <span class="visuallyhidden"><em>If you're reading this post through some kind of syndication feed (RSS, etc.) you may need to visit <a href="<?php the_permalink(); ?>">the original post</a> to view this image-demo correctly.</em></span>
        <div class="one-x clearfix">
            <div class="item-wrapper">
                <div class="item-mask">
                    <svg class="svg">
                        <use xlink:href="#code" />
                    </svg>
                </div>
            </div>
            <div class="item-wrapper">
                <div class="item-mask">
                    <img class="masked-image" src="<?= get_template_directory_uri(); ?>/assets/images/code.png"/>
                </div>
            </div>
        </div>
        <div class="two-x clearfix">
            <div class="item-wrapper">
                <div class="item-mask">
                    <svg class="svg">
                        <use xlink:href="#code" />
                    </svg>
                </div>
            </div>
            <div class="item-wrapper">
                <div class="item-mask">
                    <img class="masked-image" src="<?= get_template_directory_uri(); ?>/assets/images/code.png"/>
                </div>
            </div>
        </div>
    </div>
    <?php

    // return $output;
}
add_shortcode( 'svg_vs_png', 'svg_vs_png_shortcode' );