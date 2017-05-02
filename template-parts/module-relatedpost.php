<?php
$related_post = get_field( 'related_post' );
$title = get_the_title( $related_post );
$url = get_the_permalink( $related_post );
// print_pre($title);
// print_pre($url);

$related_post_loop = new WP_Query(
    array(
        'p' => $related_post,
        'posts_per_page' => -1,
    )
);
while( $related_post_loop->have_posts() ): $related_post_loop->the_post();
    get_template_part( 'template-parts/content', 'mini' );
endwhile;
wp_reset_postdata();
?>