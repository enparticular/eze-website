/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: ["./src/styles"],
		prependData: `@use "_variables.scss" as *;`,
	},
	images: {
		domains: ["localhost"],
	},
};

module.exports = nextConfig;
