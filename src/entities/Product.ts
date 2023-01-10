export type Options = {
	"M&M": {
		id: 1;
		value: 2;
	};
	"Mousse Morango": {
		id: 2;
		value: 2;
	};
	Ovomaltine: {
		id: 3;
		value: 1;
	};
	"Choco Power": {
		id: 4;
		value: 1;
	};
	"Leite em pó": {
		id: 5;
		value: 1;
	};
	"Farinha Lactea": {
		id: 6;
		value: 1;
	};
	Granola: {
		id: 7;
		value: 1;
	};
	Jujuba: {
		id: 8;
		value: 1;
	};
	Banana: {
		id: 9;
		value: 1;
	};
	Paçoquinha: {
		id: 10;
		value: 1;
	};
	Coco: {
		id: 11;
		value: 1;
	};
	"Amendoim Triturado": {
		id: 12;
		value: 1;
	};
	Fini: {
		id: 13;
		value: 2;
	};
	"Leite Moça": {
		id: 14;
		value: 2;
	};
	Nutela: {
		id: 15;
		value: 3;
	};
	"Calda de Morando": {
		id: 16;
		value: 2;
	};
	"Calda de Chocolate": {
		id: 17;
		value: 2;
	};
	Oreo: {
		id: 18;
		value: 2;
	};
	"Gotas de Chocolate": {
		id: 19;
		value: 1;
	};
};

export type Creams =
	| "Açai"
	| "Cupuaçu"
	| "Ninho"
	| "Oreo"
	| "Ovomaltine"
	| "Ninho Trufado"
	| "Amendoim e Castanha";

export type Size = {
	P: {
		value: 10;
		creams: [Creams, Creams];
		options: [Options | Options | Options];
	};
	M: {
		value: 13;
		creams: [Creams, Creams];
		options: [Options | Options | Options];
	};
	G: {
		value: 16;
		creams: [Creams, Creams];
		options: [Options | Options | Options | Options];
	};
	GG: {
		value: 19;
		creams: [Creams, Creams, Creams];
		options: [Options | Options | Options | Options | Options];
	};
};

export type Product = {
	id: string;
	size: Size;
	extras?: Array<Options>;
};
