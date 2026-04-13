import { useBlockProps } from '@wordpress/block-editor';
import { ServerSideRender } from '@wordpress/server-side-render';
import { useEffect, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Inspector from './inspector';
import { useStyleVars } from './editor-style';

export default function Edit({ attributes, setAttributes, clientId }) {

    const blockProps = useBlockProps({
        style: useStyleVars(attributes),
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
