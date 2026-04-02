import { __ } from '@wordpress/i18n';
import { RangeControl } from '@wordpress/components';

const SpacingControl = ({ value = {}, onChange }) => {
    return (
        <div className="wooapb-control">

            <RangeControl
                label={__('Margin Top', 'wooapb')}
                value={value.marginTop}
                onChange={(marginTop) =>
                    onChange({ ...value, marginTop })
                }
            />

            <RangeControl
                label={__('Margin Bottom', 'wooapb')}
                value={value.marginBottom}
                onChange={(marginBottom) =>
                    onChange({ ...value, marginBottom })
                }
            />

            <RangeControl
                label={__('Padding Top', 'wooapb')}
                value={value.paddingTop}
                onChange={(paddingTop) =>
                    onChange({ ...value, paddingTop })
                }
            />

            <RangeControl
                label={__('Padding Bottom', 'wooapb')}
                value={value.paddingBottom}
                onChange={(paddingBottom) =>
                    onChange({ ...value, paddingBottom })
                }
            />
        </div>
    );
};

export default SpacingControl;