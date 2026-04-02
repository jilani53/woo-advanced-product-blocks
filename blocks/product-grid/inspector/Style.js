import { __ } from '@wordpress/i18n';
import { PanelBody, ColorPalette } from '@wordpress/components';

import BorderControl from '../../controls/BorderControl';
import ColorControl from '../../controls/ColorControl';
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
	} = attributes;

	const updateAttr = (key, value) => {
		setAttributes({ [key]: value });
	};

	return (
		<PanelBody title={__('Style Settings', 'wooapb')} initialOpen={true}>
			<p>{__('Basic styling options', 'wooapb')}</p>

			<ColorControl
				label={__('Title Color', 'wooapb')}
				value={titleColor}
				onChange={(value) => updateAttr('titleColor', value)}
			/>

			<BorderControl
				value={border || {}}
				onChange={(val) => updateAttr('border', val)}
			/>

			<TypographyControl
				value={{
					fontSize: titleFontSize,
					fontWeight,
					lineHeight,
				}}
				onChange={(val) =>
					setAttributes({
						titleFontSize: val?.fontSize ?? titleFontSize,
						fontWeight: val?.fontWeight ?? fontWeight,
						lineHeight: val?.lineHeight ?? lineHeight,
					})
				}
			/>

			<SpacingControl
				value={{
					marginTop,
					marginBottom,
					paddingTop,
					paddingBottom,
				}}
				onChange={(val) =>
					setAttributes({
						marginTop: val?.marginTop ?? marginTop,
						marginBottom: val?.marginBottom ?? marginBottom,
						paddingTop: val?.paddingTop ?? paddingTop,
						paddingBottom: val?.paddingBottom ?? paddingBottom,
					})
				}
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