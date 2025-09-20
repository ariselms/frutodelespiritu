import { createTheme } from "flowbite-react";

export const OrangeLinkTheme = createTheme({
	root: {
		base: "bg-orange-100 dark:bg-gray-800 px-2 py-2.5 sm:px-4 border-orange-300 dark:border-gray-700 border-b",
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
			on: "bg-gray-700 md:bg-transparent md:text-orange-600 md:dark:text-orange-500 mb-3 md:mb-0",
			off: "text-gray-700 rounded-0 border-0 md:border-0  md:hover:text-orange-600 md:hover:bg-transparent  dark:text-gray-300  md:dark:hover:text-orange-500 mb-3 md:mb-0 hover:bg-gray-700 hover:text-white dark:hover:bg-transparent dark:hover:text-white"
		},
		disabled: {
			on: "text-gray-300 hover:cursor-not-allowed dark:text-gray-600",
			off: ""
		}
	},
	toggle: {
		base: "inline-flex items-center rounded-2xl p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-600",
		icon: "h-6 w-6 shrink-0",
		title: "sr-only"
	}
});

export const ModalUserProfileTheme = createTheme({
	root: {
		base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
		show: {
			on: "flex bg-gray-100/80 dark:bg-gray-900/80",
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
			"relative flex max-h-[90dvh] flex-col rounded-2xl shadow-2xl  bg-white dark:bg-gray-800 border border-orange-100 dark:border-gray-600"
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
			base: "ml-auto inline-flex items-center rounded-2xl bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
			icon: "h-5 w-5"
		}
	},
	footer: {
		base: "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
		popup: "border-t"
	}
});

export const BibleNotesAndMemorizationTheme = createTheme({
	base: "flex flex-col gap-2",
	tablist: {
		base: "flex text-center",
		variant: {
			default: "flex-wrap border-b border-gray-200 dark:border-gray-700",
			underline:
				"-mb-px flex-wrap border-b border-gray-200 dark:border-gray-700",
			pills:
				"flex-wrap space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400",
			fullWidth:
				"grid w-full grid-flow-col rounded-none text-sm font-medium dark:text-gray-400"
		},
		tabitem: {
			base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 shadow-orange-50 dark:shadow-gray-700",
			variant: {
				default: {
					base: "rounded-t-lg",
					active: {
						on: "bg-gray-100 text-orange-600 dark:bg-gray-800 dark:text-orange-500",
						off: "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
					}
				},
				underline: {
					base: "rounded-t-lg",
					active: {
						on: "rounded-t-lg border-b-2 border-orange-600 text-orange-600 dark:border-orange-500 dark:text-orange-500",
						off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
					}
				},
				pills: {
					base: "",
					active: {
						on: "rounded-lg bg-orange-600 text-white",
						off: "rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
					}
				},
				fullWidth: {
					base: "ml-0 flex w-full rounded-none first:ml-0 cursor-pointer",
					active: {
						on: "rounded-none bg-orange-700 hover:bg-orange-600 dark:bg-gray-900 dark:hover:bg-gray-900/50 dark:text-white p-4 text-orange-50 border-b-2 border-orange-300 dark:border-gray-600",
						off: "rounded-none bg-orange-50 hover:bg-orange-100 hover:text-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500/50 dark:hover:text-white border-b-2 border-orange-200 dark:border-gray-600"
					}
				}
			},
			icon: "mr-2 h-5 w-5"
		}
	},
	tabitemcontainer: {
		base: "",
		variant: {
			default: "",
			underline: "",
			pills: "",
			fullWidth: ""
		}
	},
	tabpanel: "py-3"
});