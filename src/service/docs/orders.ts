import { Order } from "@/src/entities/Order";
import { addDoc } from "firebase/firestore";
import { orderCollection } from "../firebase";

export const createOrder = async (data: Order) => {
	try {
		await addDoc(orderCollection, data);
		return true;
	} catch (error) {
		console.log("error to create order = ", error);
		return false;
	}
};
