export type JobDay = {
	id: string;
	date: string;
	status: "On" | "Off" | "Pending";
	started_at: string;
	finished_at: string;
};
