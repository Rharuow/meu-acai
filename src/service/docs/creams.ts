import { Creams } from "@/src/entities/Product";
import { getDocs, orderBy, query } from "firebase/firestore";
import { sizeCollection } from "../firebase";

export const getCreams = async () => {
	const q = query(sizeCollection, orderBy("name"));
	return (await getDocs(q)).docs.map((document) => ({
		...document.data(),
		id: document.id,
	})) as Creams;
};
