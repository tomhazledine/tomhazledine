<div class="widget widget_categories">
    <h2 class="widget-title"><?php esc_html_e( 'Featured Posts', 'tomhazledine_theme' ); ?></h2>

    <?php $featured_posts = get_field('featured_posts'); ?>

    <?php
    foreach ($featured_posts as $featured_post) {
        $post_query = new WP_Query(
            array(
                'posts_per_page' => 1,
                'p' => $featured_post
            )
        );
        while( $post_query->have_posts() ): $post_query->the_post();
            get_template_part( 'template-parts/content', 'mini' );
        endwhile;
        wp_reset_postdata();
    }
    ?>

    <a href="<?= get_post_type_archive_link( 'post' ); ?>">See all...</a>
</div>