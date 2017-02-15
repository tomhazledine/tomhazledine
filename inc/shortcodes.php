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

    $output = '<div class="svg-vs-png">
        <span class="visuallyhidden"><em>If you\'re reading this post through some kind of syndication feed (RSS, etc.) you may need to visit <a href="<?php the_permalink(); ?>">the original post</a> to view this image-demo correctly.</em></span>';
        
    $output .= sprintf(
        '<div class="one-x clearfix">
            <div class="item-label">
                <p>An .SVG and .PNG icon, side-by-side</p>
            </div>
            <div class="item-wrapper">
                <div class="item-mask">
                    <svg class="svg">
                        <use xlink:href="#code" />
                    </svg>
                </div>
            </div>
            <div class="item-wrapper">
                <div class="item-mask">
                    <img class="masked-image" src="%s/assets/images/code_128.png"/>
                </div>
            </div>
        </div>',
        get_template_directory_uri()
    );
        
    $output .= sprintf(
        '<div class="two-x clearfix">
            <div class="item-label">
                <p>The same files, increased to double-size</p>
            </div>
            <div class="item-wrapper">
                <div class="item-mask">
                    <svg class="svg">
                        <use xlink:href="#code" />
                    </svg>
                </div>
            </div>
            <div class="item-wrapper">
                <div class="item-mask">
                    <img class="masked-image" src="%s/assets/images/code_128.png"/>
                </div>
            </div>
        </div>',
        get_template_directory_uri()
    );
        
    $output .= sprintf(
        '<div class="ten-x clearfix">
            <div class="item-label">
                <p>...and to 10x the original size</p>
            </div>
            <div class="item-wrapper">
                <div class="item-mask">
                    <svg class="svg">
                        <use xlink:href="#code" />
                    </svg>
                </div>
            </div>
            <div class="item-wrapper">
                <div class="item-mask">
                    <img class="masked-image" src="%s/assets/images/code_128.png"/>
                </div>
            </div>
        </div>',
        get_template_directory_uri()
    );

    $output .= '</div>';

    return $output;
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
 *
 * use:
 * [image_block]
 * -----------------
 */
function image_block_shortcode( $atts ) {

    // Parse the width & height from the attributes.
    $width = !empty($atts['width']) ? $atts['width'] : '';
    $height = !empty($atts['height']) ? $atts['height'] : '';

    // Build the image url using slug from attributes.
    $image_url = get_template_directory_uri() . '/assets/images/' . $atts['image_slug'];

    // Display the image with width & height.
    $output = sprintf(
        '<img class="inline-image-block" src="%s" style="width:%s !important;height:%s !important;" width="%s" height="%s" alt="">',
        $image_url,
        $width,
        $height,
        $width,
        $height
    );

    return $output;
}
add_shortcode( 'image_block', 'image_block_shortcode' );

/**
 * --------------
 * SVG TRIO BLOCK
 *
 * Displays three
 * identical icons
 * side by side,
 * with differing
 * classes.
 *
 * use:
 * [svg_trio]
 * --------------
 */
function svg_trio_shortcode( $atts ) {

    // Parse the width & height from the attributes.
    $icon = !empty($atts['icon']) ? $atts['icon'] : 'twitter';
    $count = !empty($atts['count']) ? (int)$atts['count'] : 3;

    $output = '<ul class="example_svg_list">';
    for ( $i = 1; $i <= $count; $i++ ) { 
        $output .= sprintf(
            '<li><svg class="example_svg_%s"><use xlink:href="#%s"/></svg></li>',
            $i,
            $icon
        );
    }
    $output .= '</ul>';

    return $output;
}
add_shortcode( 'svg_trio', 'svg_trio_shortcode' );