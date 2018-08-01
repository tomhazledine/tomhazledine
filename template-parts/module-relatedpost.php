<?php
$related_posts = get_field( 'related_posts' );

if ( !empty($related_posts) && count( $related_posts ) > 0 ) {

    if ( count( $related_posts ) > 1 ) {
        echo '<h3>If you liked that post, you might be interested in these ones too:</h3>';
    } else {
        echo '<h3>If you liked that post, you might be interested in this one too:</h3>';
    }

    foreach ($related_posts as $related_post) {
        $related_post_loop = new WP_Query(
            array(
                'p' => $related_post,
                'posts_per_page' => -1,
            )
        );

        while( $related_post_loop->have_posts() ): $related_post_loop->the_post();
            get_template_part( 'template-parts/content', 'excerpt' );
        endwhile;
        wp_reset_postdata();
    }

}
// } else {

get_template_part('template-parts/module','singlenavigation');

// }
