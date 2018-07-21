<?php
/**
 * The front-page template file.
 *
 * @package Tom_Hazledine_Theme
 */

get_header();

while ( have_posts() ) : the_post();
    ?>

    <div id="primary" class="content-area">
        <main id="main" class="site-main has-sidenotes" role="main">

            <div itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
                <svg class="pages-icon">
                    <use xlink:href="#pages_stack" />
                </svg>
                <img class="visuallyhidden" src="<?= get_template_directory_uri(); ?>/assets/images/pages.png"/>
                <meta itemprop="url" content="http://www.mycorp.com/logo.jpg">
                <meta itemprop="width" content="32">
                <meta itemprop="height" content="32">
            </div>

            <div class="clearfix homepage-sidenote-wrapper">

                <?php
                $queryArgs = array(
                    'post_type' => 'post',
                    'posts_per_page' => -1,
                );
                $postList = new WP_Query($queryArgs);

                if ( $postList->have_posts() ) :

                    while( $postList->have_posts() ): $postList->the_post();

                        get_template_part( 'template-parts/content', 'mini' );

                    endwhile;
                    wp_reset_postdata();

                else:

                    get_template_part( 'template-parts/content', 'none' );

                endif;
                ?>

                <hr class="homepage-sidenote-hr">

                <span class="sidenote home-content"><?php the_content(); ?></span>

            </div>

        </main>
    </div>

    <?php
    endwhile;
get_footer();
