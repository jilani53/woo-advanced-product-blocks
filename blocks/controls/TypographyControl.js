import { __ } from '@wordpress/i18n';
import { RangeControl, SelectControl } from '@wordpress/components';

const TypographyControl = ({
    value = {},
    onChange,
}) => {
    return (
        <div className="wooapb-control">

            <RangeControl
                label={__('Font Size', 'wooapb')}
                value={value.fontSize}
                onChange={(fontSize) =>
                    onChange({ ...value, fontSize })
                }
                min={10}
                max={80}
            />

            <RangeControl
                label={__('Line Height', 'wooapb')}
                value={value.lineHeight}
                onChange={(lineHeight) =>
                    onChange({ ...value, lineHeight })
                }
                min={1}
                max={3}
                step={0.1}
            />

            <SelectControl
                label={__('Font Weight', 'wooapb')}
                value={value.fontWeight}
                options={[
                    { label: 'Normal', value: '400' },
                    { label: 'Medium', value: '500' },
                    { label: 'Bold', value: '700' },
                ]}
                onChange={(fontWeight) =>
                    onChange({ ...value, fontWeight })
                }
            />
        </div>
    );
};

export default TypographyControl;