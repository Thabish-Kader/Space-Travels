import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IBookings, IRegister } from "../interface/Interface";
import type { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async () => {
	const register = await prisma.book.findMany({
		select: {
			name: true,
			email: true,
			destination: true,
			message: true,
			ticket: true,
			id: true,
		},
	});

	return { props: { register } };
};

const Bookings = ({ register }: IRegister) => {
	const router = useRouter();
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <h1>Loading...</h1>;
	}
	// Allows only autheticated users to access this page
	if (status === "unauthenticated") {
		return (
			<div className="flex h-screen w-full flex-col items-center justify-center">
				<h1 className="text-4xl font-bold uppercase text-red-500">
					Access Denied !!!!
				</h1>
				<p className="mt-1 text-2xl">
					Please Log in to access this page
				</p>
			</div>
		);
	}
	const TicketType = (type: String) => {
		switch (type) {
			case "premium":
				return "bg-yellow-500 text-yellow-800";
			case "standard":
				return "bg-green-500 text-green-800";
			case "budget":
				return "bg-black border text-white";
		}
	};

	const destinationType = (type: String) => {
		switch (type) {
			case "mars":
				return "bg-red-500 text-red-800";
			case "saturn":
				return "bg-blue-500 text-blue-800";
			case "neptune":
				return "bg-purple-400 text-purple-800";
		}
	};

	return (
		<div className="booking-img flex h-screen  w-full flex-col items-center justify-center bg-cover bg-no-repeat">
			<main className="flex h-auto flex-col items-center justify-center">
				<div className=" mx-auto max-w-screen-lg px-4">
					<h1 className="mb-5 text-center text-3xl font-bold uppercase tracking-wide text-white">
						Bookings
					</h1>
					<div className="flex flex-col">
						<div className=" overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="inline-block min-w-full py-2  sm:px-6 lg:px-8">
								<div className="overflow-hidden rounded-lg border">
									<table className="min-w-full ">
										<thead className="bg-black/75">
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

										<tbody className=" bg-black/60">
											{register?.map((data) => (
												<tr
													key={data.id}
													className="border"
												>
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
																data.ticket
															)}`}
														>
															{data.ticket}
														</span>
													</td>
													<td className="flex justify-between whitespace-nowrap px-6 py-4 capitalize">
														<span
															className={`inline-block flex-shrink-0 rounded-full p-2 px-3 text-sm font-bold ${destinationType(
																data.destination
															)}`}
														>
															{data.destination}
														</span>
														<button className="ml-2 rounded-lg  border p-2 text-white duration-500 hover:scale-110 hover:bg-white hover:text-black">
															<Link
																href={`/bookings/${data.id}`}
															>
																Edit
															</Link>
														</button>
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
