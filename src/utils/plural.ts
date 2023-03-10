export const pluralCase = (text: string, amount: number) => {
	if (amount > 1) return `${text}s`;
	return text;
};
