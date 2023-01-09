import Head from "next/head";
import React, { createContext, ReactNode, useContext, useState } from "react";

const LayoutContext = createContext({});

export const useLayoutContext = () => useContext(LayoutContext);

const LayoutProveider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [language, setLanguage] = useState<"pt-BR" | "US">("pt-BR");
	const [theme, setTheme] = useState<"ligth" | "dark">("ligth");
	return (
		<LayoutContext.Provider value={{ language, setLanguage, theme, setTheme }}>
			<Head>
				<title>Meu Açai</title>
			</Head>
			<div className="min-h-100vh bg-primary">{children}</div>
		</LayoutContext.Provider>
	);
};

export default LayoutProveider;
