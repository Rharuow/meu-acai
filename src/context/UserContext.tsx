import React, { createContext, ReactNode, useContext } from "react";
import { mockedUser, User } from "../entities/User";

const UserContext = createContext({} as User);

export const useUserContext = () => useContext(UserContext);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const user = mockedUser;

	return (
		<UserContext.Provider value={{ ...user }}>{children}</UserContext.Provider>
	);
};

export default UserProvider;
