import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import googleIcon from "../public/assets/google.svg";
import { BsGithub } from "react-icons/bs";

export const Login = () => {
	const { data: session } = useSession();
	if (session) {
		return (
			<div className="hero-img2 relative top-0 left-0 right-0 bottom-0  h-screen w-full bg-cover bg-fixed bg-center bg-no-repeat">
				<div className="flex h-[600px] w-full flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-center rounded-lg border p-12">
						<Image
							className="mb-10 rounded-full"
							src={session.user?.image as string}
							width="100"
							height="100"
							alt="/user"
						/>
						<h1 className="my-2 text-xl font-bold">
							Signed in as{" "}
							<span className="text-orange-500">
								{session.user?.name}
							</span>
						</h1>
						<button
							className="w-full rounded-lg bg-orange-800 p-2 text-xl font-bold hover:bg-orange-500"
							onClick={() => signOut()}
						>
							Sign out
						</button>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="hero-img2 relative top-0 left-0 right-0 bottom-0  h-screen w-full bg-cover bg-fixed bg-center bg-no-repeat">
			<div className="flex h-[600px] w-full flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-center rounded-lg border bg-[#18181b] p-5">
					<h1 className="py-5 text-3xl font-bold">Log In</h1>
					<div
						onClick={() =>
							signIn("google", {
								callbackUrl: "http://localhost:3000/",
							})
						}
						className="relative m-2 flex h-10 w-[250px] cursor-pointer items-center rounded-lg  bg-orange-600 hover:bg-orange-500"
					>
						<Image
							height="35"
							width="35"
							className="p-1"
							src={googleIcon}
							alt="/"
						/>
						<button className="text-lg font-bold">
							Sign in with Google
						</button>
					</div>

					<div
						onClick={() =>
							signIn("github", {
								callbackUrl: "http://localhost:3000/",
							})
						}
						className="relative m-2 flex h-10 w-[250px] cursor-pointer items-center rounded-lg  border bg-transparent bg-black hover:bg-gray-700"
					>
						<BsGithub className="m-1" size={25} />
						<button className="text-lg font-bold ">
							Sign in with Github
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
