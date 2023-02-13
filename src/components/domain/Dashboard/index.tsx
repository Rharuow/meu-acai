import React, { createContext, useContext, useState } from "react";

import Header from "./Header";
import Body from "./Body";

type Content = {
	orders: boolean;
	perfil: boolean;
};

const ContentContext = createContext(
	{} as {
		content: Content;
		setContent: React.Dispatch<React.SetStateAction<Content>>;
	}
);

export const useContentContext = () => useContext(ContentContext);

const Dashboard = () => {
	const [content, setContent] = useState<Content>({
		orders: true,
		perfil: false,
	});
	return (
		<ContentContext.Provider value={{ content, setContent }}>
			<Header />
			<Body />
		</ContentContext.Provider>
	);
};

export default Dashboard;
