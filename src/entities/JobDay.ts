export type JobDay = {
	id: string;
	date: Date;
	status: "On" | "Off" | "Pending";
	started_at: Date;
	finished_at: Date;
};
