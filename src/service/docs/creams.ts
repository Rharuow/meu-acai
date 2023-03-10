import { Cream, Creams } from "@/src/entities/Product";
import { getDocs, orderBy, query, where } from "firebase/firestore";
import { creamCollection } from "../firebase";

export const getCreams = async () => {
	const q = query(creamCollection, where("visible", "==", true));
	return (await getDocs(q)).docs
		.map(
			(document) =>
				({
					...document.data(),
					id: document.id,
				} as Cream)
		)
		.sort((current, next) => {
			if (current.name < next.name) return -1;
			if (current.name > next.name) return 1;
			return 0;
		}) as Creams;
};
