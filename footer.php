<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Tom_Hazledine_Theme
 */

?>
    
    <a id="tweet-widget" class="tweet-widget">
        <div class="tweet-widget-inner">
            <svg class="twitter-icon">
                <use xlink:href="#twitter" />
            </svg>
            <span class="visuallyhidden">Tweet this.</span>
        </div>
    </a>

	<footer id="colophon" class="site-footer" role="contentinfo">

	</footer>

<?php wp_footer(); ?>

</body>
</html>
