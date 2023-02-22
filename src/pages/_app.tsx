import type { AppProps } from "next/app";
import LayoutProveider from "../context/LayoutContext";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
import "../styles/main.scss";
import SessionProvider from "../context/SessionContext";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider>
			<LayoutProveider>
				<Component {...pageProps} />
			</LayoutProveider>
		</SessionProvider>
	);
}
