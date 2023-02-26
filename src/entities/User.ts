const { DateTime } = require("luxon");

export type Role = {
	id: string;
	name: "user" | "admin";
};

export type User = {
	id?: string;
	name: string;
	birthday?: string;
	phone: string;
	isActive: boolean;
	address: {
		house: number;
		square: number;
	};
	roles: Array<Role>;
	password: string;
	wallet: number;
	members?: Array<{ name: string; birthday?: string }>;
	created_at: Date;
};
