import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Advanced = ({ attributes, setAttributes }) => {
	const { customClass } = attributes;

	const updateAttr = (key, value) => {
		setAttributes({ [key]: value });
	};

	return (
		<PanelBody title={__('Advanced Settings', 'wooapb')} initialOpen={true}>
			<TextControl
				label={__('Custom CSS Class', 'wooapb')}
				value={customClass || ''}
				onChange={(value) => updateAttr('customClass', value)}
			/>
		</PanelBody>
	);
};

export default Advanced;