<?php
/**
 * Template Name: Style Free Audio Landing Page
 *
 * @package Tom_Hazledine_Theme
 */

get_header(); ?>

    <?php //get_template_part( 'template-parts/module', 'careergraph' ); ?>

    <div id="primary" class="content-area">
        <main id="main" class="site-main" role="main">

            <audio class="customPlayer" src="http://audio.eatenbymonsters.com/reviews/daughter/human.mp3" title="Human" data-artist="Daughter" controls>
                Your browser does not support the <code>audio</code> element.
            </audio>

            <?php
            while ( have_posts() ) : the_post();

                get_template_part( 'template-parts/content', 'page' );

                // If comments are open or we have at least one comment, load up the comment template.
                // if ( comments_open() || get_comments_number() ) :
                //  comments_template();
                // endif;

            endwhile; // End of the loop.
            ?>

            <?php //get_template_part( 'template-parts/module', 'recentposts' ); ?>

        </main><!-- #main -->
    </div><!-- #primary -->

<?php
get_sidebar();
get_footer();
