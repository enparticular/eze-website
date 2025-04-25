/** @type {import('next').NextConfig} */
const nextConfig = {
	sassOptions: {
		includePaths: ["./src/styles"],
	},
	experimental: {
		appDir: true,
	},
	images: {
		domains: ["localhost"],
	},
};

module.exports = nextConfig;
