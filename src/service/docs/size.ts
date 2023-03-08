import { Size } from "@/src/entities/Product";
import { getDocs, orderBy, query } from "firebase/firestore";
import { sizeCollection } from "../firebase";

export const getSizes = async () => {
	const q = query(sizeCollection, orderBy("value"));
	return (await getDocs(q)).docs.map((document) => ({
		...document.data(),
		id: document.id,
	})) as Array<Size>;
};
