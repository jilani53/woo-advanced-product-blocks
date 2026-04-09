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
		if (!attributes.blockId && clientId) {
			setAttributes({ blockId: clientId });
		}
	}, [clientId]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (wrapperRef.current) {
				initWooapbCarousels(wrapperRef.current);
			}
		}, 100);

		return () => clearTimeout(timeout);
	}, [attributes]);

	return (
		<div {...blockProps} ref={wrapperRef}>
			<Inspector attributes={attributes} setAttributes={setAttributes} />

			<div className="wooapb-product-carousel__wrapper">
				<ServerSideRender
					block="wooapb/product-carousel"
					attributes={attributes}
				/>
			</div>
		</div>
	);
}