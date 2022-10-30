import React from "react";

export const Form = () => {
	return (
		<section className="flex h-screen w-full flex-col items-center justify-center bg-black">
			{/* // <section className="h-screen bg-black">
		// 	<div className="mx-auto max-w-md px-4">
		// 		<h1 className="mb-10 text-center font-bold tracking-wider text-white">
		// 			Submit Your Feedback!
		// 		</h1>
		// 		<form
		// 			action=""
		// 			className="grid grid-cols-1 gap-y-6 rounded-lg bg-[#131415] p-10 shadow-lg"
		// 		>
		// 			<div>
		// 				<label htmlFor="name" className="sr-only">
		// 					Full name
		// 				</label>
		// 				<div className="relative">
		// 					<input
		// 						type="text"
		// 						name="name"
		// 						id="name"
		// 						autoComplete="name"
		// 						placeholder="Full name"
		// 						className="mb-2 block w-full rounded-md border border-gray-700 bg-[#131415] py-3 px-4 text-white  placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
		// 					/>
		// 				</div>
		// 				<div className="relative">
		// 					<label htmlFor="email" className="sr-only">
		// 						Email
		// 					</label>
		// 					<input
		// 						type="email"
		// 						name="email"
		// 						id="email"
		// 						placeholder="Email"
		// 						className="mb-2 block w-full rounded-md border border-gray-700 bg-[#131415] py-3 px-4   text-white placeholder-gray-500 shadow-sm focus:ring-blue-500"
		// 					/>
		// 				</div>
		// 				<div>
		// 					<label htmlFor="phone" className="sr-only">
		// 						Feedback Type
		// 					</label>
		// 					<select
		// 						id="feedbackType"
		// 						name="feedbackType"
		// 						className="mt-1 block w-full rounded-md border border-gray-700 bg-[#131415] py-2 pl-3 pr-10 text-base text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
		// 						defaultValue="FEEDBACK"
		// 					>
		// 						<option>FEEDBACK</option>
		// 						<option>ISSUE</option>
		// 						<option>IDEA</option>
		// 					</select>
		// 				</div>
		// 				<div className="relative">
		// 					<label htmlFor="message" className="sr-only">
		// 						Message
		// 					</label>
		// 					<textarea
		// 						id="message"
		// 						name="message"
		// 						rows={4}
		// 						className="my-2 block w-full rounded-md border border-gray-700 bg-[#131415] py-3 px-4 text-white   placeholder-gray-500 shadow-sm"
		// 						placeholder="Message"
		// 						defaultValue={""}
		// 					/>
		// 				</div>
		// 				<button className="my-2 w-full rounded bg-blue-500 p-2 text-white">
		// 					Submit
		// 				</button>
		// 			</div>
		// 		</form>
		// 	</div> */}
			<div className=" min-h-[550px] min-w-[400px] bg-[#131415] p-10 ">
				<form action="" className="flex flex-col space-y-5 text-white">
					<h1 className="text-center text-2xl font-bold text-white">
						Enter Details here
					</h1>
					<input
						type="text"
						placeholder="Name"
						className="rounded-lg border border-gray-600 bg-transparent p-2 "
					/>
					<input
						type="text"
						placeholder="Email"
						className="rounded-lg border border-gray-600 bg-transparent p-2"
					/>
					<select
						name=""
						id="ticket"
						defaultValue="Budget"
						className="rounded-lg border border-gray-600 bg-transparent p-2 text-gray-400 "
					>
						<option value="premium">Premium</option>
						<option value="standard">Standard</option>
						<option value="budget">Budget</option>
					</select>
					<select
						name=""
						id=""
						className="rounded-lg border border-gray-600 bg-transparent p-2 text-gray-400"
					>
						<option value="Mars">Mars</option>
						<option value="Saturn">Saturn</option>
						<option value="neptune">Neptune</option>
					</select>
					<textarea
						className="rounded-lg border border-gray-600 bg-transparent p-2"
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
