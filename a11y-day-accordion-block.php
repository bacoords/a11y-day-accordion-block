<?php
/**
 * Plugin Name:       WP Accessibility Day Accordion Block
 * Description:       An accessible accordion block built for WP Accessibility Day 2023.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Aurooba Ahmed & Brian Coords
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       accordion-block
 *
 * @package           a11y-day
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function a11y_day_accordion_block_block_init() {
	register_block_type( __DIR__ . '/build/accordion-block' );
	register_block_type( __DIR__ . '/build/accordion-section' );
}
add_action( 'init', 'a11y_day_accordion_block_block_init' );
