<?php

get_header(); ?>

<div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">
        <div class="entry-content" >

            <header class="entry-header">
                <div itemprop="image">
                    <svg class="pages-icon">
                        <use xlink:href="#pages_stack" />
                    </svg>
                </div>

                <h1 class="entry-title" itemprop="name headline">Portfolio</h1>

                <div class="entry-meta">
                    <!-- <span class="visuallyhidden">Published on </span> -->
                    <!-- <time datetime="<?= get_the_date('Y-m-dTH:i'); ?>" itemprop="datePublished"><?= get_the_date('M Y'); ?></time> -->
                    <!-- <span class="visuallyhidden">Modified on <time datetime="<?= get_the_modified_date('Y-m-dTH:i'); ?>" itemprop="dateModified"><?= get_the_modified_date('M Y'); ?></time></span> -->
                    Some of the things I've made lately...
                </div>
            </header>

            <div class="showcase-archive">

                <!-- <svg class="showcase-archive__icon"><use xlink:href="#clock" /></svg> -->

                <?php while ( have_posts() ) : the_post(); ?>

                    <?php
                    // Image
                    $thumbnail_id = get_post_thumbnail_id( $post->ID );
                    $image_url_raw = wp_get_attachment_image_src( $thumbnail_id, 'large' );
                    $image_url = ( $image_url_raw ? $image_url_raw[0] : false );
                    $image_data = get_post( $thumbnail_id );

                    $showcase_link = get_field('project_link');
                    $showcase_label_raw = get_field('label');
                    $showcase_label = !empty($showcase_label_raw) ? $showcase_label_raw : get_the_date('M Y');

                    ?>

                    <article id="post-<?php the_ID(); ?>" class="showcase-thumbnail">

                        <div class="showcase-thumbnail__date">
                            <div class="showcase-thumbnail__date-inner">
                                <code><?= $showcase_label; ?></code>
                            </div>
                        </div>

                        <div class="showcase-thumbnail__content">
                            <?php get_template_part( 'template-parts/showcase-thumbnail'); ?>
                        </div>

                    </article>

                <?php endwhile; ?>

            </div>

        </div>
    </main>
</div>

<?php
get_footer();
