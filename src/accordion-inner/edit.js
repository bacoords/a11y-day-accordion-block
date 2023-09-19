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
import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
	BlockControls,
	HeadingLevelDropdown,
} from '@wordpress/block-editor';
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
export default function Edit( {
	attributes,
	setAttributes,
	clientId,
	isSelected,
} ) {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps();

	// Get the heading text and set up a local state for it
	const [ heading, setHeading ] = useState( attributes.heading );
	const [ level, setLevel ] = useState( attributes.level );
	const [ tagName, setTagName ] = useState( 'h' + attributes.level );

	const updateHeading = ( value ) => {
		setAttributes( { heading: value } );
		setHeading( value );
	};
	const updateLevel = ( value ) => {
		setAttributes( { level: value } );
		setLevel( value );
		setTagName( 'h' + value );
	};

	// This is a hook that is used to set the block's clientId as an attribute.
	useEffect( () => {
		setAttributes( { id: clientId } );
	}, [ clientId ] );

	return (
		<div { ...blockProps }>
			<BlockControls>
				<HeadingLevelDropdown
					value={ level }
					onChange={ updateLevel }
				/>
			</BlockControls>
			<RichText
				value={ heading }
				onChange={ updateHeading }
				tagName={ tagName }
				placeholder="Enter heading here..."
				className="wp-block-a11y-day-accordion-heading"
				tabIndex="0"
			/>
			<div
				id="sect1"
				role="region"
				aria-labelledby="accordion1id"
				className="wp-block-a11y-day-accordion-panel"
			>
				<div { ...innerBlocksProps } />
			</div>
		</div>
	);
}
