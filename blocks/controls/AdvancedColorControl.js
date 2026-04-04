import { __ } from '@wordpress/i18n';
import {
	Dropdown,
	Button,
	Flex,
	FlexItem,
	ColorPalette,
	ColorPicker,
} from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

const AdvancedColorControl = ( {
	label,
	value = {},
	onChange,
	onReset,
} ) => {
	const { colors } = useSelect( ( select ) => {
		return {
			colors: select( 'core/block-editor' ).getSettings().colors || [],
		};
	}, [] );

	const currentColor = value?.value || '';

	const presetColors = useMemo( () => {
		return colors.map( ( c ) => ( {
			name: c.name,
			color: c.color,
			slug: c.slug,
		} ) );
	}, [ colors ] );

	const handlePresetChange = ( color ) => {
		const found = presetColors.find( ( c ) => c.color === color );

		onChange( {
			value: color,
			source: found ? 'preset' : 'custom',
			slug: found?.slug || null,
		} );
	};

	const handleCustomChange = ( color ) => {
		onChange( {
			value: color,
			source: 'custom',
			slug: null,
		} );
	};

	return (
		<div className="wooapb-advanced-color-control">
			<Dropdown
				className="wooapb-color-dropdown"
				renderToggle={ ( { isOpen, onToggle } ) => (
					<Flex justify="space-between" align="center">
						<FlexItem>
							<strong>{ label }</strong>
						</FlexItem>

						<FlexItem>
							<Flex>
								{/* Reset */}
								{ currentColor && (
									<Button
										variant="link"
										isDestructive
										onClick={ onReset }
									>
										{ __( 'Clear', 'wooapb' ) }
									</Button>
								) }
								<Button
									variant="none"
									onClick={ onToggle }
									aria-expanded={ isOpen }
								>
									<span
										style={ {
											background: currentColor || '#fff',
											width: '30px',
											height: '30px',
											display: 'inline-block',
											border: '1px solid #ccc',
											borderRadius: '50%',
										} }
									/>
									{/* { currentColor || __( 'Default', 'wooapb' ) } */}
								</Button>
							</Flex>
						</FlexItem>
					</Flex>
				) }
				renderContent={ () => (
					<div className="wooapb-color-dropdown-content" style={ { padding: '0' } }>
						{/* Preset Colors */}
						<ColorPalette
							colors={ presetColors }
							value={ currentColor }
							onChange={ handlePresetChange }
							enableAlpha
						/>						

						{/* Custom Picker */}
						<ColorPicker
							color={ currentColor }
							onChangeComplete={ ( c ) =>
								handleCustomChange( c.hex )
							}
							enableAlpha
						/>

						{/* Reset */}
						{ currentColor && (
							<div style={ { textAlign: 'left' } }>
								<Button
									variant="link"
									isDestructive
									onClick={ onReset }
								>
									{ __( 'Clear', 'wooapb' ) }
								</Button>
							</div>
						) }
					</div>
				) }
			/>
		</div>
	);
};

export default AdvancedColorControl;