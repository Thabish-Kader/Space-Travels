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
		<section className="hero-img relative top-0 left-0 right-0 bottom-0 flex h-screen w-full flex-col  items-center justify-center bg-cover bg-fixed bg-center bg-no-repeat">
			<div className="  min-h-[550px] min-w-[400px] border-2 bg-black/30  p-10 ">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col space-y-5 text-white"
				>
					<h1 className="text-center text-2xl font-bold uppercase tracking-wider text-white">
						Enter Details here
					</h1>
					<input
						{...register("name", { required: true })}
						type="text"
						placeholder="Name"
						className={`rounded-lg border  bg-transparent p-2 ${
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
						className={`rounded-lg border  bg-transparent p-2 ${
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
						defaultValue="Budget"
						className="rounded-lg border border-white bg-transparent p-2 text-white "
					>
						<option value="premium">Premium</option>
						<option value="standard">Standard</option>
						<option value="budget">Budget</option>
					</select>
					<select
						{...register("destination")}
						className="rounded-lg border border-white bg-transparent p-2 text-white"
					>
						<option value="mars">Mars</option>
						<option value="saturn">Saturn</option>
						<option value="neptune">Neptune</option>
					</select>
					<textarea
						{...register("message")}
						className="rounded-lg border border-white bg-transparent p-2 placeholder-white"
						placeholder="Message"
					></textarea>
					<button className="b w-full rounded-lg border-2 p-2 text-white duration-500 hover:scale-110 hover:scale-105 hover:bg-white hover:text-black">
						Submit
					</button>
				</form>
			</div>
		</section>
	);
};
