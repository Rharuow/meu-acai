import { JobDay, mockedJobDay } from "./JobDay";
import { mockedOrder, Order } from "./Product";
import { mockedUser, User } from "./User";

export type Historic = Array<{
	id: string;
	order_id: string;
	user_id: string;
	job_day_id: string;
	payment_method?: "PIX" | "Cartão" | "Espécie";
	payment_date?: string;
	created_at: string;
	user: User;
	order: Order;
	jobDay: JobDay;
}>;

export const mockedHistory: Historic = [
	{
		id: "1",
		job_day_id: "1",
		order_id: "1",
		user_id: "1",
		created_at: "07/01/2023",
		payment_date: "07/01/2023",
		payment_method: "PIX",
		jobDay: mockedJobDay,
		user: mockedUser,
		order: mockedOrder,
	},
	{
		id: "2",
		job_day_id: "1",
		order_id: "1",
		user_id: "1",
		created_at: "08/01/2023",
		payment_date: "08/01/2023",
		payment_method: "Cartão",
		jobDay: mockedJobDay,
		user: mockedUser,
		order: mockedOrder,
	},
	{
		id: "3",
		job_day_id: "1",
		order_id: "1",
		user_id: "1",
		created_at: "09/01/2023",
		payment_date: "09/01/2023",
		payment_method: "Cartão",
		jobDay: mockedJobDay,
		user: mockedUser,
		order: mockedOrder,
	},
	{
		id: "4",
		job_day_id: "1",
		order_id: "1",
		user_id: "1",
		created_at: "10/01/2023",
		payment_date: "10/01/2023",
		payment_method: "Cartão",
		jobDay: mockedJobDay,
		user: mockedUser,
		order: mockedOrder,
	},
	{
		id: "5",
		job_day_id: "1",
		order_id: "1",
		user_id: "1",
		created_at: "11/01/2023",
		payment_date: "11/01/2023",
		payment_method: "Espécie",
		jobDay: mockedJobDay,
		user: mockedUser,
		order: mockedOrder,
	},
	{
		id: "6",
		job_day_id: "1",
		order_id: "1",
		user_id: "1",
		created_at: "12/01/2023",
		jobDay: mockedJobDay,
		user: mockedUser,
		order: mockedOrder,
	},
	{
		id: "7",
		job_day_id: "1",
		order_id: "1",
		user_id: "1",
		created_at: "12/01/2023",
		jobDay: mockedJobDay,
		user: mockedUser,
		order: mockedOrder,
	},
];
