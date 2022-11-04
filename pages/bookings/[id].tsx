import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { IFormInput, RegisterProps } from "../../interface/Interface";
import prisma from "../../lib/prisma";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

const SingleBooking = ({ bookingData }: RegisterProps) => {
	const { id, name, email, message, destination, ticket } = bookingData;
	const router = useRouter();
	const [show, setShow] = useState<boolean>(true);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		formState,
		formState: { isSubmitSuccessful },
	} = useForm<IFormInput>();

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

	async function updateData(data: IFormInput) {
		const response = await fetch(
			`http://localhost:3000/api/bookings/${id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		if (response.status < 300) {
			refreshData();
		}
		return response.json();
	}

	const onSubmit: SubmitHandler<IFormInput> = (data, e) => {
		e?.preventDefault();
		try {
			updateData(data);
		} catch (error) {
			console.error(error);
		}
	};

	// Call this function whenever you want to refresh props!
	// https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
	const refreshData = () => {
		router.replace(router.asPath);
	};

	return (
		<div className="booking-img flex h-screen w-full flex-col items-center justify-center bg-cover bg-no-repeat">
			<div className="flex h-auto  flex-col items-center justify-center rounded-lg border bg-black/75 p-2 font-bold">
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
					<button
						onClick={() => setShow(!show)}
						className="hover mx-1 w-full rounded-lg bg-yellow-500 p-2 font-bold text-white duration-500 hover:scale-105 hover:bg-yellow-300"
					>
						Edit
					</button>
				</div>
			</div>

			{/* Edit Popup */}

			<div
				className={
					show
						? `absolute top-[-100%]  z-10   w-[50%]  bg-black duration-1000`
						: `absolute top-[30%]  z-10  w-[50%]   bg-black duration-1000`
				}
			>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex h-auto min-w-[50%] flex-col items-center justify-center rounded-lg border  p-2 text-white"
				>
					<h1 className="text-center text-2xl font-bold uppercase tracking-wider text-white">
						Update
					</h1>
					<input
						{...register("name", { required: true })}
						type="text"
						placeholder="Name"
						className={`my-2 w-full rounded-lg border bg-transparent p-2 ${
							errors.name
								? "border-red-500 placeholder-red-500"
								: "border-white placeholder-white"
						}`}
					/>
					{errors.name && (
						<p className="uppercase tracking-wider text-red-500">
							Name is required !!
						</p>
					)}
					<input
						{...register("email", { required: true })}
						type="email"
						placeholder="Email"
						className={`my-2 w-full rounded-lg border  bg-transparent p-2 ${
							errors.email
								? "border-red-500 placeholder-red-500"
								: "border-white placeholder-white"
						}`}
					/>
					{errors.email && (
						<p className=" uppercase tracking-wider text-red-500">
							Email is required !!
						</p>
					)}
					<select
						{...register("ticket")}
						className="my-2 w-full rounded-lg border border-white bg-transparent p-2 text-white "
					>
						<option value="premium">Premium</option>
						<option value="standard">Standard</option>
						<option value="budget">Budget</option>
					</select>
					<select
						{...register("destination")}
						className="mb-2 w-full rounded-lg border border-white bg-transparent p-2 text-white"
					>
						<option value="mars">Mars</option>
						<option value="saturn">Saturn</option>
						<option value="neptune">Neptune</option>
					</select>
					<textarea
						{...register("message")}
						className="my-2 w-full rounded-lg border border-white bg-transparent p-2 placeholder-white"
						placeholder="Message"
					></textarea>
					<button
						onClick={() => setShow(!show)}
						className="hover mx-1 w-full rounded-lg bg-orange-500 p-2 font-bold text-white duration-500 hover:scale-105 hover:bg-orange-300"
					>
						Update
					</button>
				</form>
				<button
					onClick={() => setShow(!show)}
					className="hover m-1 w-full rounded-lg border p-2 font-bold text-white duration-500 hover:scale-105 hover:bg-white hover:text-black"
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default SingleBooking;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.params?.id as string;
	const bookingData = await prisma.book.findUnique({
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
		props: { bookingData },
	};
};
