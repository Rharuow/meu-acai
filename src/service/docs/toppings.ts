import { Toppings } from "@/src/entities/Product";
import { getDocs, orderBy, query } from "firebase/firestore";
import { toppingCollection } from "../firebase";

export const getToppings = async () => {
	const q = query(toppingCollection, orderBy("name"));
	return (await getDocs(q)).docs.map((document) => ({
		...document.data(),
		id: document.id,
	})) as Toppings;
};
