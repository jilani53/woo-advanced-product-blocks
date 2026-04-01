import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    __experimentalBoxControl as BoxControl,
    SelectControl,
    RangeControl,
} from '@wordpress/components';

/**
 * BorderControl (Reusable)
 *
 * Expected attribute shape:
 * {
 *   border: {
 *     width: { top, right, bottom, left },
 *     style: 'solid',
 *     color: '',
 *     radius: { top, right, bottom, left }
 *   }
 * }
 */

const BorderControl = ({
    label = __('Border', 'wooapb'),
    value = {},
    onChange,
}) => {
    const border = {
        width: value?.width || {},
        style: value?.style || 'solid',
        color: value?.color || '',
        radius: value?.radius || {},
    };

    const update = (key, newValue) => {
        onChange({
            ...border,
            [key]: newValue,
        });
    };

    return (
        <PanelBody title={label} initialOpen={false}>
            <SelectControl
                label={__('Style', 'wooapb')}
                value={border.style}
                options={[
                    { label: __('Solid', 'wooapb'), value: 'solid' },
                    { label: __('Dashed', 'wooapb'), value: 'dashed' },
                    { label: __('Dotted', 'wooapb'), value: 'dotted' },
                    { label: __('None', 'wooapb'), value: 'none' },
                ]}
                onChange={(val) => update('style', val)}
            />

            <RangeControl
                label={__('Width (px)', 'wooapb')}
                value={border.width?.top || 0}
                onChange={(val) =>
                    update('width', {
                        top: val,
                        right: val,
                        bottom: val,
                        left: val,
                    })
                }
                min={0}
                max={20}
            />

            <BoxControl
                label={__('Radius (px)', 'wooapb')}
                values={border.radius}
                onChange={(val) => update('radius', val)}
                min={0}
                max={80}
            />

            <input
                type="color"
                value={border.color || '#000000'}
                onChange={(e) => update('color', e.target.value)}
                style={{ width: '100%', marginTop: '10px' }}
            />
        </PanelBody>
    );
};

export default BorderControl;