import Head from "next/head";
import React, { createContext, ReactNode, useContext, useState } from "react";
import HomePage from "../pages";
import { useSessionContext } from "./SessionContext";

interface ILayoutContext {
	language: "pt-BR" | "US";
	setLanguage: React.Dispatch<React.SetStateAction<"pt-BR" | "US">>;
	theme: "ligth" | "dark";
	setTheme: React.Dispatch<React.SetStateAction<"ligth" | "dark">>;
	setClassWrapper: React.Dispatch<React.SetStateAction<string>>;
}

const LayoutContext = createContext({} as ILayoutContext);

export const useLayoutContext = () => useContext(LayoutContext);

const LayoutProveider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [language, setLanguage] = useState<"pt-BR" | "US">("pt-BR");
	const [theme, setTheme] = useState<"ligth" | "dark">("ligth");
	const [classWrapper, setClassWrapper] = useState(" ");

	const { user } = useSessionContext();

	return (
		<LayoutContext.Provider
			value={{ language, setLanguage, theme, setTheme, setClassWrapper }}
		>
			<Head>
				<title>Meu Açai</title>
			</Head>
			<div className={`min-h-100vh bg-primary ${classWrapper}`}>
				{user ? children : <HomePage />}
			</div>
		</LayoutContext.Provider>
	);
};

export default LayoutProveider;
