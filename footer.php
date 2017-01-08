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

    <!-- Analytics -->
    <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-36655973-1']);
        _gaq.push(['_trackPageview']);
        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    </script>

<?php wp_footer(); ?>

</body>
</html>
