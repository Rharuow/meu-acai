import { getDocs } from "firebase/firestore";
import { roleCollection } from "../firebase";

export const getRoles = async () =>
	(await getDocs(roleCollection)).docs.map((document) => ({
		...document.data(),
		id: document.id,
	}));
