<?php
/**
 * Template part for displaying snippets of posts.
 *
 * @package Tom_Hazledine_Theme
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <code>
    <?php
    the_date('M Y');
    // echo '';
    ?>
    </code>
    <a href="<?= esc_url( get_permalink() ); ?>" rel="bookmark"><?php the_title(); ?></a>

    <?php
    // Get reading time.
    $reading_time = reading_time( get_the_content() );
    $reading_time_string = parse_read_time( $reading_time );
    echo '<span class="readingTime"><em>Read time: ' . $reading_time_string . '</em></span>';
    ?>

</article><!-- #post-## -->
