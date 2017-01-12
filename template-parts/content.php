<?php
/**
 * Template part for displaying posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Tom_Hazledine_Theme
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?> itemscope="" itemprop="mainEntity" itemtype="http://schema.org/BlogPosting">

	<div class="entry-content" itemprop="articleBody mainEntityOfPage">


        <header class="entry-header">

            <?php 
            $thumbnail_id = get_post_thumbnail_id( $post->ID );
            $image_url_raw = wp_get_attachment_image_src( $thumbnail_id, 'medium' );
            $image_url = ( $image_url_raw ? $image_url_raw[0] : false );
            ?>

            <?php if ( $image_url ) { ?>

                <div itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
                    <img src="<?= $image_url; ?>"/>
                    <meta itemprop="url" content="<?= $image_url; ?>">
                    <!-- <meta itemprop="width" content="32"> -->
                    <!-- <meta itemprop="height" content="32"> -->
                </div>

            <?php } else { ?>

                <?php
                $raw_category = get_the_category();
                $icon_id = parse_category_for_icon_slug( $raw_category );
                ?>

                <div itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
                    <svg class="pages-icon">
                        <use xlink:href="#<?= $icon_id; ?>" />
                    </svg>
                    <img class="visuallyhidden" src="<?= get_template_directory_uri(); ?>/assets/images/pages.png"/>
                    <meta itemprop="url" content="http://www.mycorp.com/logo.jpg">
                    <meta itemprop="width" content="32">
                    <meta itemprop="height" content="32">
                </div>

            <?php } ?>

            <h1 class="entry-title" itemprop="name headline"><?php the_title(); ?></h1>

            <div class="entry-meta">
                <span class="visuallyhidden">Published on </span>
                <time datetime="<?= get_the_date('Y-m-dTH:i'); ?>" itemprop="datePublished"><?= get_the_date('M Y'); ?></time>
                <span class="visuallyhidden">Modified on <time datetime="<?= get_the_modified_date('Y-m-dTH:i'); ?>" itemprop="dateModified"><?= get_the_modified_date('M Y'); ?></time></span>
                <span> – </span>
                <?php
                // Get reading time.
                $reading_time = reading_time( get_the_content() );
                $reading_time_string = parse_read_time( $reading_time );
                ?>
                <span class="readingTime">Read time: <?= $reading_time_string; ?></span>
                <span class="visuallyhidden" itemprop="timeRequired">P<?= floor( (int)$reading_time / 60 ); ?>M<?= $reading_time % 60; ?>S</span>
                <span class="visuallyhidden" itemprop="author" itemscope="" itemtype="http://schema.org/Person">
                    <span itemprop="name">
                        <a href="https://plus.google.com/111879829548102811838" itemprop="url" rel="author">Tom Hazledine</a>
                    </span>
                </span>
                <span class="visuallyhidden" itemprop="publisher" itemscope="" itemtype="http://schema.org/Organization">
                    <meta itemprop="name" content="Tom Hazledine">
                    <div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
                        <img src="<?= get_template_directory_uri(); ?>/favicon.png"/>
                        <meta itemprop="url" content="http://www.mycorp.com/logo.jpg">
                        <meta itemprop="width" content="32">
                        <meta itemprop="height" content="32">
                    </div>
                </span>
            </div>
        </header>
		
		<?php the_content(); ?>

		<div class="tweet-link-wrapper">
            <svg class="twitter-icon">
                <use xlink:href="#twitter" />
            </svg>
            <em>Want to comment on this topic?</em> <?php tweet_this_link( get_the_title(), get_the_permalink(), 'Join the discussion on Twitter'); ?>
		</div>
    	
	</div>

    <hr>

	<?php get_template_part('template-parts/module','singlenavigation'); ?>

	<footer class="entry-footer">
		<?php //tomhazledine_theme_entry_footer(); ?>
	</footer>
</article>
