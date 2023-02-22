import Head from "next/head";
import React, { createContext, ReactNode, useContext, useState } from "react";
import SignIn from "../pages/SignIn";
import { useSessionContext } from "./Session";
import Nav from "../components/Nav";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGear } from "@fortawesome/free-solid-svg-icons";

interface ILayoutContext {
	language: "pt-BR" | "US";
	setLanguage: React.Dispatch<React.SetStateAction<"pt-BR" | "US">>;
	theme: "ligth" | "dark";
	setTheme: React.Dispatch<React.SetStateAction<"ligth" | "dark">>;
	setClassWrapper: React.Dispatch<React.SetStateAction<string>>;
}

const LayoutContext = createContext({} as ILayoutContext);

export const useLayoutContext = () => useContext(LayoutContext);

const LayoutProvider: React.FC<{
	children: ReactNode;
	setMenuItems?: Array<{
		text: string;
		icon?: IconDefinition;
		router: string;
	}>;
	CustomNav?: JSX.Element;
}> = ({
	children,
	setMenuItems = [{ text: "Configuração", icon: faGear, router: "/config" }],
	CustomNav,
}) => {
	const [language, setLanguage] = useState<"pt-BR" | "US">("pt-BR");
	const [theme, setTheme] = useState<"ligth" | "dark">("dark");
	const [classWrapper, setClassWrapper] = useState(" ");

	const { user } = useSessionContext();
	return (
		<LayoutContext.Provider
			value={{ language, setLanguage, theme, setTheme, setClassWrapper }}
		>
			<Head>
				<title>Meu Açai</title>
			</Head>
			<main id="rharuow_app">
				{user ? (
					<div className={`min-h-100vh bg-primary ${classWrapper}`}>
						{CustomNav ? CustomNav : <Nav menuItems={setMenuItems} />}
						{children}
					</div>
				) : (
					<SignIn />
				)}
			</main>
		</LayoutContext.Provider>
	);
};

export default LayoutProvider;
