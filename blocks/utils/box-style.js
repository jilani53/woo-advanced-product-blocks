export const getBoxCSS = (value, property = 'margin') => {
	if (!value?.desktop) return '';

	const { top, right, bottom, left, unit } = value.desktop;

	const t = top || 0;
	const r = right || 0;
	const b = bottom || 0;
	const l = left || 0;

	return `${property}: ${t}${unit} ${r}${unit} ${b}${unit} ${l}${unit};`;
};
