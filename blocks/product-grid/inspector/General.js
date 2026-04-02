import { PanelBody, RangeControl, CheckboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const General = ({ attributes, setAttributes }) => {
	const { columns, postsPerPage, inStock } = attributes;

	// ✅ reusable helper
	const updateAttr = (key, value) => {
		setAttributes({ [key]: value });
	};

	return (
		<PanelBody title={__('Grid Settings', 'wooapb')} initialOpen={true}>
			<RangeControl
				label={__('Columns', 'wooapb')}
				value={columns}
				onChange={(value) => updateAttr('columns', value)}
				min={1}
				max={6}
			/>

			<RangeControl
				label={__('Products per Page', 'wooapb')}
				value={postsPerPage}
				onChange={(value) => updateAttr('postsPerPage', value)}
				min={1}
				max={50}
			/>

			<CheckboxControl
				label={__('Only stocked', 'wooapb')}
				checked={inStock}
				onChange={(value) => updateAttr('inStock', value)}
			/>
		</PanelBody>
	);
};

export default General;