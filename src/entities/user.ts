const { DateTime } = require("luxon");

export type User = {
	id: string;
	name: string;
	brithday?: Date;
	phone: string;
	address: {
		house: number;
		square: number;
	};
	password: string;
	wallet: number;
	members?: Array<{ name: string; brithday?: Date }>;
	created_at: Date;
};

export const UserMoked: User = {
	id: "1",
	name: "Fulano de tal",
	phone: "+55084981758502",
	address: {
		house: 39,
		square: 5,
	},
	password: "123123123",
	wallet: 0.0,
	created_at: DateTime.fromSQL(),
};
