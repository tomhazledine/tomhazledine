<div class="widget widget_categories">
    <h2 class="widget-title"><?php esc_html_e( 'Recent Posts', 'tomhazledine_theme' ); ?></h2>

    <?php
    $recent_posts = new WP_Query(
        array(
            'posts_per_page' => 5,
        )
    );
    while( $recent_posts->have_posts() ): $recent_posts->the_post();
        get_template_part( 'template-parts/content', 'mini' );
    endwhile;
    wp_reset_postdata();
    ?>

    <a href="/">See all...</a>
</div>