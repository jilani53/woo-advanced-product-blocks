import { __ } from '@wordpress/i18n';
import { useCallback, useMemo } from '@wordpress/element';
import { Button, SelectControl } from '@wordpress/components';

const SIDES = [ 'top', 'right', 'bottom', 'left' ];
const DEVICES = [ 'desktop', 'tablet', 'mobile' ];
const UNITS = [ 'px', 'em', 'rem', '%', 'vw' ];

const SpacingControl = ( {
    label,
    value = {},
    onChange,
    device = 'desktop',
} ) => {

    const UNITS = [
        { label: 'PX', value: 'px' },
        { label: 'EM', value: 'em' },
        { label: 'REM', value: 'rem' },
        { label: '%', value: '%' },
        { label: 'VW', value: 'vw' },
    ];

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
     * Update single side
     */
    const updateSide = useCallback( ( side, newValue ) => {

        const val = newValue === '' ? '' : Number( newValue );

        let updated = { ...spacing };

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

        onChange( updated );
    }, [ spacing, device, current, onChange ] );

    /**
     * Toggle link/unlink (Spectra behavior: keep current values)
     */
    const toggleLinked = useCallback( () => {

        const updated = { ...spacing };

        updated.linked = ! spacing.linked;

        onChange( updated );

    }, [ spacing, onChange ] );

    /**
     * Unit change (Spectra keeps existing values untouched)
     */
    const changeUnit = useCallback( ( unit ) => {

        onChange( {
            ...spacing,
            unit,
        } );

    }, [ spacing, onChange ] );

    /**
     * Device-safe value getter (Spectra fallback chain)
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
                        options={ UNITS }
                        onChange={ ( unit ) =>
                            onChange( { ...spacing, unit } )
                        }
                    />
                </div>
            </div>

            {/* Box Model UI */}
            <div className="spectra-spacing-control__box">

                <div className="wooapb-spacing-input">
                    <input
                        type="number"
                        value={ getValue( 'top' ) }
                        onChange={ ( e ) => updateSide( 'top', e.target.value ) }
                    />
                </div>

                <div className="wooapb-spacing-input">
                    <input
                        type="number"
                        value={ getValue( 'left' ) }
                        onChange={ ( e ) => updateSide( 'left', e.target.value ) }
                    />
                </div>

                <div className="wooapb-spacing-input">
                    <input
                        type="number"
                        value={ getValue( 'right' ) }
                        onChange={ ( e ) => updateSide( 'right', e.target.value ) }
                    />
                </div>

                <div className="wooapb-spacing-input">
                    <input
                        type="number"
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