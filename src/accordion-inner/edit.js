/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	// Get the heading text and set up a local state for it
	const [ heading, setHeading ] = useState( attributes.heading );
	// Get the content text and set up a local state for it
	const [ content, setContent ] = useState( attributes.content );

	const updateHeading = ( value ) => {
		setAttributes( { heading: value } );
		setHeading( value );
	};
	const updateContent = ( value ) => {
		setAttributes( { content: value } );
		setContent( value );
	};

	// This is a hook that is used to set the block's clientId as an attribute.
	useEffect( () => {
		setAttributes( { id: clientId } );
	}, [ clientId ] );

	return (
		<div { ...useBlockProps() }>
			<RichText
				value={ heading }
				onChange={ updateHeading }
				tagName="h3"
				placeholder="Enter heading here..."
				className="accordion-heading"
			/>
			<div
				id="sect1"
				role="region"
				aria-labelledby="accordion1id"
				className="accordion-panel"
			>
				<RichText
					value={ content }
					onChange={ updateContent }
					tagName="div"
					placeholder="Enter content here..."
					className="accordion-content"
				/>
			</div>
		</div>
	);
}
