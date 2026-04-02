import { __ } from '@wordpress/i18n';
import { Button, SelectControl } from '@wordpress/components';
import {
	link,
	linkOff,
	desktop,
	tablet,
	mobile,
} from '@wordpress/icons';
import { useState, useMemo } from '@wordpress/element';

const DEFAULT = {
	top: '',
	right: '',
	bottom: '',
	left: '',
	unit: 'px',
	linked: true,
};

const DEVICES = ['desktop', 'tablet', 'mobile'];

const mergeDevice = (base = {}, fallback = DEFAULT) => ({
	...fallback,
	...base,
});

const BoxControl = ({
	label = __('Box', 'wooapb'),
	value = {},
	onChange,
	units = ['px', '%', 'em', 'rem'],
}) => {
	const [device, setDevice] = useState('desktop');

	// Normalize values safely (prevents undefined crash)
	const data = useMemo(() => ({
		desktop: mergeDevice(value.desktop),
		tablet: mergeDevice(value.tablet),
		mobile: mergeDevice(value.mobile),
	}), [value]);

	const current = data[device];

	const updateDevice = (updated) => {
		onChange({
			...data,
			[device]: updated,
		});
	};

	const syncAllSidesIfLinked = (base, val) => {
		if (!base.linked) return base;

		return {
			...base,
			top: val,
			right: val,
			bottom: val,
			left: val,
		};
	};

	const setValue = (side, val) => {
		let updated = {
			...current,
			[side]: val,
		};

		if (current.linked) {
			updated = syncAllSidesIfLinked(updated, val);
		}

		updateDevice(updated);
	};

	const toggleLink = () => {
		updateDevice({
			...current,
			linked: !current.linked,
		});
	};

	const reset = () => {
		updateDevice({ ...DEFAULT });
	};

	const deviceIcon = {
		desktop,
		tablet,
		mobile,
	}[device];

	return (
		<div className="wooapb-box">

			{/* HEADER */}
			<div className="wooapb-box__header">

				<div className="wooapb-box__label">
					{label}
				</div>

				<div className="wooapb-box__actions">

					{/* DEVICE SWITCHER */}
					<div className="wooapb-box__devices">
						{DEVICES.map((d) => (
							<Button
								key={d}
								icon={
									d === 'desktop'
										? desktop
										: d === 'tablet'
										? tablet
										: mobile
								}
								isPressed={device === d}
								onClick={() => setDevice(d)}
							/>
						))}
					</div>

					{/* UNIT */}
					<SelectControl
						value={current.unit}
						options={units.map((u) => ({
							label: u,
							value: u,
						}))}
						onChange={(unit) =>
							updateDevice({ ...current, unit })
						}
					/>

					{/* LINK TOGGLE */}
					<Button
						icon={current.linked ? link : linkOff}
						isPressed={current.linked}
						onClick={toggleLink}
					/>

					{/* RESET */}
					<Button
						isSmall
						onClick={reset}
					>
						↻
					</Button>

				</div>
			</div>

			{/* VISUAL GRID */}
			<div className="wooapb-box__grid">

				{/* VISUAL BOX */}
				<div
					className={`wooapb-box__visual ${
						current.linked ? 'is-linked' : ''
					}`}
					onClick={toggleLink}
				>
					<div className="wooapb-box__top" />
					<div className="wooapb-box__middle">
						<div className="wooapb-box__left" />
						<div className="wooapb-box__center">
							🔗
						</div>
						<div className="wooapb-box__right" />
					</div>
					<div className="wooapb-box__bottom" />
				</div>

				{/* INPUTS */}
				<div className="wooapb-box__inputs">

					<input
						value={current.top}
						onChange={(e) =>
							setValue('top', e.target.value)
						}
					/>

					<input
						value={current.right}
						onChange={(e) =>
							setValue('right', e.target.value)
						}
					/>

					<input
						value={current.bottom}
						onChange={(e) =>
							setValue('bottom', e.target.value)
						}
					/>

					<input
						value={current.left}
						onChange={(e) =>
							setValue('left', e.target.value)
						}
					/>

				</div>
			</div>

			{/* LABELS */}
			<div className="wooapb-box__labels">
				<span>Top</span>
				<span>Right</span>
				<span>Bottom</span>
				<span>Left</span>
			</div>

		</div>
	);
};

export default BoxControl;