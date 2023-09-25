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
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

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
	context,
} ) {
	// Set up our block props and innerblocks props.
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps();

	// Get the heading level and set up a local state for it
	const [ level, setLevel ] = useState( context[ 'a11yDay/level' ] );

	// Get the heading text and set up a local state for it
	const [ heading, setHeading ] = useState( attributes.heading );

	// Convert our heading level into a proper heading tag name
	const [ tagName, setTagName ] = useState(
		'h' + context[ 'a11yDay/level' ]
	);

	// Get the clientId of the root block so we can update its level attribute
	const { rootClientId } = useSelect(
		( select ) => {
			const { getBlockRootClientId } = select( blockEditorStore );

			const rootId = getBlockRootClientId( clientId );

			return {
				rootClientId: rootId,
			};
		},
		[ clientId ]
	);

	// Get the dispatch function so we can update the root block's level attribute
	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	// Handler for when the heading text is updated
	const updateHeading = ( value ) => {
		// Update the block's heading attribute.
		setAttributes( { heading: value } );

		// Update the local state for the heading text.
		setHeading( value );
	};

	// Handler for when the heading level is updated
	const updateLevel = ( value ) => {
		// Update the block's level attribute.
		setAttributes( { level: value } );

		// Update the local state for the heading level.
		setLevel( value );

		// Update the local state for the heading tag name.
		setTagName( 'h' + value );

		// Update the parent block's level attribute.
		updateBlockAttributes( rootClientId, {
			level: value,
		} );
	};

	// This is a hook that is used to set the block's clientId as an attribute.
	// We're using this to set the block's ID attribute so that each accordion
	// section has a unique ID.
	useEffect( () => {
		setAttributes( { id: clientId } );
	}, [ clientId ] );

	// This is a hook that is used to set the block's level if it changes in the
	// parent block. For example, if another accordion section changes the level
	// of the accordion, this hook will update the level of this section.
	useEffect( () => {
		updateLevel( context[ 'a11yDay/level' ] );
	}, [ context[ 'a11yDay/level' ] ] );

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
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
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
