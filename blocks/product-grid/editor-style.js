// use-style-vars.js

import { useMemo } from '@wordpress/element';

export const useStyleVars = ( attributes ) => {
    return useMemo( () => {
        const typography     = attributes?.typography || {};
        const fontSize       = typography?.fontSize || {};
        const letterSpacing  = typography?.letterSpacing || {};
        const lineHeight     = typography?.lineHeight || {};

        return {
            '--wooapb-product-card-title-color': attributes?.titleColor?.value || '',
            '--wooapb-product-card-title-size': fontSize.desktop
                ? fontSize.desktop + ( fontSize.unit || 'px' )
                : '',
            '--wooapb-product-card-title-weight': typography?.fontWeight || '',
            '--wooapb-product-card-title-style': typography?.fontStyle || '',
            '--wooapb-product-card-title-transform': typography?.textTransform || '',
            '--wooapb-product-card-title-decoration': typography?.textDecoration || '',
            '--wooapb-product-card-title-letter-spacing': letterSpacing.desktop
                ? letterSpacing.desktop + ( letterSpacing.unit || 'px' )
                : '',
            '--wooapb-product-card-title-line-height': lineHeight.desktop || '',
        };
    }, [
        attributes?.titleColor?.value,
        attributes?.typography?.fontSize?.desktop,
        attributes?.typography?.fontSize?.unit,
        attributes?.typography?.fontWeight,
        attributes?.typography?.fontStyle,
        attributes?.typography?.textTransform,
        attributes?.typography?.textDecoration,
        attributes?.typography?.letterSpacing?.desktop,
        attributes?.typography?.letterSpacing?.unit,
        attributes?.typography?.lineHeight?.desktop,
    ] );
};