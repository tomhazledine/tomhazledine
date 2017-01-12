<?php
function parse_category_for_icon_slug( $raw_category ) {
    
    // Get the category slug, and make sure it's lowercase.
    $category_slug = strtolower( $raw_category[0]->slug );

    //
    switch ($category_slug) {
        case 'code':
            $icon_id = 'code';
            break;
        case 'events':
        case 'general':
        default:
            $icon_id = 'pages';
            break;
    }

    return $icon_id;
}