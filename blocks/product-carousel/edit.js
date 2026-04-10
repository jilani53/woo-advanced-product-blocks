import { useBlockProps } from '@wordpress/block-editor';
import { ServerSideRender } from '@wordpress/server-side-render';
import { useEffect, useRef } from '@wordpress/element';
import Inspector from './inspector';
import { useStyleVars } from './editor-style';
import initWooapbCarousels from './carousel-init';

export default function Edit({ attributes, setAttributes, clientId }) {
    const wrapperRef = useRef();

    const blockProps = useBlockProps({
        style: useStyleVars(attributes),
        className: 'wooapb-product-carousel',
    });

    useEffect(() => {
        if (!wrapperRef.current) return;

        const root = wrapperRef.current;

        const init = () => {
            const el = root.querySelector('.wooapb-carousel');
            if (el) {
                initWooapbCarousels(root);
            }
        };

        // Run once (in case already rendered)
        init();

        // Observe SSR updates
        const observer = new MutationObserver(() => {
            init();
        });

        observer.observe(root, {
            childList: true,
            subtree: true,
        });

        return () => observer.disconnect();
    }, []);

    // Store blockId
    useEffect(() => {
        if (!attributes.blockId && clientId) {
            setAttributes({ blockId: clientId });
        }
    }, [clientId]);

    return (
        <div {...blockProps}>
            
            <Inspector
                attributes={attributes}
                setAttributes={setAttributes}
            />

            <div className="wooapb-product-carousel__wrapper">
                <div ref={wrapperRef}>
                    <ServerSideRender
                        block="wooapb/product-carousel"
                        attributes={attributes}
                    />
                </div>
            </div>
        </div>
    );
}
