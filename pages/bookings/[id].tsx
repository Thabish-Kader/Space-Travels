import { GetServerSideProps } from "next";
import React from "react";
import { RegisterProps } from "../../interface/Interface";
import prisma from "../../lib/prisma";
import { useRouter } from "next/router";

const singleBooking = ({ register }: RegisterProps) => {
	const { id, name, email, message, destination, ticket } = register;
	const router = useRouter();

	async function deleteBooking(id: string) {
		try {
			fetch(`http://localhost:3000/api/bookings/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			router.push("/bookings");
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="flex h-screen w-full flex-col items-center justify-center">
			<div className="justif-center flex h-auto min-w-[50%] flex-col items-center rounded-lg border p-2">
				<h1 className="py-2 text-2xl font-bold capitalize text-white">
					{name}
				</h1>
				<h2 className="pb-2 text-lg text-white">
					Signed in as <span className="text-green-500">{email}</span>
				</h2>
				<div className="flex w-full justify-between text-white">
					<p>Destination</p>
					<p className="textmd uppercase text-blue-500">
						{destination}
					</p>
				</div>
				<div className="flex w-full justify-between text-white">
					<p>Ticket Type</p>
					<p className="textmd uppercase text-yellow-500">{ticket}</p>
				</div>

				<div className="flex h-auto w-full justify-between py-2 text-white">
					<p>Message</p>
					<p className="textmd uppercase text-white">{message}</p>
				</div>

				<div className="flex w-full justify-between py-2 text-white">
					<button
						onClick={() => deleteBooking(id)}
						className="mx-1 w-full rounded-lg bg-red-500 p-2 font-bold text-white duration-500 hover:scale-105 hover:bg-red-300"
					>
						Delete
					</button>
					<button className="hover mx-1 w-full rounded-lg bg-yellow-500 p-2 font-bold text-white duration-500 hover:scale-105 hover:bg-yellow-300">
						Edit
					</button>
				</div>
			</div>
		</div>
	);
};

export default singleBooking;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.params?.id as string;
	const register = await prisma.book.findUnique({
		where: {
			id: id,
		},
		select: {
			message: true,
			email: true,
			name: true,
			destination: true,
			ticket: true,
			id: true,
		},
	});
	return {
		props: { register },
	};
};
