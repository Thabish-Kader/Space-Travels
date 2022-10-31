import Head from "next/head";
import Bookings from "../components/Bookings";
import { Form } from "../components/Form";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Space Travels</title>
			</Head>
			<Form />
			<Bookings />
		</div>
	);
}
