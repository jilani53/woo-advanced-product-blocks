export const generateSpacingCSS = (spacing, device = 'desktop') => {
	if (!spacing?.[device]) return {};

	const { margin = {}, padding = {} } = spacing[device];

	const format = (v, unit) =>
		v !== '' && v !== undefined ? `${v}${unit || 'px'}` : undefined;

	return {
		marginTop: format(margin.top, margin.unit),
		marginRight: format(margin.right, margin.unit),
		marginBottom: format(margin.bottom, margin.unit),
		marginLeft: format(margin.left, margin.unit),

		paddingTop: format(padding.top, padding.unit),
		paddingRight: format(padding.right, padding.unit),
		paddingBottom: format(padding.bottom, padding.unit),
		paddingLeft: format(padding.left, padding.unit),
	};
};