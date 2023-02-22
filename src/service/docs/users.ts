import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import Cookies from "js-cookie";

import { User } from "../../entities/User";

import { db, userCollection } from "../firebase";

export const getUsers = async () =>
	(await getDocs(userCollection)).docs.map((document) => ({
		...document.data(),
		id: document.id,
	}));

export const createUser = async (data: User) =>
	await addDoc(userCollection, data);

export const deleteUser = async (id: string) =>
	await deleteDoc(doc(db, "users", id));

export const createSession = async (data: User) => {
	const q = query(
		collection(db, "users"),
		where("phone", "==", data.phone),
		where("password", "==", data.password)
	);

	const user = (await getDocs(q)).docs[0]?.data();

	if (user) return Cookies.set("user", JSON.stringify(user));
	return false;
};