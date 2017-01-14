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
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-36655973-1', 'auto');

        <?php
        if( isset( $_COOKIE['user_is_admin'] ) ) {
            echo 'ga(\'set\', \'dimension1\', \'true\');';
        }
        ?>

        ga('send', 'pageview');
    </script>

<?php wp_footer(); ?>

</body>
</html>
