import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    __experimentalBoxControl as BoxControl,
    SelectControl,
    ColorPalette,
    ButtonGroup,
    Button,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * BorderControl (Reusable + Scalable)
 *
 * Expected value shape:
 * {
 *   normal: {
 *     width: { top, right, bottom, left },
 *     style: 'solid',
 *     color: '',
 *     radius: { top, right, bottom, left }
 *   },
 *   hover: { ... }
 * }
 */

const DEFAULT_BORDER = {
    width: { top: '', right: '', bottom: '', left: '' },
    style: 'solid',
    color: '',
    radius: { top: '', right: '', bottom: '', left: '' },
};

const BorderControl = ( {
    label = __( 'Border', 'wooapb' ),
    value = {},
    onChange,
} ) => {
    const [ state, setState ] = useState( 'normal' );

    const current = value?.[ state ] || DEFAULT_BORDER;

    const border = {
        width: current?.width || DEFAULT_BORDER.width,
        style: current?.style || DEFAULT_BORDER.style,
        color: current?.color || DEFAULT_BORDER.color,
        radius: current?.radius || DEFAULT_BORDER.radius,
    };

    const update = ( key, newValue ) => {
        onChange( {
            ...value,
            [ state ]: {
                ...border,
                [ key ]: newValue,
            },
        } );
    };

    return (
        <PanelBody
            className="wooapb-border-wrapper"
            title={ label }
            initialOpen={ false }
        >
            {/* State Switch */}
            <ButtonGroup className="wooapb-border-button-switcher" aria-label={ __( 'Border State', 'wooapb' ) }>
                <Button
                    isPrimary={ state === 'normal' }
                    onClick={ () => setState( 'normal' ) }
                >
                    { __( 'Normal', 'wooapb' ) }
                </Button>
                <Button
                    isPrimary={ state === 'hover' }
                    onClick={ () => setState( 'hover' ) }
                >
                    { __( 'Hover', 'wooapb' ) }
                </Button>
            </ButtonGroup>

            {/* Border Style */}
            <SelectControl
                label={ __( 'Style', 'wooapb' ) }
                value={ border.style }
                options={ [
                    { label: __( 'Solid', 'wooapb' ), value: 'solid' },
                    { label: __( 'Dashed', 'wooapb' ), value: 'dashed' },
                    { label: __( 'Dotted', 'wooapb' ), value: 'dotted' },
                    { label: __( 'Double', 'wooapb' ), value: 'double' },
                    { label: __( 'None', 'wooapb' ), value: 'none' },
                ] }
                onChange={ ( val ) => update( 'style', val ) }
            />

            {/* Border Width */}
            <BoxControl
                label={ __( 'Width', 'wooapb' ) }
                values={ border.width }
                onChange={ ( val ) => update( 'width', val ) }
            />

            {/* Border Radius */}
            <BoxControl
                label={ __( 'Radius', 'wooapb' ) }
                values={ border.radius }
                onChange={ ( val ) => update( 'radius', val ) }
            />

            {/* Border Color */}
            <div className="wooapb-border-color-control">
                <p style={ { marginBottom: '6px' } }>
                    { __( 'Color', 'wooapb' ) }
                </p>
                <ColorPalette
                    value={ border.color }
                    onChange={ ( val ) => update( 'color', val ) }
                />
            </div>
        </PanelBody>
    );
};

export default BorderControl;
