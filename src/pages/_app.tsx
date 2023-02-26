import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
import Header from "../components/Header";
import SignIn from "@/src/pages";
import "../styles/main.scss";
import SessionProvider from "../rharuow-admin/context/Session";
import LayoutProvider from "../rharuow-admin/context/Layout";
import SignUpPage from "./signup";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider>
			<LayoutProvider
				CustomNav={<Header />}
				SignInPage={<SignIn />}
				SignUpPage={<SignUpPage />}
			>
				<Component {...pageProps} />
			</LayoutProvider>
		</SessionProvider>
	);
}
