import { __ } from '@wordpress/i18n';
import { useCallback, useMemo } from '@wordpress/element';
import { Button, SelectControl } from '@wordpress/components';

const SIDES = [ 'top', 'right', 'bottom', 'left' ];
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
     * Clamp helper (SAFE)
     */
    const clamp = ( val ) => {
        if ( val === '' ) return '';

        let num = Number( val );

        if ( typeof min === 'number' && num < min ) num = min;
        if ( typeof max === 'number' && num > max ) num = max;

        return num;
    };

    /**
     * Deep clone helper (prevents shared reference)
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

                <div className="wooapb-spacing-input">
                    <input
                        type="number"
                        min={ min }
                        max={ max }
                        step={ step }
                        value={ getValue( 'top' ) }
                        onChange={ ( e ) => updateSide( 'top', e.target.value ) }
                    />
                </div>

                <div className="wooapb-spacing-input">
                    <input
                        type="number"
                        min={ min }
                        max={ max }
                        step={ step }
                        value={ getValue( 'left' ) }
                        onChange={ ( e ) => updateSide( 'left', e.target.value ) }
                    />
                </div>

                <div className="wooapb-spacing-input">
                    <input
                        type="number"
                        min={ min }
                        max={ max }
                        step={ step }
                        value={ getValue( 'right' ) }
                        onChange={ ( e ) => updateSide( 'right', e.target.value ) }
                    />
                </div>

                <div className="wooapb-spacing-input">
                    <input
                        type="number"
                        min={ min }
                        max={ max }
                        step={ step }
                        value={ getValue( 'bottom' ) }
                        onChange={ ( e ) => updateSide( 'bottom', e.target.value ) }
                    />
                </div>

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