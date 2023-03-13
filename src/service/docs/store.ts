import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const storeRef = doc(db, "store", `${process.env.NEXT_PUBLIC_STORE_ID}`);

export const getStatusStore = async () => {
	try {
		return (await getDoc(storeRef)).data()?.status;
	} catch (error) {
		console.log("getStatusStore = ", error);
		return false;
	}
};
