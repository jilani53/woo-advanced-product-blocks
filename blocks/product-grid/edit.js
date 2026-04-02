import { useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import { __ } from '@wordpress/i18n';
import Inspector from './inspector';
import { getBoxCSS } from '../utils/box-style';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();

    return (
        <div {...blockProps}>
            <Inspector
                attributes={attributes}
                setAttributes={setAttributes}
            />

            <div className="wooapb-product-grid" >
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