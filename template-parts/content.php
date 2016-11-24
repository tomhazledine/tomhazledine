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
	</header>

	<div class="entry-content">
		
		<?php the_content(); ?>

		<div class="tweet-link-wrapper">
			Found this post interesting or uselful? <?php tweet_this_link( get_the_title(), get_the_permalink(), 'Click here to share it on Twitter!'); ?>
		</div>

		<?php get_template_part('template-parts/module','singlenavigation'); ?>
	</div>

	<footer class="entry-footer">
		<?php //tomhazledine_theme_entry_footer(); ?>
	</footer>
</article>
