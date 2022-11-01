import Head from "next/head";

import { Form } from "../components/Form";
import { Hero } from "../components/Hero";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Space Travels</title>
			</Head>
			<Hero />
			<Form />
		</div>
	);
}
