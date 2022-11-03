import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "../components/Navbar";
import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";

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
