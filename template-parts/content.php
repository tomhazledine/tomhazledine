<?php
/**
 * Template part for displaying posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Tom_Hazledine_Theme
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">

		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>

		<div class="entry-meta">
			<?php
			the_date('M Y');
    		echo ' – ';
			
			// Get reading time.
			$reading_time = reading_time( get_the_content() );
			$reading_time_string = parse_read_time( $reading_time );
			echo '<span class="readingTime">Read time: ' . $reading_time_string . '</span>';
			?>
		</div>
	</header><!-- .entry-header -->

	<div class="entry-content">
		
		<?php
			the_content( sprintf(
				/* translators: %s: Name of current post. */
				wp_kses( __( 'Continue reading %s <span class="meta-nav">&rarr;</span>', 'tomhazledine_theme' ), array( 'span' => array( 'class' => array() ) ) ),
				the_title( '<span class="screen-reader-text">"', '"</span>', false )
			) );

			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'tomhazledine_theme' ),
				'after'  => '</div>',
			) );
		?>

		<div class="tweet-link-wrapper">
			Found this post interesting or uselful? <?php tweet_this_link( get_the_title(), get_the_permalink(), 'Click here to share it on Twitter!'); ?>
		</div>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php //tomhazledine_theme_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
