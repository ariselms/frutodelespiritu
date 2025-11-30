"use client";

import { useRef } from "react";
import { LordIconClickRedirect, LordIconClickHandle } from "@/components/animations/lordicon";
import LOTTIE_BIBLE_OPEN from "@/lotties/bible-open.json";

export default function RoundedButtonWithLordIcon({
  text,
  route,
}: {
  text: string;
  route: string;
}) {
	// 1. Create a ref to hold the LordIconClickRedirect component's exposed methods
	const lordIconRef = useRef<LordIconClickHandle>(null);

	// 2. Create a handler that calls the exposed function
	const handleButtonClick = () => {
		lordIconRef.current?.triggerAnimation();
	};

	return (
		<button
			onClick={handleButtonClick}
			className="text-black dark:text-gray-50 bg-blue-100 hover:bg-blue-200 border border-blue-200 dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-600 pl-22 pr-8 py-2 flex items-center rounded-lg relative my-4 lg:my-6 w-full max-w-md shadow-sm cursor-pointer transition-all">
			<span title={text} className="font-semibold w-full text-left lg:truncate">
				{text}
			</span>
			<div className="py-2 px-8 text-xs font-bold uppercase rounded-full cursor-pointer bg-blue-700  hover:bg-blue-800 dark:bg-gray-900 dark:hover:bg-gray-800 border border-blue-200 dark:border-gray-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-gray-800 transition-all flex items-center justify-center gap-4 w-24 h-24 absolute -left-4 shadow-2xl">
				<LordIconClickRedirect
					ref={lordIconRef}
					size={40}
					ICON_SRC={LOTTIE_BIBLE_OPEN}
					state="morph-open"
					text=""
					route={route}
				/>
			</div>
		</button>
	);
}