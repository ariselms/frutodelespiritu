import { createTheme } from "flowbite-react";

export const BlueNavTheme = createTheme({
	root: {
		base: "bg-sky-50 dark:bg-gray-950 border-b border-sky-100 dark:border-gray-900 px-2 py-4 sm:px-4",
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
		base: "w-full md:block md:w-auto justify-center",
		list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
		hidden: {
			on: "hidden",
			off: ""
		}
	},
	link: {
		base: "block py-2 pl-3 pr-4 md:p-0",
		active: {
			on: "bg-transparent text-sky-700 hover:text-sky-800 dark:hover:text-white dark:hover:underline  md:text-sky-700 md:hover:text-sky-800 md:dark:text-white mb-3 last:mb-0 md:mb-0 dark:underline dark:underline-offset-4 transition-all",
			off: "text-gray-700 border-0 hover:text-sky-700 dark:text-gray-200  dark:hover:text-white dark:hover:underline dark:hover:underline-offset-4 mb-3 last:mb-0 md:mb-0 hover:bg-sky-50 dark:hover:bg-transparent md:hover:text-sky-700 transition-all"
		},
		disabled: {
			on: "text-gray-300 hover:cursor-not-allowed dark:text-gray-600",
			off: ""
		}
	},
	toggle: {
		base: "inline-flex items-center rounded-2xl p-2 text-sm text-sky-700 hover:cursor-pointer focus:outline-none focus:ring-1 focus:ring-sky-700 md:hidden dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-600",
		icon: "h-6 w-6 shrink-0",
		title: "sr-only"
	}
});

export const ModalUserProfileTheme = createTheme({
	root: {
		base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
		show: {
			on: "flex backdrop-blur",
			off: "hidden"
		},
		sizes: {
			sm: "max-w-sm",
			md: "max-w-md",
			lg: "max-w-lg",
			xl: "max-w-xl",
			"2xl": "max-w-2xl",
			"3xl": "max-w-3xl",
			"4xl": "max-w-4xl",
			"5xl": "max-w-5xl",
			"6xl": "max-w-6xl",
			"7xl": "max-w-7xl"
		},
		positions: {
			"top-left": "items-start justify-start",
			"top-center": "items-start justify-center",
			"top-right": "items-start justify-end",
			"center-left": "items-center justify-start",
			center: "items-center justify-center",
			"center-right": "items-center justify-end",
			"bottom-right": "items-end justify-end",
			"bottom-center": "items-end justify-center",
			"bottom-left": "items-end justify-start"
		}
	},
	content: {
		base: "relative h-full w-full p-4 md:h-auto",
		inner:
			"relative flex max-h-[90dvh] flex-col rounded-2xl shadow-2xl backdrop-blur  bg-sky-100/70 dark:bg-gray-900/50 border border-sky-100 dark:border-gray-600"
	},
	body: {
		base: "flex-1 overflow-auto p-6",
		popup: "pt-0"
	},
	header: {
		base: "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
		popup: "border-b-0 p-2",
		title: "text-xl font-medium text-gray-900 dark:text-white",
		close: {
			base: "ml-auto inline-flex items-center rounded-2xl bg-transparent p-1.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-50 dark:hover:text-red-500 cursor-pointer",
			icon: "h-5 w-5"
		}
	},
	footer: {
		base: "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
		popup: "border-t"
	}
});

export const DropdownBibleSelectionTheme = createTheme({
	arrowIcon: "ml-2 h-4 w-4",
	content: "py-1 focus:outline-none",
	floating: {
		animation: "transition-opacity",
		arrow: {
			base: "absolute z-10 h-2 w-2 rotate-45",
			style: {
				dark: "bg-gray-900 dark:bg-gray-700",
				light: "bg-white",
				auto: "bg-white dark:bg-gray-700"
			},
			placement: "-4px"
		},
		base: "z-10 w-fit divide-y divide-gray-100 rounded shadow focus:outline-none",
		content: "py-1 text-sm text-gray-700 dark:text-gray-200",
		divider: "my-1 h-px bg-gray-100 dark:bg-gray-600",
		header: "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200",
		hidden: "invisible opacity-0",
		item: {
			container: "",
			base: "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-sky-100 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:text-white rounded-2xl",
			icon: "mr-2 h-4 w-4"
		},
		style: {
			dark: "bg-gray-900 text-white dark:bg-gray-700",
			light: "border border-gray-200 bg-white text-gray-900",
			auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white"
		},
		target: "w-fit"
	},
	inlineWrapper: "flex items-center"
});
