import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "../components/Navbar";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default function App({
	Component,
	pageProps,
}: AppProps<{
	session: Session;
}>) {
	return (
		<>
			<SessionProvider session={pageProps.session}>
				<Navbar />
				<Component {...pageProps} />
			</SessionProvider>
		</>
	);
}
