<?php
/**
 * Plugin Name:       GB CPT items
 * Description:       Dynamic block which display the most recent custom post type (CPT) items.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            GOAT digital
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gb-cpt-items
 *
 * @package           cm-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */

function gb_cpt_items_render_latest_posts_block($attributes) {
	$page = get_query_var( 'paged', 1 );

	$args = array(
		'posts_per_page' => 8,
		'paged' => $page,
		'post_status' => 'publish',
		'post_type'   => 'gb_movies',
	);

	$latest_posts = new WP_Query($args);
	ob_start();
	?>

	<div class="wp-block-cm-block-gb-cpt-items">
		<?php if ( $latest_posts->have_posts() ): ?>
			<div class="wp-block-cm-block-gb-cpt-items__list">				
				<?php
				while($latest_posts->have_posts() ): $latest_posts->the_post();
					$post_id = $latest_posts->post->ID;
					$title = get_the_title();
					$title = $title ? $title : __('(No title)','gb-cpt-items');
					$permalink = get_permalink();
					$excerpt = get_the_excerpt();
					$thumb = get_the_post_thumbnail( $post_id, 'full' );

					$cur_terms = get_the_terms( $post_id, 'gb_genre' );
					$media_meta = get_post_meta( $post_id, '_gb_sidebar_opt_media_meta', true );
				?>
					<div class="wp-block-cm-block-gb-cpt-items__card">
						<div class="wp-block-cm-block-gb-cpt-items__card-img">
							<a href="<?php echo esc_url( $permalink ) ?>">
								<?php if( !empty($media_meta['mediaURL']) ): ?>
									<video
										autoPlay
										muted
										loop
										src="<?php echo $media_meta['mediaURL'] ?>"
									></video>
								<?php else: ?>
									<?php echo $thumb; ?>
								<?php endif; ?>
							</a>
						</div>
						<h2 class="wp-block-cm-block-gb-cpt-items__card-title">
							<a href="<?php echo esc_url( $permalink ) ?>"><?php echo esc_html( $title ) ?></a>
						</h2>
						<p class="wp-block-cm-block-gb-cpt-items__card-text"><?php echo esc_html( $excerpt ) ?></p>
						<div class="wp-block-cm-block-gb-cpt-items__card-tags">
							<?php if(is_array( $cur_terms )): ?>
								<?php foreach( $cur_terms as $cur_term ): ?>
									<a class="wp-block-cm-block-gb-cpt-items__card-tag" href="<?php echo esc_url(get_term_link( $cur_term->term_id, $cur_term->taxonomy )) ?>">#<?php echo esc_html($cur_term->name) ?></a>
								<?php endforeach; ?>
							<?php endif; ?>
						</div>
					</div>
				<?php endwhile; ?>
			</div>
			<div class="wp-block-cm-block-gb-cpt-items__paginator">
				<?php
					$big = 999999999; 

					$args = array(
						'base'    => str_replace( $big, '%#%', get_pagenum_link( $big ) ),
						'format'  => '',
						'current' => max( 1, get_query_var('paged') ),
						'total'   => $latest_posts->max_num_pages,
					);

					$result = paginate_links( $args );

					$result = preg_replace( '~page/1/~', '', $result );
					echo $result;
					wp_reset_postdata();
				?>
			</div>
		<?php else:	?>
			<p><?php echo esc_html__( 'Sorry, movies not found.', 'gb-cpt-items' ) ?></p>
		<?php endif; ?>
	</div>

	<?php
	$content = ob_get_contents();
	ob_end_clean();

	return $content;
}

function gb_cpt_items_block_init() {
	register_block_type_from_metadata( __DIR__,  array(
		'render_callback' => 'gb_cpt_items_render_latest_posts_block'
	) );
}
add_action( 'init', 'gb_cpt_items_block_init' );