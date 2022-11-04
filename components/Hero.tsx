import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import space from "../public/assets/space.jpg";

export const Hero = () => {
	const { data: session } = useSession();
	console.log(session);
	return (
		<section
			id="home"
			className="hero-img relative top-0 left-0 right-0 bottom-0 flex h-screen w-full flex-col  items-center justify-center bg-cover bg-fixed bg-center bg-no-repeat"
		>
			<div className="absolute left-32 top-[40%] h-full ">
				{session?.user && (
					<h1 className="text-5xl font-bold tracking-wider">
						Welcome{" "}
						<span className=" tracking-wider text-orange-500">
							{session?.user?.name}
						</span>
					</h1>
				)}
				<h1 className="py-5 text-left text-4xl font-medium">
					Space Travels
				</h1>
				<h1 className="text-left text-3xl">
					This is one small step for man, one giant leap for mankind
				</h1>
				<p className="w-[70%] text-gray-500">
					Space exploration allows us to prove or disprove scientific
					theories developed on Earth. Studying the solar system, for
					example, has brought us insights into such phenomena as
					gravity, the magnetosphere, the atmosphere, fluid dynamics
					and the geological evolution of other planets.
				</p>
				<button className="mt-5 w-[250px] rounded-lg border-2 p-2 text-2xl font-bold duration-500 hover:scale-110 hover:bg-orange-500 hover:text-black">
					<Link href="/#register">Register Now</Link>
				</button>
			</div>
		</section>
	);
};
