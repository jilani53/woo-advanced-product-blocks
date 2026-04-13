import { __ } from '@wordpress/i18n';
import { useCallback, useMemo } from '@wordpress/element';
import { Button, SelectControl } from '@wordpress/components';

const SIDES = [ 'top', 'right', 'bottom', 'left' ];

const SIDES_UI = [
    { key: 'top', label: 'Top' },
    { key: 'right', label: 'Right' },
    { key: 'bottom', label: 'Bottom' },
    { key: 'left', label: 'Left' },
];

const DEVICES = [ 'desktop', 'tablet', 'mobile' ];

const SpacingControl = ( {
    label,
    value = {},
    onChange,
    device = 'desktop',
    min,
    max,
    step = 1,
} ) => {

    const UNIT_OPTIONS = [
        { label: 'PX', value: 'px' },
        { label: 'EM', value: 'em' },
        { label: 'REM', value: 'rem' },
        { label: '%', value: '%' },
        { label: 'VW', value: 'vw' },
    ];

    /**
     * Normalize spacing structure
     */
    const spacing = useMemo( () => ( {
        desktop: {},
        tablet: {},
        mobile: {},
        unit: 'px',
        linked: true,
        ...value,
    } ), [ value ] );

    const current = spacing?.[ device ] || {};

    /**
     * Clamp helper (handles empty string as well for controlled input)
     */
    const clamp = ( val ) => {
        if ( val === '' ) return '';

        let num = Number( val );

        if ( typeof min === 'number' && num < min ) num = min;
        if ( typeof max === 'number' && num > max ) num = max;

        return num;
    };

    /**
     * Deep clone helper
     */
    const cloneSpacing = ( obj ) => ( {
        ...obj,
        desktop: { ...( obj?.desktop || {} ) },
        tablet: { ...( obj?.tablet || {} ) },
        mobile: { ...( obj?.mobile || {} ) },
    } );

    /**
     * Update single side
     */
    const updateSide = useCallback( ( side, newValue ) => {

        const val = newValue === '' ? '' : clamp( newValue );

        const updated = { ...spacing };

        if ( spacing.linked ) {
            updated[ device ] = {
                top: val,
                right: val,
                bottom: val,
                left: val,
            };
        } else {
            updated[ device ] = {
                ...current,
                [ side ]: val,
            };
        }

        onChange( cloneSpacing( updated ) );

    }, [ spacing, device, current, onChange ] );

    /**
     * Toggle linked/unlinked
     */
    const toggleLinked = useCallback( () => {

        const updated = {
            ...spacing,
            linked: ! spacing.linked,
        };

        onChange( cloneSpacing( updated ) );

    }, [ spacing, onChange ] );

    /**
     * Unit change
     */
    const changeUnit = useCallback( ( unit ) => {

        onChange( cloneSpacing( {
            ...spacing,
            unit,
        } ) );

    }, [ spacing, onChange ] );

    /**
     * Get value safely
     */
    const getValue = useCallback( ( side ) => {
        return current?.[ side ] ?? '';
    }, [ current ] );

    return (
        <div className="wooapb-spacing-wrapper">

            {/* Header */}
            <div className="spectra-spacing-control__header">
                <span>{ label }</span>

                <div className="wooapb-spacing-control__unit">
                    <SelectControl
                        value={ spacing.unit || 'px' }
                        options={ UNIT_OPTIONS }
                        onChange={ changeUnit }
                    />
                </div>
            </div>

            {/* Box Model */}
            <div className="spectra-spacing-control__box">

                { SIDES_UI.map( ( side ) => (
                    <div className="wooapb-spacing-input" key={ side.key }>
                        <input
                            type="number"
                            min={ min }
                            max={ max }
                            step={ step }
                            value={ getValue( side.key ) }
                            onChange={ ( e ) =>
                                updateSide( side.key, e.target.value )
                            }
                        />
                        <span className="wooapb-spacing-input__label">{ side.label }</span>
                    </div>
                ) ) }

                <Button
                    icon={ spacing.linked ? 'admin-links' : 'editor-unlink' }
                    onClick={ toggleLinked }
                    small
                />

            </div>
        </div>
    );
};

export default SpacingControl;