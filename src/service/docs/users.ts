import { SHA256 } from "crypto-js";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import Cookies from "js-cookie";

import { User } from "../../entities/User";

import { db, userCollection } from "../firebase";

export const userIsUnique = async (user: User) => {
	const q = query(
		userCollection,
		where("id", "==", user.id),
		where("hashCode", "==", user.hashCode),
		where("phone", "==", user.phone),
		where("name", "==", user.name),
		where("address", "==", user.address)
	);
	try {
		return (await getDocs(q)).docs[0].data();
	} catch (error) {
		return false;
	}
};
export const userIsActive = async (user: User) => {
	const q = query(
		userCollection,
		where("isActive", "==", true),
		user.id
			? where("id", "==", user.id)
			: user.phone
			? where("phone", "==", user.phone)
			: where("name", "==", user.name)
	);
	try {
		const user = (await getDocs(q)).docs[0];
		if (user && user.exists()) return user.data();
		else return false;
	} catch (error: any) {
		throw Error(error.message);
	}
};

export const getUsers = async () =>
	(await getDocs(userCollection)).docs.map((document) => ({
		...document.data(),
		id: document.id,
	})) as Array<User>;

export const createUser = async (data: User) =>
	await addDoc(userCollection, data);

export const deleteUser = async (id: string) =>
	await deleteDoc(doc(db, "users", id));

export const createSession = async (data: User) => {
	const passwordHashed = SHA256(data.password).toString();

	const q = query(
		collection(db, "users"),
		where("phone", "==", data.phone),
		where("password", "==", passwordHashed)
	);

	const user = (await getDocs(q)).docs[0];

	if (user && user.exists()) {
		return user.data().isActive && !user.data().isBloqued
			? user.data()
			: user.data().isBloqued
			? { ...user.data(), type: "UserBloqued", id: user.id }
			: { ...user.data(), type: "UserInactive", id: user.id };
	}
	return false;
};

export const getUser = async ({
	name,
	id,
	phone,
	address,
}: {
	name?: string;
	address?: { house: number; square: number };
	phone?: string;
	id: string;
}) => {
	const q = name
		? query(collection(db, "users"), where("name", "==", name))
		: address
		? query(collection(db, "users"), where("address", "==", address))
		: phone
		? query(collection(db, "users"), where("phone", "==", phone))
		: query(collection(db, "users"), where("id", "==", id));
	const user = (await getDocs(q)).docs[0];
	if (user && user.exists()) return user.data();
	return "Usu??rio n??o encontrado!";
};

export const getUserByCode = async (hashCode: string) => {
	const q = query(collection(db, "users"), where("hashCode", "==", hashCode));
	const user = (await getDocs(q)).docs[0];
	if (user && user.exists()) return { ...user.data(), id: user.id };
	return false;
};

export const getUserByPhone = async (phone: string) => {
	const q = query(collection(db, "users"), where("phone", "==", phone));
	const user = (await getDocs(q)).docs[0];
	if (user && user.exists()) return { ...user.data(), id: user.id };
	return false;
};

export const updateUser = async (id: string, data: any) => {
	const userRef = doc(db, "users", id);
	try {
		await updateDoc(userRef, data);
		return true;
	} catch (error) {
		return false;
	}
};

export const userAlreadyExists = async (phone: string) => {
	const users = await getUsers();
	return !!users.find((user) => user.phone === phone);
};
