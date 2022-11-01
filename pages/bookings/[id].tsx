import { GetServerSideProps } from "next";
import React from "react";
import { RegisterProps } from "../../interface/Interface";
import prisma from "../../lib/prisma";

const singleBooking = ({ register }: RegisterProps) => {
	const { name, email, message, destination, ticket } = register;
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center">
			<div className="justif-center flex flex-col items-center rounded-lg border p-2">
				<h1 className="py-5 text-2xl font-bold capitalize text-white">
					{name}
				</h1>
				<h2 className="py-2 text-lg text-white">
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

				<div className="flex w-full justify-between py-2 text-white">
					<button className="mx-1 w-full rounded-lg bg-red-500 p-2 font-bold text-white">
						Delete
					</button>
					<button className="mx-1 w-full rounded-lg bg-yellow-500 p-2 font-bold text-white">
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
		},
	});
	return {
		props: { register },
	};
};
