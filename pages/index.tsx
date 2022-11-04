import { useSession } from "next-auth/react";
import Head from "next/head";
import { Login } from "../components/Login";
import { Main } from "../components/Main";

export default function Home() {
	const { data: session } = useSession();

	return (
		<div>
			<Head>
				<title>Space Travels</title>
			</Head>
			{session?.user ? <Main /> : <Login />}
		</div>
	);
}
