export type User = {
	name: string;
	phone: string;
	address: {
		house: number;
		square: number;
	};
	password: string;
};

export const UserMoked: User = {
	name: "Fulano de tal",
	phone: "+55084981758502",
	address: {
		house: 39,
		square: 5,
	},
	password: "123123123",
};
