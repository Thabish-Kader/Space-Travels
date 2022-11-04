/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
};

module.exports = {
	images: {
		domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
	},
};
