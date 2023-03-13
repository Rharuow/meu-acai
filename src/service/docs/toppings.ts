import { Toppings } from "@/src/entities/Product";
import { getDocs, orderBy, query, where } from "firebase/firestore";
import { toppingCollection } from "../firebase";

export const getToppings: (isExtra?: boolean) => Promise<Toppings> = async (
	isExtra = false
) => {
	const q = isExtra
		? query(
				toppingCollection,
				where("visible", "==", true),
				where("isExtra", "==", true)
		  )
		: query(
				toppingCollection,
				where("visible", "==", true),
				where("justExtra", "==", false)
		  );
	const toppings = (
		(await getDocs(q)).docs.map((document) => ({
			...document.data(),
			id: document.id,
		})) as Toppings
	).sort((current, next) => {
		if (current.name < next.name) return -1;
		if (current.name > next.name) return 1;
		return 0;
	}) as Toppings;
	return toppings;
};
