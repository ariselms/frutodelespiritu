import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.pexels.com"
			},
			{
				protocol: "https",
				hostname: "flowbite.s3.amazonaws.com"
			},
			{
				protocol: "https",
				hostname: "media.licdn.com"
			},
			{
				protocol: "https",
				hostname:
					"s1pbt15ufg1rrece.public.blob.vercel-storage.com"
			}
		]
	}
};

export default withFlowbiteReact(nextConfig);
