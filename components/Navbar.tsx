import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import rocket from "../public/assets/rocket.png";
import { AiFillHome, AiOutlineMenuFold } from "react-icons/ai";
import { FaSpaceShuttle } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { RiRegisteredFill } from "react-icons/ri";
import { SlClose } from "react-icons/sl";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export const Navbar = () => {
	const [nav, setNav] = useState<boolean>(false);
	const [bgColor, setBgColor] = useState<string>("transparen");
	const { data: session } = useSession();
	const router = useRouter();

	const changeColor = () => {
		if (window.scrollY >= 100) {
			setBgColor("black");
		} else {
			setBgColor("transparent");
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", changeColor);
	});

	const logOut = () => {
		signOut();
		router.push("/login");
	};

	return (
		<nav
			style={{ backgroundColor: `${bgColor}` }}
			className="fixed top-0 left-0 z-20  w-full duration-1000 ease-in "
		>
			<div className="item-center m-auto flex max-w-[1240px] items-center justify-between p-4 ">
				{/* left side */}
				<div className="">
					<Image src={rocket} alt="/rocket" height="75" width="75" />
				</div>
				{/* Middel */}
				<div className="">
					<ul className="hidden w-full flex-row sm:flex ">
						<li className="cursor-pointer p-4 text-lg font-bold">
							<div className="flex flex-col items-center justify-center duration-500 hover:scale-125 hover:text-orange-500">
								<Link href="/#home">
									<AiFillHome size={30} />
								</Link>
								<h1>Home</h1>
							</div>
						</li>
						<li className="cursor-pointer p-4 text-lg font-bold">
							<div className="flex flex-col items-center justify-center duration-500 hover:scale-125 hover:text-orange-500">
								<Link href="/bookings">
									<FaSpaceShuttle size={30} />
								</Link>
								<h1>Bookings</h1>
							</div>
						</li>
						<li className="cursor-pointer p-4 text-lg font-bold">
							<div className="flex flex-col items-center justify-center duration-500 hover:scale-125 hover:text-orange-500">
								<Link href="/#register">
									<GiArchiveRegister size={30} />
								</Link>
								<h1>Register</h1>
							</div>
						</li>
					</ul>
				</div>

				{/* right side */}
				{session?.user?.email ? (
					<button
						onClick={logOut}
						className=" hidden rounded-lg border-2 bg-black py-1  px-5 font-bold text-white duration-500 hover:scale-110 hover:bg-orange-500 hover:text-black sm:block"
					>
						Log Out
					</button>
				) : (
					<button className=" hidden rounded-lg border-2 bg-black py-1  px-5 font-bold text-white duration-500 hover:scale-110 hover:bg-orange-500 hover:text-black sm:block">
						<Link href="/login">Sign up</Link>
					</button>
				)}

				<div
					className="z-10 mt-2 block cursor-pointer sm:hidden"
					onClick={() => setNav(!nav)}
				>
					{nav ? (
						<SlClose style={{ color: `white` }} size={30} />
					) : (
						<AiOutlineMenuFold
							style={{ color: `white` }}
							size={30}
						/>
					)}
				</div>
			</div>

			{/* Mobile */}
			<div
				onClick={() => setNav(!nav)}
				className={
					nav
						? "absolute top-0 left-0 right-0 bottom-0 flex h-screen w-full items-center justify-center bg-black text-center duration-300 ease-in sm:hidden"
						: "absolute top-0 left-[-100%] right-0 bottom-0 flex h-screen w-full items-center justify-center bg-black text-center duration-300 ease-in sm:hidden"
				}
			>
				<ul>
					<li
						onClick={() => setNav(!nav)}
						className="p-4 text-4xl duration-500 hover:scale-110 hover:text-orange-500"
					>
						<div className="flex items-center justify-center">
							<AiFillHome className="mx-2" />
							<Link href="/#home">Home</Link>
						</div>
					</li>
					<li
						onClick={() => setNav(!nav)}
						className="p-4 text-4xl duration-500 hover:scale-110 hover:text-orange-500"
					>
						<div className="flex items-center justify-center">
							<FaSpaceShuttle className="mx-2" />
							<Link href="/bookings">Bookings</Link>
						</div>
					</li>
					<li
						onClick={() => setNav(!nav)}
						className="p-4 text-4xl duration-500 hover:scale-110 hover:text-orange-500"
					>
						<div className="flex items-center justify-center">
							<GiArchiveRegister className="mx-2" />
							<Link href="/#register">Register</Link>
						</div>
					</li>
					<li
						onClick={() => setNav(!nav)}
						className="p-4 text-4xl duration-500 hover:scale-110 hover:text-orange-500"
					>
						<div className="flex items-center justify-center">
							<RiRegisteredFill className="mx-2" />
							<Link href="/login">Signup</Link>
						</div>
					</li>
				</ul>
			</div>
		</nav>
	);
};
