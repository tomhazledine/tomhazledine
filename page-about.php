<?php
/**
 * Template Name: About Page
 *
 * @package Tom_Hazledine_Theme
 */

get_header(); ?>

    <?php get_template_part( 'template-parts/module', 'careergraph' ); ?>

    <div id="primary" class="content-area">
        <main id="main" class="site-main" role="main">

            <?php
            while ( have_posts() ) : the_post();

                get_template_part( 'template-parts/content', 'page' );

                // If comments are open or we have at least one comment, load up the comment template.
                // if ( comments_open() || get_comments_number() ) :
                //  comments_template();
                // endif;

            endwhile; // End of the loop.
            ?>

            <hr>

            <?php
            if (!empty(get_field('featured_posts'))) {
                get_template_part( 'template-parts/module', 'featuredposts' );
            } else {
                get_template_part( 'template-parts/module', 'recentposts' );
            }
            ?>

        </main><!-- #main -->
    </div><!-- #primary -->

<?php
get_sidebar();
get_footer();
