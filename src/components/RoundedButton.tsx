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
		<button className="text-sky-900 dark:text-gray-50 bg-blue-50 border border-sky-200 dark:bg-gray-900 dark:border-gray-600 pl-4 pr-7 py-2 flex items-center rounded-2xl relative mt-10">
			<span className="font-semibold">{text} &rarr;</span>
			<div
				onClick={handleButtonClick}
				className="py-2 px-8 text-xs text-white font-bold uppercase dark:text-gray-50 rounded-full cursor-pointer bg-sky-700 border border-sky-100 hover:bg-sky-800 dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-600 focus:ring-4 focus:ring-sky-300 dark:focus:ring-gray-800 transition-all flex items-center justify-center gap-4 w-20 h-20 absolute -right-16 ">
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