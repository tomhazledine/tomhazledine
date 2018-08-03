<?php
/**
 * Template part for displaying snippets of posts.
 *
 * @package Tom_Hazledine_Theme
 */

?>

<?php
// Image
$thumbnail_id = get_post_thumbnail_id( $post->ID );
$image_url_raw = wp_get_attachment_image_src( $thumbnail_id, 'large' );
$image_url = ( $image_url_raw ? $image_url_raw[0] : false );
$image_data = get_post( $thumbnail_id );

$showcase_link = get_field('project_link');
?>

<div class="showcase-thumbnail__image showcase-thumbnail__image--small">
    <img title="<?= $image_data->post_title; ?>" alt="<?= $image_data->post_content; ?>" src="<?= $image_url; ?>"/>
</div>

<div class="showcase-thumbnail__meta">
    <div class="showcase-thumbnail__meta-inner">
        <h2 class="showcase-thumbnail__title"><?php the_title(); ?></h2>
        <?php if (!empty($showcase_link)) { ?>
            <a class="showcase-thumbnail__link" href="<?= $showcase_link; ?>">
                <svg class="showcase-thumbnail__link-icon"><use xlink:href="#link" /></svg>
                <span class="showcase-thumbnail__link-text"><?= str_replace('http://','',str_replace('https://','',$showcase_link)); ?></span>
            </a>
        <?php } ?>
        <div class="entry-meta showcase__topic-links">
            <?php $terms = get_the_terms( $post->ID, 'showcase_topic' ,  ' ' ); ?>
            <?php if (!empty($terms)) { ?>
                <?php foreach ($terms as $term) { ?>
                    <button data-topic="<?= $term->slug; ?>" class="showcase__topic-link--button"><?= $term->name; ?></button>
                <?php } ?>
            <?php } ?>
        </div>
        <div class="showcase-thumbnail__excerpt"><?php the_excerpt(); ?></div>
    </div>
</div>