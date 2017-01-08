<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package Tom_Hazledine_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<section class="error-404 not-found">

				<header class="entry-header">
					<h1 class="page-title">Oops! There's nothing here.</h1>
				</header>

				<div class="page-content">

					<p>It looks like nothing was found at this URL. If you're looking for something specific try searching, or if you're just browsing have a look at the <a href="/">posts archive</a>.</p>

					<?php get_search_form(); ?>

					<hr>

					<?php get_template_part( 'template-parts/module', 'recentposts' ); ?>

				</div><!-- .page-content -->
			</section><!-- .error-404 -->

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
