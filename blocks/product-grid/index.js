import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

registerBlockType( 'wooapb/product-grid', {
	edit( { attributes, setAttributes } ) {
		const { columns, postsPerPage } = attributes;
		const blockProps = useBlockProps();

		return (
			<>
				<InspectorControls>
					<PanelBody title="Grid Settings">
						<RangeControl
							label="Columns"
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min={ 1 }
							max={ 6 }
						/>
						<RangeControl
							label="Products Per Page"
							value={ postsPerPage }
							onChange={ ( value ) =>
								setAttributes( { postsPerPage: value } )
							}
							min={ 1 }
							max={ 48 }
						/>
					</PanelBody>
				</InspectorControls>

				<div { ...blockProps }>
					<p>
						Woo Product Grid — { columns } columns, { postsPerPage } products
					</p>
				</div>
			</>
		);
	},

	save() {
		return null; // Server-side rendered
	}
} );
