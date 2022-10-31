import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IFormInput, IBookings } from "../interface/Interface";

const Bookings = () => {
	const [bookings, setBookings] = useState<IBookings[]>();
	async function getData() {
		await fetch("http://localhost:3000/api/getBookings")
			.then((response) => response.json())
			.then((data) => setBookings(data));
		console.log(bookings);
	}

	useEffect(() => {
		getData();
	}, []);

	const TicketType = (type: IBookings) => {
		switch (type.ticket) {
			case "premium":
				return "bg-yellow-500 text-yellow-800";
			case "standard":
				return "bg-green-500 text-green-800";
			case "budget":
				return "bg-black text-white";
		}
	};

	const destinationType = (type: IBookings) => {
		switch (type.destination) {
			case "mars":
				return "bg-red-500 text-red-800";
			case "saturn":
				return "bg-blue-500 text-blue-800";
			case "neptune":
				return "bg-purple-400 text-purple-800";
		}
	};

	return (
		<div>
			<main className=" my-36 h-auto">
				<div className=" mx-auto max-w-screen-lg px-4">
					<h1 className="mb-5 text-center text-3xl font-bold uppercase tracking-wide text-white">
						Bookings
					</h1>
					<div className="flex flex-col">
						<div className=" overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="inline-block min-w-full py-2  sm:px-6 lg:px-8">
								<div className="overflow-hidden rounded-lg border-b border-gray-800 shadow">
									<table className="min-w-full  divide-gray-800 ">
										<thead className="bg-gray-800">
											<tr>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xl font-bold uppercase tracking-wider text-white"
												>
													Name
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xl font-bold uppercase tracking-wider text-white"
												>
													Email
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xl font-bold uppercase tracking-wider text-white"
												>
													Message
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xl font-bold uppercase tracking-wider text-white"
												>
													Ticket Type
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xl font-bold uppercase tracking-wider text-white"
												>
													Destination
												</th>
											</tr>
										</thead>
										<tbody className=" bg-gray-700">
											{bookings?.map((data) => (
												<tr key={data.id}>
													<td className="whitespace-nowrap px-6 py-4 text-lg font-medium text-white">
														{data.name}
													</td>
													<td className="whitespace-nowrap px-6 py-4 text-lg text-white">
														<a
															href={`mailto:${data.email}`}
														>
															{data.email}
														</a>
													</td>
													<td className="truncate whitespace-nowrap px-6 py-4 text-lg text-white">
														{data.message}
													</td>
													<td className="whitespace-nowrap px-6 py-4 capitalize">
														<span
															className={`inline-block flex-shrink-0 rounded-full p-2 px-3 text-sm font-bold ${TicketType(
																data
															)}`}
														>
															{data.ticket}
														</span>
													</td>
													<td className="whitespace-nowrap px-6 py-4 capitalize">
														<span
															className={`inline-block flex-shrink-0 rounded-full p-2 px-3 text-sm font-bold ${destinationType(
																data
															)}`}
														>
															{data.destination}
														</span>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Bookings;
