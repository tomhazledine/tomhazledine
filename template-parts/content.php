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

        <?php
        // Get image details
        $thumbnail_id = get_post_thumbnail_id( $post->ID );
        $image_url_raw = wp_get_attachment_image_src( $thumbnail_id, 'large' );
        $image_url = ( $image_url_raw ? $image_url_raw[0] : false );
        
        // Get category details.
        $raw_category = get_the_category();
        $icon_id = parse_category_for_icon_slug( $raw_category );

        $yoast_meta_description = get_post_meta( $post->ID, '_yoast_wpseo_metadesc', true );
        ?>

        <!-- <meta name="twitter:card" content="summary" /> -->
        <meta name="twitter:site" content="@thomashazledine" />
        <meta name="twitter:title" content="<?php the_title(); ?>"/>
        <?php if ( !empty( $yoast_meta_description ) ) { ?>
            <meta name="twitter:description" content="<?= esc_attr( $yoast_meta_description ); ?>" />
        <?php } else { ?>
            <meta name="twitter:description" content="<?php the_excerpt(); ?>" />
        <?php } ?>


        <header class="entry-header">
            
            <?php if ($image_url) { ?>
                <?php 
                // If there is a featured image, we'll just show the basic category icon here.
                ?>
                <div itemprop="image">
                    <svg class="pages-icon">
                        <use xlink:href="#<?= $icon_id; ?>" />
                    </svg>
                </div>
            <?php } else { ?>
                <?php
                // If there is no featured image, we'll add the schema data to the category icon
                // so we have a sensible fallback for the required image schema data.
                ?>
                <div itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
                    <svg class="pages-icon">
                        <use xlink:href="#<?= $icon_id; ?>" />
                    </svg>

                    <?php if ($icon_id == 'notes') { ?>
                        <img class="visuallyhidden" src="<?= get_template_directory_uri(); ?>/assets/images/notes_bg.jpg"/>
                        <meta itemprop="url" content="<?= get_template_directory_uri(); ?>/assets/images/notes_bg.jpg">
                    <?php } else { ?>
                        <img class="visuallyhidden" src="<?= get_template_directory_uri(); ?>/assets/images/pages_stack_bg.jpg"/>
                        <meta itemprop="url" content="<?= get_template_directory_uri(); ?>/assets/images/pages_stack_bg.jpg">
                    <?php } ?>
                    <meta itemprop="width" content="400">
                    <meta itemprop="height" content="400">
                    
                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:image" content="<?= get_template_directory_uri(); ?>/assets/images/pages_stack_bg.jpg" />
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
                        <img src="<?= get_template_directory_uri(); ?>/assets/images/pages.png"/>
                        <meta itemprop="url" content="<?= get_template_directory_uri(); ?>/assets/images/pages.png">
                        <meta itemprop="width" content="32">
                        <meta itemprop="height" content="32">
                    </div>
                </span>
            </div>
        </header>

        <?php if ( $image_url ) { ?>

            <?php
            $image_details = wp_get_attachment_metadata( $thumbnail_id );
            $image_data = get_post( $thumbnail_id );
            $image_title = $image_data->post_title;
            $image_caption = $image_data->post_excerpt;
            $image_alt = $image_data->post_content;
            ?>

            <div class="featured-image-wrapper" itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
                <img title="<?= $image_title; ?>" alt="<?= $image_alt; ?>" src="<?= $image_url; ?>"/>
                <meta itemprop="url" content="<?= $image_url; ?>">
                <meta itemprop="width" content="<?= $image_details['width']; ?>">
                <meta itemprop="height" content="<?= $image_details['height']; ?>">
                
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content="<?= $image_url; ?>" />
                
                <?php if ( !empty($image_caption) ) { ?>
                    <span class="sidenote"><?= $image_caption; ?></span>
                    <meta name="twitter:image:alt" content="<?= $image_caption; ?>" />
                <?php } ?>
            </div>

        <?php } ?>

        <?php
        $show_intro_note = get_field( 'show_intro_note' );
        $intro_note = esc_attr( get_field( 'intro_note' ) );
        $intro_link = get_field( 'intro_link' );
        ?>

        <?php if ( !empty($intro_note) && $show_intro_note ) { ?>
            <div class="intro-note">
                <span class="intro-note-text"><?= $intro_note; ?></span>
                <?php if ( !empty( $intro_link ) ) { ?>
                    <?php $intro_link_anchor = get_the_permalink( $intro_link ); ?>
                    <?php $intro_link_title = get_the_title( $intro_link ); ?>
                    <a href="<?= $intro_link_anchor; ?>" class="intro-note-link"><?= $intro_link_title; ?></a>
                <?php } ?>
            </div>
        <?php } ?>
        
        <div class="selectable-area first-selectable-area">
            <?php the_content(); ?>
        </div>

        <div class="tweet-link-wrapper">
            <svg class="twitter-icon">
                <use xlink:href="#twitter" />
            </svg>
            <em>Want to comment on this topic?</em> <?php tweet_this_link( get_the_title(), get_the_permalink(), 'Join the discussion on Twitter'); ?>
        </div>

        <form class="tweet-link-wrapper" action="/">
            <svg class="twitter-icon">
                <use xlink:href="#twitter" />
            </svg>
            <input type="textarea" value="<?= get_the_permalink(); ?> @thomashazledine">
            <button class="tweet-this faux-button">Tell me what you think</button>
        </form>
        
    </div>

    <hr>

    <?php get_template_part('template-parts/module','singlenavigation'); ?>

    <footer class="entry-footer">
        <?php //tomhazledine_theme_entry_footer(); ?>
    </footer>
</article>
