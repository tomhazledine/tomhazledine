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

                <?php
                while ( have_posts() ) : the_post();

                    get_template_part( 'template-parts/content-showcase', get_field('type') . '-mini' );

                    // the_post_navigation();

                    // If comments are open or we have at least one comment, load up the comment template.
                    // if ( comments_open() || get_comments_number() ) :
                    //  comments_template();
                    // endif;

                endwhile; // End of the loop.
                ?>

            </div>

        </div>
    </main>
</div>

<?php
get_footer();
