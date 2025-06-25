import { createTheme } from "flowbite-react";

export const OrangeLinkTheme = createTheme({
	root: {
		base: "bg-white px-2 py-2.5 sm:px-4 dark:border-gray-700 dark:bg-gray-800",
		rounded: {
			on: "rounded",
			off: ""
		},
		bordered: {
			on: "border",
			off: ""
		},
		inner: {
			base: "mx-auto flex flex-wrap items-center justify-between",
			fluid: {
				on: "",
				off: "container"
			}
		}
	},
	brand: {
		base: "flex items-center"
	},
	collapse: {
		base: "w-full md:block md:w-auto",
		list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
		hidden: {
			on: "hidden",
			off: ""
		}
	},
	link: {
		base: "block py-2 pl-3 pr-4 md:p-0",
		active: {
			on: "bg-orange-600 md:bg-transparent md:text-orange-600 md:dark:text-orange-500 mb-3 md:mb-0",
			off: "text-gray-700 rounded-0 border-0 md:border-0  md:hover:text-orange-600  dark:text-gray-300  md:dark:hover:text-orange-500 mb-3 md:mb-0 hover:bg-orange-600 hover:text-white dark:hover:bg-orange-600 dark:hover:text-white"
		},
		disabled: {
			on: "text-gray-300 hover:cursor-not-allowed dark:text-gray-600",
			off: ""
		}
	},
	toggle: {
		base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-600",
		icon: "h-6 w-6 shrink-0",
		title: "sr-only"
	}
});
