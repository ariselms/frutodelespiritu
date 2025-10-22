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
			"relative flex max-h-[90dvh] flex-col rounded-2xl shadow-2xl backdrop-blur dark:backdrop-blur bg-sky-100/70 dark:bg-gray-900/70 border border-sky-100 dark:border-gray-600"
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

export const BottomModalTheme = createTheme({
	root: {
		base: "fixed z-40 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800",
		backdrop: "fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80",
		edge: "bottom-16",
		position: {
			top: {
				on: "left-0 right-0 top-0 w-full transform-none",
				off: "left-0 right-0 top-0 w-full -translate-y-full"
			},
			right: {
				on: "right-0 top-0 h-screen w-80 transform-none",
				off: "right-0 top-0 h-screen w-80 translate-x-full"
			},
			bottom: {
				on: "bottom-0 left-0 right-0 w-full transform-none",
				off: "bottom-0 left-0 right-0 w-full translate-y-full"
			},
			left: {
				on: "left-0 top-0 h-screen w-80 transform-none",
				off: "left-0 top-0 h-screen w-80 -translate-x-full"
			}
		}
	},
	header: {
		inner: {
			closeButton:
				"absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
			closeIcon: "h-4 w-4",
			titleCloseIcon: "sr-only",
			titleIcon: "me-2.5 h-4 w-4",
			titleText:
				"mb-4 inline-flex items-center text-base font-semibold text-sky-950 dark:text-gray-400"
		},
		collapsed: {
			on: "hidden",
			off: "block"
		}
	},
	items: {
		base: ""
	}
});

export const AccordionTheme = createTheme({
	root: {
		base: "divide-y divide-sky-100 border-sky-100 dark:divide-gray-700 dark:border-gray-700",
		flush: {
			off: "rounded-lg border",
			on: "border-b"
		}
	},
	content: {
		base: "p-5 first:rounded-t-lg last:rounded-b-lg dark:bg-gray-900"
	},
	title: {
		arrow: {
			base: "h-6 w-6 shrink-0",
			open: {
				off: "",
				on: "rotate-180"
			}
		},
		base: "flex w-full items-center justify-between p-5 text-left font-medium text-gray-500 first:rounded-t-lg last:rounded-b-lg dark:text-gray-400",
		flush: {
			off: "hover:bg-sky-100 focus:ring-4 focus:ring-sky-200 dark:hover:bg-red-800 dark:focus:ring-red-800",
			on: "bg-transparent dark:bg-transparent"
		},
		heading: "",
		open: {
			off: "",
			on: "bg-sky-100 text-sky-900 dark:bg-gray-800 dark:text-white"
		}
	}
});

export const NotesAndMemoryTabTheme = createTheme({
	base: "flex flex-col gap-0",
	tablist: {
		base: "flex text-center",
		variant: {
			default: "flex-wrap border-b-0",
			underline:
				"-mb-px flex-wrap border-b border-gray-200 dark:border-gray-700",
			pills:
				"flex-wrap space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400",
			fullWidth:
				"grid w-full grid-flow-col divide-x divide-gray-200 rounded-none text-sm font-medium shadow dark:divide-gray-700 dark:text-gray-400"
		},
		tabitem: {
			base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
			variant: {
				default: {
					base: "rounded-t-lg",
					active: {
						on: "bg-sky-50 text-sky-700 hover:text-sky-800 dark:bg-gray-700 dark:text-gray-50 dark:hover:text-gray-100 cursor-pointer",
						off: "hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 cursor-pointer"
					}
				},
				underline: {
					base: "rounded-t-lg",
					active: {
						on: "rounded-t-lg border-b-2 border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-500",
						off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
					}
				},
				pills: {
					base: "",
					active: {
						on: "rounded-lg bg-primary-600 text-white",
						off: "rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
					}
				},
				fullWidth: {
					base: "ml-0 flex w-full rounded-none first:ml-0",
					active: {
						on: "rounded-none bg-gray-100 p-4 text-gray-900 dark:bg-gray-700 dark:text-white",
						off: "rounded-none bg-white hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
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
	tabpanel: "py-0"
});
