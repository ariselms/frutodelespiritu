import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		".flowbite-react/class-list.json"
	],

	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)"
			}
		}
	}
} satisfies Config;
