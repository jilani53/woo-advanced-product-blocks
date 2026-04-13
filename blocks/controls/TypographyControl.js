import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    SelectControl,
    RangeControl,
    ButtonGroup,
    Button,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

const DEVICES = [ 'desktop', 'tablet', 'mobile' ];
const UNITS = [ 'px', 'rem', 'em', 'vw' ];

const TypographyControl = ( {
    label = __( 'Typography', 'wooapb' ),
    value = {},
    onChange,
} ) => {
    const [ device, setDevice ] = useState( 'desktop' );

    const typography = {
        fontFamily: value?.fontFamily || '',
        fontWeight: value?.fontWeight || '',
        fontStyle: value?.fontStyle || '',
        textTransform: value?.textTransform || '',
        textDecoration: value?.textDecoration || '',
        fontSize: value?.fontSize || {},
        lineHeight: value?.lineHeight || {},
        letterSpacing: value?.letterSpacing || {},
    };

    const update = ( key, val ) => {
        onChange( {
            ...typography,
            [ key ]: val,
        } );
    };

    const updateResponsive = ( key, val ) => {
        onChange( {
            ...typography,
            [ key ]: {
                ...typography[ key ],
                [ device ]: val,
            },
        } );
    };

    const updateUnit = ( key, unit ) => {
        onChange( {
            ...typography,
            [ key ]: {
                ...typography[ key ],
                unit,
            },
        } );
    };

    return (
        <PanelBody 
            title={ label }
            initialOpen={ false }
            className="wooapb-typography-wrapper"
        >
            {/* Device Switch */}
            <ButtonGroup className="wooapb-typography-button-switcher" aria-label={ __( 'Device Switcher', 'wooapb' ) }>
                { DEVICES.map( ( d ) => (
                    <Button
                        key={ d }
                        isPrimary={ device === d }
                        onClick={ () => setDevice( d ) }
                    >
                        { d }
                    </Button>
                ) ) }
            </ButtonGroup>

            {/* Font Family */}
            <SelectControl
                label={ __( 'Font Family', 'wooapb' ) }
                value={ typography.fontFamily }
                options={ [
                    { label: 'Default', value: '' },
                    { label: 'Arial', value: 'Arial' },
                    { label: 'Roboto', value: 'Roboto' },
                ] }
                onChange={ ( val ) => update( 'fontFamily', val ) }
            />

            {/* Font Size */}
            <RangeControl
                label={ __( 'Font Size', 'wooapb' ) }
                value={ typography.fontSize?.[ device ] || '' }
                onChange={ ( val ) => updateResponsive( 'fontSize', val ) }
                min={ 0 }
                max={ 100 }
            />

            <ButtonGroup className="wooapb-typography-button-switcher" aria-label={ __( 'Font Size Unit', 'wooapb' ) }>
                { UNITS.map( ( u ) => (
                    <Button
                        key={ u }
                        isPrimary={ typography.fontSize?.unit === u }
                        onClick={ () => updateUnit( 'fontSize', u ) }
                    >
                        { u }
                    </Button>
                ) ) }
            </ButtonGroup>

            {/* Weight */}
            <SelectControl
                label={ __( 'Weight', 'wooapb' ) }
                value={ typography.fontWeight }
                options={ [
                    { label: 'Default', value: '' },
                    { label: '400', value: '400' },
                    { label: '700', value: '700' },
                ] }
                onChange={ ( val ) => update( 'fontWeight', val ) }
            />

            {/* Style */}
            <SelectControl
                label={ __( 'Style', 'wooapb' ) }
                value={ typography.fontStyle }
                options={ [
                    { label: 'Default', value: '' },
                    { label: 'Normal', value: 'normal' },
                    { label: 'Italic', value: 'italic' },
                ] }
                onChange={ ( val ) => update( 'fontStyle', val ) }
            />

            {/* Transform */}
            <SelectControl
                label={ __( 'Transform', 'wooapb' ) }
                value={ typography.textTransform }
                options={ [
                    { label: 'Default', value: '' },
                    { label: 'Uppercase', value: 'uppercase' },
                    { label: 'Lowercase', value: 'lowercase' },
                ] }
                onChange={ ( val ) => update( 'textTransform', val ) }
            />

            {/* Decoration */}
            <SelectControl
                label={ __( 'Decoration', 'wooapb' ) }
                value={ typography.textDecoration }
                options={ [
                    { label: 'Default', value: '' },
                    { label: 'Underline', value: 'underline' },
                    { label: 'Line Through', value: 'line-through' },
                ] }
                onChange={ ( val ) => update( 'textDecoration', val ) }
            />

            {/* Line Height */}
            <RangeControl
                label={ __( 'Line Height', 'wooapb' ) }
                value={ typography.lineHeight?.[ device ] || '' }
                onChange={ ( val ) => updateResponsive( 'lineHeight', val ) }
                min={ 0 }
                max={ 10 }
                step={ 0.1 }
            />

            {/* Letter Spacing */}
            <RangeControl
                label={ __( 'Letter Spacing', 'wooapb' ) }
                value={ typography.letterSpacing?.[ device ] || '' }
                onChange={ ( val ) => updateResponsive( 'letterSpacing', val ) }
                min={ 0 }
                max={ 20 }
                step={ 0.1 }
            />
        </PanelBody>
    );
};

export default TypographyControl;
