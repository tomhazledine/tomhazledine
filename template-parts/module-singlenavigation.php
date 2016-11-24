<div class="clearfix singlePagination">
    <?php
    $next = get_next_post();
    $prev = get_previous_post();

    if ($next) {

        $nextPost = new WP_Query( array('p'=>$next->ID) );
        while( $nextPost->have_posts() ): $nextPost->the_post();
            $next_text = wp_trim_words( apply_filters( 'the_excerpt', get_the_excerpt() ), 7 );
            ?>
            <a class="nextPrevPost next" href="<?= get_the_permalink(); ?>">
                <div>
                    <span class="icon">&larr;</span>
                    <strong><?= get_the_title(); ?></strong>
                </div>
                <div><?= $next_text; ?></div>
                <div><em>Posted by <?= get_the_author(); ?> on <?php the_time('M dS, Y'); ?></em></div>
            </a>
            <?php
        endwhile;
        wp_reset_postdata();
    }

    if ($prev) {

        $prevPost = new WP_Query( array('p'=>$prev->ID) );
        while( $prevPost->have_posts() ): $prevPost->the_post();
            $prev_text = wp_trim_words( apply_filters( 'the_excerpt', get_the_excerpt() ), 7 );
            ?>
            <a class="nextPrevPost prev" href="<?= get_the_permalink(); ?>">
                <div>
                    <strong><?= get_the_title(); ?></strong>
                    <span class="icon">&rarr;</span>
                </div>
                <div><?= $prev_text; ?></div>
                <div><em>Posted by <?= get_the_author(); ?> on <?php the_time('M dS, Y'); ?></em></div>
            </a>
            <?php
        endwhile;
        wp_reset_postdata();
    }
    ?>

</div>