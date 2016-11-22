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
            
            <span class="sidenote"><?php the_content(); ?></span>

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

        </main>
    </div>

    <?php
    endwhile;
get_footer();
