<?php
// Register Custom Post Type
function showcase_post_type() {

    $labels = array(
        'name'                => _x( 'Showcases', 'Post Type General Name', 'text_domain' ),
        'singular_name'       => _x( 'Showcase', 'Post Type Singular Name', 'text_domain' ),
        'menu_name'           => __( 'Showcases', 'text_domain' ),
        'parent_item_colon'   => __( 'Parent Showcase:', 'text_domain' ),
        'all_items'           => __( 'All Showcases', 'text_domain' ),
        'view_item'           => __( 'View Showcase', 'text_domain' ),
        'add_new_item'        => __( 'Add New Showcase', 'text_domain' ),
        'add_new'             => __( 'New Showcase', 'text_domain' ),
        'edit_item'           => __( 'Edit Showcase', 'text_domain' ),
        'update_item'         => __( 'Update Showcase', 'text_domain' ),
        'search_items'        => __( 'Search Showcases', 'text_domain' ),
        'not_found'           => __( 'No Showcases found', 'text_domain' ),
        'not_found_in_trash'  => __( 'No Showcases found in Trash', 'text_domain' ),
    );
    $args = array(
        'label'               => __( 'Showcase', 'text_domain' ),
        'description'         => __( 'Showcase information pages', 'text_domain' ),
        'labels'              => $labels,
        'supports'            => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields', ),
        'taxonomies'          => array( 'locations_tax' ),
        'hierarchical'        => false,
        'public'              => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_admin_bar'   => true,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-star-empty',
        'can_export'          => true,
        'has_archive'         => true,
        'exclude_from_search' => false,
        'publicly_queryable'  => true,
        'capability_type'     => 'page',
        'show_in_rest'        => true,
        'rewrite'             => array('slug' => 'showcase')
    );
    register_post_type( 'showcase', $args );

}

// Hook into the 'init' action
add_action( 'init', 'showcase_post_type', 0 );

// 
function create_my_taxonomies() {
    register_taxonomy(
        'showcase_topic',
        'showcase',
        array(
            'labels' => array(
                'name' => 'Showcase Topic',
                'add_new_item' => 'Add New Showcase Topic',
                'new_item_name' => "New Showcase Topic"
            ),
            'show_ui' => true,
            'show_tagcloud' => false,
            'hierarchical' => true
        )
    );
}
add_action( 'init', 'create_my_taxonomies', 0 );