<?php
/**
 * Template part for displaying results in search pages.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Tom_Hazledine_Theme
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class('search-result'); ?>>
    
    <code><?php the_date('M Y'); ?></code>
    
    <a href="<?= esc_url( get_permalink() ); ?>" rel="bookmark"><?php the_title(); ?></a>

    <?php
    // Get reading time.
    $reading_time = reading_time( get_the_content() );
    $reading_time_string = parse_read_time( $reading_time );
    echo '<span class="readingTime"><em>Read time: ' . $reading_time_string . '</em></span>';
    ?>

    <div class="entry-summary">
		<?php the_excerpt(); ?>
	</div>

</article>