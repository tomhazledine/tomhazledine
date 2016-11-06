<?php
/**
 * Template part for displaying snippets of posts.
 *
 * @package Tom_Hazledine_Theme
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header class="entry-header">
        <?php
        the_title( '<h3 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h3>' );

        if ( 'post' === get_post_type() ) : ?>
        <div class="entry-meta">
            <?php //tomhazledine_theme_posted_on(); ?>
        </div><!-- .entry-meta -->
        <?php
        endif; ?>
    </header><!-- .entry-header -->

    <div class="entry-content">

        <?php
        // Get reading time.
        // $reading_time = reading_time( get_the_content() );
        // $reading_time_string = parse_read_time( $reading_time );
        // echo '<span class="readingTime">Read time: ' . $reading_time_string . '</span>';
        ?>
        
        <?php
            the_excerpt();
        ?>
    </div><!-- .entry-content -->

    <footer class="entry-footer">
        <?php //tomhazledine_theme_entry_footer(); ?>
    </footer><!-- .entry-footer -->
</article><!-- #post-## -->
