import { Entity } from "./Entity";

export interface Option extends Entity {
	name: string;
	value: number;
	amount: number;
	unit: string;
}

export type Options = Array<Option>;

export type Cream = {
	id: string;
	name: string;
	amount: number;
	unit: string;
};

export type Creams = Array<Cream>;

export enum SizeEnum {
	"P" = "P",
	"M" = "M",
	"G" = "G",
	"GG" = "GG",
}

export type Size = {
	id: string;
	name: SizeEnum;
	value: number;
	amountCreams: number;
	amoutnOptions: number;
};

// export type Size =
// 	| {
// 			name: SizeEnum.P;
// 			value?: 10;
// 			creams?: [Cream, Cream];
// 			options?: [Option, Option, Option];
// 	  }
// 	| {
// 			name: SizeEnum.M;
// 			value?: 13;
// 			creams?: [Creams, Creams];
// 			options?: [Option, Option, Option];
// 	  }
// 	| {
// 			name: SizeEnum.G;
// 			value?: 16;
// 			creams?: [Creams, Creams];
// 			options?: [Option, Option, Option, Option];
// 	  }
// 	| {
// 			name: SizeEnum.GG;
// 			value?: 19;
// 			creams?: [Creams, Creams, Creams];
// 			options?: [Option, Option, Option, Option, Option];
// 	  };

export type Product = {
	id?: string;
	size: Size;
	creams: Creams;
	options?: Options;
	value: number;
	extras?: Options;
};

export const mockedCreams: Creams = [
	{ name: "Açai", id: "1", amount: 3, unit: "Litros" },
	{ name: "Cupuaçu", id: "2", amount: 2, unit: "Litros" },
	{ name: "Ninho", id: "3", amount: 2, unit: "Pacotes" },
	{ name: "Oreo", id: "4", amount: 4, unit: "Caixa" },
	{ name: "Ovomaltine", id: "5", amount: 1, unit: "Litros" },
	{ name: "Ninho Trufa", id: "6", amount: 2, unit: "Litros" },
	{ name: "Amendoim e Castanha", id: "7", amount: 3, unit: "Litros" },
];

export const mockedSizes: Array<Size> = [
	{
		id: "1",
		name: SizeEnum.P,
		amountCreams: 2,
		amoutnOptions: 3,
		value: 10,
	},
	{
		id: "2",
		name: SizeEnum.M,
		amountCreams: 2,
		amoutnOptions: 3,
		value: 13,
	},
	{
		id: "3",
		name: SizeEnum.G,
		amountCreams: 2,
		amoutnOptions: 4,
		value: 16,
	},
	{
		id: "4",
		name: SizeEnum.GG,
		amountCreams: 3,
		amoutnOptions: 5,
		value: 19,
	},
];

export const mockedOptions: Options = [
	{
		name: "M&M",
		id: "1",
		value: 2,
		amount: 0,
		unit: "Pacotes",
	},
	{
		name: "Mousse Morango",
		id: "2",
		value: 2.5,
		amount: 0,
		unit: "Morangos",
	},
	{
		name: "Ovomaltine",
		id: "3",
		value: 1,
		amount: 0,
		unit: "Pacotes",
	},
	{
		name: "Choco Power",
		id: "4",
		value: 1,
		amount: 0,
		unit: "Pacotes",
	},
	{
		name: "Leite em pó",
		id: "5",
		value: 1,
		amount: 0,
		unit: "Sacos",
	},
	{
		name: "Farinha Lactea",
		id: "6",
		value: 1,
		amount: 0,
		unit: "Pacotes",
	},
	{
		name: "Granola",
		id: "7",
		value: 1,
		amount: 0,
		unit: "gramas",
	},
];
