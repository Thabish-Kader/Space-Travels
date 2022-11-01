import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormInput } from "../interface/Interface";
import { useRouter } from "next/router";

export const Form = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		formState,
		formState: { isSubmitSuccessful },
	} = useForm<IFormInput>();

	async function createData(data: IFormInput) {
		const response = await fetch("http://localhost:3000/api/createTicket", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		return response.json();
	}
	const onSubmit: SubmitHandler<IFormInput> = (data, e) => {
		e?.preventDefault();
		try {
			createData(data);
			router.push("/bookings");
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset({ name: "", email: "", message: "" });
		}
	}, [formState, reset]);

	return (
		<section className="flex h-screen w-full flex-col items-center justify-center bg-black">
			<div className="  min-h-[550px] min-w-[400px] bg-[#131415] p-10 ">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col space-y-5 text-white"
				>
					<h1 className="text-center text-2xl font-bold uppercase tracking-wider text-blue-500">
						Enter Details here
					</h1>
					<input
						{...register("name", { required: true })}
						type="text"
						placeholder="Name"
						className={`rounded-lg border  bg-transparent p-2 ${
							errors.name
								? "border-red-500 placeholder-red-500"
								: "border-blue-600 placeholder-blue-500"
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
						className={`rounded-lg border  bg-transparent p-2 ${
							errors.email
								? "border-red-500 placeholder-red-500"
								: "border-blue-600 placeholder-blue-500"
						}`}
					/>
					{errors.email && (
						<p className=" uppercase tracking-wider text-red-500">
							Email is required !!
						</p>
					)}

					<select
						{...register("ticket")}
						defaultValue="Budget"
						className="rounded-lg border border-blue-500 bg-transparent p-2 text-blue-500 placeholder-blue-500 "
					>
						<option value="premium">Premium</option>
						<option value="standard">Standard</option>
						<option value="budget">Budget</option>
					</select>
					<select
						{...register("destination")}
						className="rounded-lg border border-blue-500 bg-transparent p-2 text-blue-500"
					>
						<option value="mars">Mars</option>
						<option value="saturn">Saturn</option>
						<option value="neptune">Neptune</option>
					</select>
					<textarea
						{...register("message")}
						className="rounded-lg border border-blue-500 bg-transparent p-2 placeholder-blue-500"
						placeholder="Message"
					></textarea>
					<button className="w-full rounded-lg bg-[#1e40af] p-2 text-white duration-500 hover:scale-110 hover:bg-blue-500">
						Submit
					</button>
				</form>
			</div>
		</section>
	);
};
