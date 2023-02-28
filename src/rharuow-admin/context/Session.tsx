import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { User } from "../../entities/User";

interface ISessionContext {
	sessionLoading: boolean;
	setSessionLoading: React.Dispatch<React.SetStateAction<boolean>>;
	user: User | undefined;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const SessionContext = createContext({} as ISessionContext);

export const useSessionContext = () => useContext(SessionContext);

function SessionProvider({ children }: { children: React.ReactNode }) {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<User>();

	const router = useRouter();

	useEffect(() => {
		const userCookied = JSON.parse(Cookies.get("user") || "false") as User;

		if (userCookied && !user) {
			console.log("Not have user YET");
			setUser(userCookied);
			router.push("/dashboard");
		}

		if (
			!userCookied &&
			router.pathname !== "/signup" &&
			router.pathname !== "/recovery" &&
			router.pathname !== "/confirmation"
		) {
			console.log("Not have user");
			setUser(undefined);
			router.push("/");
		}

		setLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, Cookies]);

	return (
		<SessionContext.Provider
			value={{
				sessionLoading: loading,
				setSessionLoading: setLoading,
				user,
				setUser,
			}}
		>
			{loading ? (
				<div className="d-flex justify-content-center align-items-center h-100vh">
					<ReactLoading type="spinningBubbles" color="#46295a" />
				</div>
			) : (
				children
			)}
		</SessionContext.Provider>
	);
}

export default SessionProvider;
