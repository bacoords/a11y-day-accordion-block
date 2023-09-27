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
import {
	ToolbarGroup,
	ToolbarButton,
	KeyboardShortcuts,
} from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import { plus } from '@wordpress/icons';

const TEMPLATE = [
	[
		'core/paragraph',
		{
			placeholder: __( 'Type / to add a hidden block' ),
		},
	],
];

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
	context,
	name,
} ) {
	// Set up our block props and innerblocks props.
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			template: TEMPLATE,
		}
	);

	// Get the heading level and set up a local state for it
	const [ level, setLevel ] = useState( attributes.level );

	// Get the heading text and set up a local state for it
	const [ heading, setHeading ] = useState( attributes.heading );

	// Convert our heading level into a proper heading tag name
	const [ tagName, setTagName ] = useState( 'h' + attributes.level );

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

	// Get the dispatch function so we can update the root block's level attribute and insert a new block
	const { updateBlockAttributes, insertBlock } =
		useDispatch( blockEditorStore );

	// Handler for when the heading text is updated
	const updateHeading = ( value ) => {
		// Update the block's heading attribute.
		setAttributes( { heading: value } );

		// Update the local state for the heading text.
		setHeading( value );
	};

	// Handler for when the heading level is updated
	const updateLevel = ( value ) => {
		// Update the parent block's level attribute.
		updateBlockAttributes( rootClientId, {
			level: value,
		} );
	};

	const updateLevelLocal = ( value ) => {
		// Update the block's level attribute.
		setAttributes( { level: value } );

		// Update the local state for the heading level.
		setLevel( value );

		// Update the local state for the heading tag name.
		setTagName( 'h' + value );
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
		updateLevelLocal( context[ 'a11yDay/level' ] );
	}, [ context[ 'a11yDay/level' ] ] );

	// Get the parent block's clientId and innerBlocks so we can insert a new
	// block after this one.
	const { parentClientId, parentinnerBlocks } = useSelect( ( select ) => {
		const { getBlockParents, getSelectedBlockClientId } =
			select( blockEditorStore );
		const selectedBlockClientId = getSelectedBlockClientId();
		const parents = getBlockParents( selectedBlockClientId );
		const firstParentClientId = parents[ parents.length - 1 ];
		return {
			parentClientId: firstParentClientId,
			parentinnerBlocks:
				select( 'core/block-editor' ).getBlocks( firstParentClientId ),
		};
	}, [] );

	// Get the current block's position in the parent block's innerBlocks array
	function getCurrentBlockPosition( block ) {
		return block.clientId === clientId;
	}

	// Insert a new Accordion Section block after this one
	const appendNewSection = () => {
		// first we programmatically create a new Accordion Section block
		const block = createBlock( name );
		// then we insert it after this block by finding this block's position and adding 1
		insertBlock(
			block,
			parentinnerBlocks.findIndex( getCurrentBlockPosition ) + 1,
			parentClientId
		);
	};

	return (
		<div { ...blockProps }>
			<BlockControls>
				<ToolbarGroup>
					<HeadingLevelDropdown
						value={ level }
						onChange={ updateLevel }
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						onClick={ appendNewSection }
						icon={ plus }
						label={ __(
							'Append a new accordion section ( ⌥/Alt + ⌘/Ctrl + Y )',
							'accordion-block'
						) }
					/>
				</ToolbarGroup>
			</BlockControls>
			<KeyboardShortcuts
				// Bind keyboard shortcuts for appending a new section, and listen for this shortcut when the RichText component is focussed, since we the global shortcut doesn't work inside the RichText component.
				shortcuts={ {
					'alt+mod+y': appendNewSection,
				} }
			>
				<RichText
					value={ heading }
					onChange={ updateHeading }
					tagName={ tagName }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					placeholder="Enter heading here..."
					className="wp-block-a11y-day-accordion-heading"
				/>
			</KeyboardShortcuts>
			<div
				id={ `${ attributes.id }-content` }
				role="region"
				aria-labelledby={ `${ attributes.id }-heading` }
				className="wp-block-a11y-day-accordion-panel"
			>
				<div { ...innerBlocksProps } />
			</div>
		</div>
	);
}
