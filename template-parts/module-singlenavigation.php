<div class="clearfix singlePagination">
    <?php
    $next = get_next_post();
    $prev = get_previous_post();

    if ($next) {

        $nextPost = new WP_Query( array('p'=>$next->ID) );
        while( $nextPost->have_posts() ): $nextPost->the_post();
            // Get reading time.
            $reading_time = reading_time( get_the_content() );
            $reading_time_string = parse_read_time( $reading_time );
            ?>
            <div class="postNavigation">
                <code><?php the_date('M Y'); ?></code>
                <a href="<?= esc_url( get_permalink() ); ?>" rel="bookmark"><?php the_title(); ?></a>
                <span class="readingTime"><em>Read time: <?= $reading_time_string; ?></em></span>
            </div>
            <?php
        endwhile;
        wp_reset_postdata();
    }

    if ($prev) {

        $prevPost = new WP_Query( array('p'=>$prev->ID) );
        while( $prevPost->have_posts() ): $prevPost->the_post();
            // Get reading time.
            $reading_time = reading_time( get_the_content() );
            $reading_time_string = parse_read_time( $reading_time );
            ?>
            <div class="postNavigation">
                <code><?php the_date('M Y'); ?></code>
                <a href="<?= esc_url( get_permalink() ); ?>" rel="bookmark"><?php the_title(); ?></a>
                <span class="readingTime"><em>Read time: <?= $reading_time_string; ?></em></span>
            </div>
            <?php
        endwhile;
        wp_reset_postdata();
    }
    ?>

</div>