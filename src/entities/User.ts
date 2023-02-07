const { DateTime } = require("luxon");

export type User = {
	id: string;
	name: string;
	brithday?: Date | string;
	phone: string;
	address: {
		house: number;
		square: number;
	};
	password: string;
	wallet: number;
	members?: Array<{ name: string; brithday?: Date | string }>;
	created_at: Date;
};

export const mockedUser: User = {
	id: "1",
	name: "Harysson Soares",
	phone: "+55084981758502",
	address: {
		house: 39,
		square: 5,
	},
	brithday: "17/05/1991",
	password: "123123123",
	wallet: 0.0,
	created_at: DateTime.fromSQL(),
};
