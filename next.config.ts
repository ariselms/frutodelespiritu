import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/* config options here */
const nextConfig: NextConfig = {

  // images domains allowed
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "s1pbt15ufg1rrece.public.blob.vercel-storage.com"
			}
		]
	},

  // redirects configuration
	async redirects() {
		return [
			// spanish bibles
			{
				source: "/biblia/libros",
				has: [
					{
						type: "query",
						key: "id",
						value: "(?<id>.*)" // Capture the value of the 'id' query param
					}
				],
				destination: "/biblia/libros/:id?", // Use the captured 'id' in the new path
				permanent: true // This makes it a 301 redirect
			},
			// lectures
			{
				source: "/lecturas",
				has: [
					{
						type: "query",
						key: "slug",
						value: "(?<slug>.*)" // Capture the value of the 'slug' query param
					}
				],
				destination: "/lecturas/:slug?", // Use the captured 'id' in the new path
				permanent: true // This makes it a 301 redirect
			}
		];
	}
};

export default withFlowbiteReact(nextConfig);
