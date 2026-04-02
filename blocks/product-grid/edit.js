import { useBlockProps } from '@wordpress/block-editor';
import { ServerSideRender } from '@wordpress/server-side-render';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Inspector from './inspector';
import { getBoxCSS } from '../utils/box-style';

export default function Edit({ attributes, setAttributes, clientId }) {
    const blockProps = useBlockProps({
        style: {
            '--wooapb-title-color': attributes.titleColor || '',
            '--wooapb-title-size': attributes.titleFontSize || '',
            '--wooapb-title-weight': attributes.fontWeight || '',
            '--wooapb-title-line': attributes.lineHeight || '',
        },
    });

    const shouldSetBlockId = !attributes.blockId && clientId;

    useEffect(() => {
        if (shouldSetBlockId) {
            setAttributes({ blockId: clientId });
        }
    }, [shouldSetBlockId, clientId, setAttributes]);

    return (
        <div {...blockProps}>
            <Inspector
                attributes={attributes}
                setAttributes={setAttributes}
            />

            <div className="wooapb-product-grid">
                <ServerSideRender
                    block="wooapb/product-grid"
                    attributes={attributes}
                />
                <div className="wooapb-admin-bar">
                    <p>
                        {__('Columns:', 'wooapb')} {attributes.columns},{' '}
                        {__('Limit:', 'wooapb')} {attributes.postsPerPage},{' '}
                        {__('In Stock:', 'wooapb')} {attributes.inStock ? __('Yes', 'wooapb') : __('No', 'wooapb')}
                    </p>
                </div>
            </div>
        </div>
    );
}
