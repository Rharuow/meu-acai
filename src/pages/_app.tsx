import type { AppProps } from "next/app";
import LayoutProveider from "../context/LayoutContext";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
import "../styles/main.scss";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<LayoutProveider>
			<Component {...pageProps} />
		</LayoutProveider>
	);
}
