import { __ } from '@wordpress/i18n';
import { PanelBody, ColorPalette } from '@wordpress/components';

import BorderControl from '../../controls/BorderControl';
import ColorControl from '../../controls/ColorControl';
import AdvancedColorControl from '../../controls/AdvancedColorControl';
import TypographyControl from '../../controls/TypographyControl';
import SpacingControl from '../../controls/SpacingControl';
import BoxControl from '../../controls/BoxControl';

const Style = ({ attributes, setAttributes }) => {
	const {
		titleColor,
		border,
		spacing,
		titleFontSize,
		fontWeight,
		lineHeight,
		marginTop,
		marginBottom,
		paddingTop,
		paddingBottom,
		typography,
	} = attributes;

	const updateAttr = (key, value) => {
		setAttributes({ [key]: value });
	};

	return (
		<PanelBody title={__('Style Settings', 'wooapb')} initialOpen={true}>
			<p>{__('Basic styling options', 'wooapb')}</p>

			{/* <ColorControl
				label={__('Title Color', 'wooapb')}
				value={titleColor}
				onChange={(value) => updateAttr('titleColor', value)}
			/> */}

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
                value={ spacing }
                onChange={ ( newValue ) =>
                    setAttributes( { spacing: newValue } )
                }
                device="desktop"
            />
			
			<SpacingControl
                label={ __( "Margin", "wooapb" ) }
                value={ spacing }
                onChange={ ( newValue ) =>
                    setAttributes( { spacing: newValue } )
                }
                device="desktop"
            />

			{/* <BoxControl
				label="Margin"
				value={spacing}
				onChange={(val) =>
					setAttributes({ spacing: val })
				}
			/> */}


		</PanelBody>
	);
};

export default Style;