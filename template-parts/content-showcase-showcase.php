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

        $project_svg = get_field('project_logo');
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
            
            <?php if (!empty($project_svg)) { ?>
                <div class="showcase__logo"><?= $project_svg; ?></div>
            <?php } else { ?>
                <div itemprop="image">
                    <svg class="pages-icon"><use xlink:href="#code" /></svg>
                </div>
            <?php } ?>

            <h1 class="entry-title" itemprop="name headline"><?php the_title(); ?></h1>

            <div class="entry-meta showcase__topic-links">
                <?php $terms = get_the_terms( $post->ID, 'showcase_topic' ,  ' ' ); ?>
                <?php foreach ($terms as $term) { ?>
                    <a href="<?= get_post_type_archive_link( 'showcase' ) . '?topic=' . $term->slug; ?>" class="showcase__topic-link"><?= $term->name; ?></a>
                <?php } ?>
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

        <!-- <div class="tweet-link-wrapper">
            <svg class="twitter-icon">
                <use xlink:href="#twitter" />
            </svg>
            <em>Want to comment on this topic?</em> <?php tweet_this_link( get_the_title(), get_the_permalink(), 'Join the discussion on Twitter'); ?>
        </div> -->

        <!-- <form class="tweet-link-wrapper" id="tweet-form" action="">
            <svg class="twitter-icon">
                <use xlink:href="#twitter" />
            </svg>
            <input type="textarea" name="tweet-content" value="<?= get_the_permalink(); ?> @thomashazledine">
            <button id="tweet-form-submit" class="tweet-this faux-button">Tweet</button>
        </form> -->
        
    </div>

    <hr>

    <?php get_template_part('template-parts/module','relatedpost'); ?>

    <footer class="entry-footer">
        <?php //tomhazledine_theme_entry_footer(); ?>
    </footer>
</article>
