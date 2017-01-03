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
			<!-- <label for="tweet-content">Join the discussion about this post on Twitter:</label> -->
            <!-- <input name="tweet-content" class="tweet-content-input" type="text" value="I think you're wrong because..."> -->
            <!-- <button class="tweet-content-submit">Tell me!</button> -->
            <svg class="twitter-icon">
                <use xlink:href="#twitter" />
            </svg>
            <em>Want to comment on this topic?</em> <?php tweet_this_link( get_the_title(), get_the_permalink(), 'Join the discussion on Twitter'); ?>
		</div>
		
		<?php
        // If comments are open or we have at least one comment, load up the comment template
        // if ( comments_open() || '0' != get_comments_number() ) {
        //     comments_template( '', true );
        // }
    	?>
    	
	</div>

	<?php get_template_part('template-parts/module','singlenavigation'); ?>

	<footer class="entry-footer">
		<?php //tomhazledine_theme_entry_footer(); ?>
	</footer>
</article>
