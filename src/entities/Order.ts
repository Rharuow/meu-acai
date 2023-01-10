export type Order = {
	id: string;
	product_id: string;
	user_id: string;
	job_day_id: string;
	payment_method: "PIX" | "Cartão" | "Espécie" | "Crédito" | "Débito";
	payment_date: Date;
	value: number;
	created_at: Date;
};
