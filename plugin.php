<?php
/**
 * Plugin Name:       CM CPT items
 * Description:       Dynamic block which display the most recent custom post type (CPT) items.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cm-cpt-items
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

function cm_block_render_latest_posts_block($attributes) {
	// global $post;

	$page =  get_query_var( 'paged', 1 );

	$args = array(
		'posts_per_page' => 8,
		'paged' => $page,
		'post_status' => 'publish',
		'post_type'   => 'movies',
	);

	$latest_posts = new WP_Query($args);
	ob_start();
	?>
	<div class="wp-block-cm-block-cm-cpt-items">
		<?php if ( $latest_posts->have_posts() ): ?>
			<div class="wp-block-cm-block-cm-cpt-items__list">				
				<?php
				while($latest_posts->have_posts() ): $latest_posts->the_post();
					$post_id = $latest_posts->post->ID;
					// print_r($post_id);
					$title = esc_html(get_the_title());
					$title = $title ? $title : __('(No title)','cm-cpt-items');
					$permalink = get_permalink( );
					$excerpt = get_the_excerpt( );
					$thumb = get_the_post_thumbnail( $post_id, 'full' );

					$cur_terms = get_the_terms( $post_id, 'genre' );
				?>
					<div class="wp-block-cm-block-cm-cpt-items__card">
						<div class="wp-block-cm-block-cm-cpt-items__card-img-box">
							<a href="<?php echo esc_url($permalink) ?>">
								<?php echo $thumb; ?>
							</a>
						</div>
						<h2 class="wp-block-cm-block-cm-cpt-items__card-title">
							<a href="<?php echo esc_url($permalink) ?>"><?php echo $title; ?></a>
						</h2>
						<p class="wp-block-cm-block-cm-cpt-items__card-text"><?php echo esc_html( $excerpt ) ?></p>
						<div class="wp-block-cm-block-cm-cpt-items__card-tags">
							<?php if(is_array( $cur_terms )): ?>
								<?php foreach( $cur_terms as $cur_term ): ?>
									<a class="wp-block-cm-block-cm-cpt-items__card-tags-tag" href="<?php echo get_term_link( $cur_term->term_id, $cur_term->taxonomy ) ?>">#<?php echo $cur_term->name ?></a>
								<?php endforeach; ?>
							<?php endif; ?>
						</div>
					</div>
				<?php endwhile; ?>
			</div>
		<?php
		wp_reset_postdata(); // reset
		endif;	
		?>
			<div class="wp-block-cm-block-cm-cpt-items__paginator">
				<span class="wp-block-cm-block-cm-cpt-items__paginator-item">
					<?php
					previous_posts_link( __('PREVIOUS PAGE','cm-cpt-items') ); 
					$links_data = cm_cpt_items_paginate_links_data( [
						'total' => $latest_posts->max_num_pages,
					] );?>
				</span>
				<?php
				foreach($links_data as $item){
					if($item->is_current == 1){
						?>
							<span class="wp-block-cm-block-cm-cpt-items__paginator-item"><?php echo $item->page_num ?></span>
						<?php
					}else{
						?>
							<span class="wp-block-cm-block-cm-cpt-items__paginator-item"><a href="<?php echo esc_url($item->url) ?>"><?php echo $item->page_num ?></a></span>
						<?php
					}
				}
				?>
				<span class="wp-block-cm-block-cm-cpt-items__paginator-item">
					<?php
					next_posts_link( __('NEXT PAGE','cm-cpt-items'), $latest_posts->max_num_pages );
					?>
				</span>
			</div>
	</div>
	<?php
	$content = ob_get_contents();
	ob_end_clean();

	return $content;
}

function cm_block_cm_cpt_items_block_init() {
	register_block_type_from_metadata( __DIR__,  array(
		'render_callback' => 'cm_block_render_latest_posts_block'
	) );
}
add_action( 'init', 'cm_block_cm_cpt_items_block_init' );

add_action( 'init', 'cm_cpt_items_create_taxonomy' );
function cm_cpt_items_create_taxonomy(){

	register_taxonomy( 'genre',  'movies', [
		'label'                 => 'Genre', 
		'labels'                => [
			'name'              => 'Genres',
			'singular_name'     => 'Genre',
			'search_items'      => 'Search Genres',
			'all_items'         => 'All Genres',
			'view_item '        => 'View Genre',
			'parent_item'       => 'Parent Genre',
			'parent_item_colon' => 'Parent Genre:',
			'edit_item'         => 'Edit Genre',
			'update_item'       => 'Update Genre',
			'add_new_item'      => 'Add New Genre',
			'new_item_name'     => 'New Genre Name',
			'menu_name'         => 'Genre',
			'back_to_items'     => '← Back to Genre',
		],
		'description'           => '', 
		'public'                => true,
		'hierarchical'          => false,

		'rewrite' => array('slug' => 'attraction'),
		'show_in_rest' => true,
		'capabilities'          => array(),
		'meta_box_cb'           => null,
		'show_admin_column'     => false,
		'rest_base'             => null,
	] );
}

// Our custom post type function
function cm_cpt_items_create_posttype() {
  
    register_post_type( 'movies',
    // CPT Options
        array(
            'labels' => array(
                'name' => __( 'Movies' ),
                'singular_name' => __( 'Movie' )
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'movies'),
            'show_in_rest' => true,
			'supports' => [ 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'revisions', ], 
			'taxonomies'          => ['genre'],
          )
    );
}
// Hooking up our function to theme setup
add_action( 'init', 'cm_cpt_items_create_posttype', 0 );




function cm_cpt_items_paginate_links_data( $args ){
	global $wp_query;

	$args = wp_parse_args( $args, [
		'total' => $wp_query->max_num_pages ?? 1,
		'current' => null,
		'url_base' => '', //
	] );

	if( null === $args['current'] ){
		$args['current'] = max( 1, get_query_var( 'paged', 1 ) );
	}

	if( ! $args['url_base'] ){
		$args['url_base'] = str_replace( PHP_INT_MAX, '{page_num}', get_pagenum_link( PHP_INT_MAX ) );
	}

	$pages = range( 1, max( 1, (int) $args['total'] ) );

	foreach( $pages as & $page ){
		$page = (object) [
			'is_current' => $page == $args['current'] ,
			'page_num'   => $page,
			'url'        => str_replace( '{page_num}', $page, $args['url_base'] ),
		];
	}
	unset( $page );

	return $pages;
}