import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
import "../styles/main.scss";
import SessionProvider from "../rharuow-admin/context/Session";
import LayoutProvider from "../rharuow-admin/context/Layout";
import Header from "../components/Header";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider>
			<LayoutProvider CustomNav={<Header />}>
				<Component {...pageProps} />
			</LayoutProvider>
		</SessionProvider>
	);
}
