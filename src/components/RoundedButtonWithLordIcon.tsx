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
		<button className="text-blue-900 dark:text-gray-50 bg-blue-50 border border-blue-700 dark:bg-gray-900 dark:border-gray-600 pl-22 pr-8 py-2 flex items-center rounded-2xl relative my-4 lg:my-6 w-full max-w-md">
			<span title={text} className="font-semibold w-full text-left lg:truncate">{text}</span>
			<div
				onClick={handleButtonClick}
				className="py-2 px-8 text-xs text-white font-bold uppercase dark:text-gray-50 rounded-full cursor-pointer bg-blue-700 border border-blue-100 hover:bg-blue-800 dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-gray-800 transition-all flex items-center justify-center gap-4 w-24 h-24 absolute -left-4 ">
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