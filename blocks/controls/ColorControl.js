import { useState } from '@wordpress/element';
import { Popover, ColorPicker } from '@wordpress/components';

const ColorControl = ({ label, value, onChange }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="wooapb-control wooapb-color-wrapper">
            {label && (
                <div className="wooapb-control-label">
                    {label}
                </div>
            )}

            <div className="wooapb-color-picker-wrapper">
                <div
                    className="wooapb-color-swatch"
                    style={{ backgroundColor: value || '#fff' }}
                    onClick={() => setOpen(!open)}
                />

                {open && (
                    <Popover
                        position="bottom left"
                        onClose={() => setOpen(false)}
                    >
                        <ColorPicker
                            color={value}
                            onChangeComplete={(color) =>
                                onChange(color.hex)
                            }
                            disableAlpha
                        />
                    </Popover>
                )}
            </div>
        </div>
    );
};

export default ColorControl;