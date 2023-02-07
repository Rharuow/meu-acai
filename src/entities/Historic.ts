import { JobDay } from "./JobDay";
import { Order } from "./Product";
import { User, UserMoked } from "./User";

export type Historic = Array<
	{
		id: string;
		order_id: string;
		user_id: string;
		job_day_id: string;
		payment_method: "PIX" | "Cartão" | "Espécie" | "Crédito" | "Débito";
		payment_date: string;
		value: number;
		created_at: string;
		user: User;
		order: Order;
		jobDay: JobDay;
	} & Order &
		JobDay &
		User
>;

export const mockedHistory: Historic = [
	// {
	// 	id: "1",
	// 	address: UserMoked.address,
	// },
];
