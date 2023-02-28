export const whatsappNumerFormatter = (number: string) => {
	let numberFormatted = number.split("+55(0")[1];
	numberFormatted =
		numberFormatted.split(")")[0] + numberFormatted.split(")")[1];
	numberFormatted =
		numberFormatted.split("-")[0] + numberFormatted.split("-")[1];
	return numberFormatted;
};

export const validateSizeNumbers = (phone: string) =>
	phone
		.split("")
		.map((word) => parseInt(word))
		.filter((word) => !isNaN(word)).length === 14;
