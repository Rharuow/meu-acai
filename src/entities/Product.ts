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

export type Size = {
	id: string;
	name: string;
};

export type Sizes = {
	P: {
		value: 10;
		creams: [Cream, Cream];
		options: [Option, Option, Option];
	};
	M: {
		value: 13;
		creams: [Creams, Creams];
		options: [Option, Option, Option];
	};
	G: {
		value: 16;
		creams: [Creams, Creams];
		options: [Option, Option, Option, Option];
	};
	GG: {
		value: 19;
		creams: [Creams, Creams, Creams];
		options: [Option, Option, Option, Option, Option];
	};
};

export type Product = {
	id: string;
	size: Size;
	extras?: Options;
};

export const mockedOptions: Options = [
	{
		name: "M&M",
		id: 1,
		value: 2,
		amount: 0,
		unit: "Pacotes",
	},
	{
		name: "Mousse Morango",
		id: 2,
		value: 2,
		amount: 0,
		unit: "Morangos",
	},
	{
		name: "Ovomaltine",
		id: 3,
		value: 1,
		amount: 0,
		unit: "Pacotes",
	},
	{
		name: "Choco Power",
		id: 4,
		value: 1,
		amount: 0,
		unit: "Pacotes",
	},
	{
		name: "Leite em pó",
		id: 5,
		value: 1,
		amount: 0,
		unit: "Sacos",
	},
	{
		name: "Farinha Lactea",
		id: 6,
		value: 1,
		amount: 0,
		unit: "Pacotes",
	},
	{
		name: "Granola",
		id: 7,
		value: 1,
		amount: 0,
		unit: "gramas",
	},
];

export const mockedCreams: Creams = [
	{ name: "Açai", id: "1", amount: 3, unit: "Litros" },
	{ name: "Cupuaçu", id: "1", amount: 2, unit: "Litros" },
	{ name: "Ninho", id: "1", amount: 2, unit: "Pacotes" },
	{ name: "Oreo", id: "1", amount: 4, unit: "Caixa" },
	{ name: "Ovomaltine", id: "1", amount: 1, unit: "Litros" },
	{ name: "Ninho Trufa", id: "1", amount: 2, unit: "Litros" },
	{ name: "Amendoim e Castanha", id: "1", amount: 3, unit: "Litros" },
];
