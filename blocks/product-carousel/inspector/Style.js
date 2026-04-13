import { __ } from '@wordpress/i18n';
import { PanelBody, ColorPalette } from '@wordpress/components';

import BorderControl from '../../controls/BorderControl';
import AdvancedColorControl from '../../controls/AdvancedColorControl';
import TypographyControl from '../../controls/TypographyControl';
import SpacingControl from '../../controls/SpacingControl';

const Style = ({ attributes, setAttributes }) => {
	const {
		padding,
		margin,
		typography,
	} = attributes;

	const updateAttr = (key, value) => {
		setAttributes({ [key]: value });
	};

	return (
		<PanelBody title={__('Style Settings', 'wooapb')} initialOpen={true}>
			<p>{__('Basic styling options', 'wooapb')}</p>

			<AdvancedColorControl
				label={ __( 'Title Color', 'wooapb' ) }
				value={ attributes.titleColor }
				onChange={ ( val ) => setAttributes( { titleColor: val } ) }
				onReset={ () =>
					setAttributes( {
						titleColor: {
							value: '',
							source: 'custom',
							slug: null,
						},
					} )
				}
			/>
			
			<TypographyControl
                label="Typography"
                value={ typography }
                onChange={ ( val ) =>
                    setAttributes( { typography: val } )
                }
            />

			<BorderControl
				label="Card Border"
				value={ attributes.wrapperBorder }
				onChange={ ( val ) =>
					setAttributes( { wrapperBorder: val } )
				}
			/>

			<SpacingControl
				label={ __( "Padding", "wooapb" ) }
				value={ padding }
				onChange={ ( val ) => setAttributes( { padding: val } ) }
				min={ 0 }
				max={ 200 }
				step={ 1 }
				units={ [ 'px', 'em', 'rem', '%' ] }
				linked={ true }
			/>

			<SpacingControl
				label={ __( "Margin", "wooapb" ) }
				value={ margin }
				onChange={ ( val ) => setAttributes( { margin: val } ) }
				min={ -200 }
				max={ 200 }
				step={ 1 }
				units={ [ 'px', 'em', 'rem', '%' ] }
				linked={ true }
			/>

		</PanelBody>
	);
};

export default Style;