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
// [svg_vs_png]
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

    <div class="clearfix">
        <div class="half">
            <img src="<?= get_template_directory_uri(); ?>/assets/images/svg_demo_1.svg" width="100px" height="100px" alt="">
        </div>
        <div class="half right">
            <img src="<?= get_template_directory_uri(); ?>/assets/images/svg_demo_2.svg" width="100px" height="100px" alt="">
        </div>
    </div>
    <?php

    // return $output;
}
add_shortcode( 'svg_vs_png', 'svg_vs_png_shortcode' );

/**
 * -----------------
 * IMAGE BLOCK
 *
 * Display an image
 * without using the
 * default WP image
 * size rules.
 * -----------------
 */
// [image_block]
function image_block_shortcode( $atts ) {

    // Parse the width & height from the attributes.
    $width = !empty($atts['width']) ? $atts['width'] : '';
    $height = !empty($atts['height']) ? $atts['height'] : '';

    // Build the image url using slug from attributes.
    $image_url = get_template_directory_uri() . '/assets/images/' . $atts['image_slug'];

    // Display the image with width & height.
    printf(
        '<img class="inline-image-block" src="%s" style="width:%s !important;height:%s !important;" width="%s" height="%s" alt="">',
        $image_url,
        $width,
        $height,
        $width,
        $height
    );
}
add_shortcode( 'image_block', 'image_block_shortcode' );