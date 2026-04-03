export const getTypographyCSS = ( typo = {}, device = 'desktop' ) => {
    const css = {};

    if ( typo.fontFamily ) {
        css.fontFamily = typo.fontFamily;
    }

    if ( typo.fontWeight ) {
        css.fontWeight = typo.fontWeight;
    }

    if ( typo.fontStyle ) {
        css.fontStyle = typo.fontStyle;
    }

    if ( typo.textTransform ) {
        css.textTransform = typo.textTransform;
    }

    if ( typo.textDecoration ) {
        css.textDecoration = typo.textDecoration;
    }

    if ( typo.fontSize?.[ device ] ) {
        css.fontSize = `${ typo.fontSize[ device ] }${ typo.fontSize.unit || 'px' }`;
    }

    if ( typo.lineHeight?.[ device ] ) {
        css.lineHeight = `${ typo.lineHeight[ device ] }${ typo.lineHeight.unit || 'px' }`;
    }

    if ( typo.letterSpacing?.[ device ] ) {
        css.letterSpacing = `${ typo.letterSpacing[ device ] }${ typo.letterSpacing.unit || 'px' }`;
    }

    return css;
};
