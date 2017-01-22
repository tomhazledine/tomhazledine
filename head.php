<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Tom_Hazledine_Theme
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <title><?php wp_title( '|', true, 'right' ); ?></title>

    <link rel="shortcut icon" href="<?= get_template_directory_uri(); ?>/assets/images/favicon.ico" />
    <link rel="alternate" type="application/rss+xml" title="RSS" href="<?php bloginfo('rss2_url'); ?>" title="RSS Feed" />
    <link rel="alternate" type="application/atom+xml" title="RSS" href="<?php bloginfo('atom_url'); ?>" title="Atom Feed" />

    <!-- Typekit 'TH temp' -->
    <script>
      (function(d) {
        var config = {
          kitId: 'wjn3pil',
          scriptTimeout: 3000
        },
        h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
      })(document);
    </script>

    <!-- Google+ -->
    <link href="https://plus.google.com/111879829548102811838" rel="publisher" />

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <div class="svgSpriteWrapper hidden">
        <?php $rawSVG = file_get_contents(get_template_directory_uri() . "/assets/icons/symbol/svg/sprite.symbol.svg"); ?>
        <?= preg_replace( '/fill=("|\')(#)?([a-fA-F0-9]*)("|\')/i', '', $rawSVG ); ?>
    </div>