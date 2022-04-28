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
function cm_cpt_items_block_init() {
	register_block_type( __DIR__ );
}
add_action( 'init', 'cm_cpt_items_block_init' );



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

