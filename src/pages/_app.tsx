import type { AppProps } from "next/app";
import LayoutProveider from "../context/LayoutContext";
import "../styles/main.scss";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<LayoutProveider>
			<Component {...pageProps} />
		</LayoutProveider>
	);
}