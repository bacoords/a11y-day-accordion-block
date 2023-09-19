/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	return (
		<div { ...useBlockProps.save() }>
			<h3 className="wp-block-a11y-day-accordion-heading">
				<button
					type="button"
					aria-expanded="false"
					className="accordion-trigger"
					aria-controls={ `${ attributes.id }-content` }
					id={ `${ attributes.id }-heading` }
					dangerouslySetInnerHTML={ { __html: attributes.heading } }
				></button>
			</h3>
			<div
				id={ `${ attributes.id }-content` }
				role="region"
				aria-labelledby={ `${ attributes.id }-heading` }
				className="wp-block-a11y-day-accordion-panel"
			>
				<div { ...useInnerBlocksProps.save() } />
			</div>
		</div>
	);
}
