"use client";

// You'll need useRef from React
import React, { useRef } from "react";
import { BibleDataType } from "@/models/bibleTypes";
// Import the handle type we defined
import {
	LordIconClick,
	LordIconClickHandle
} from "@/components/animations/lordicon";
import LOTTIE_BIBLE_OPEN from "@/lotties/bible-open.json";

export const SpanishBibleItem = ({ bible }: { bible: BibleDataType }) => {
	// 1. Create a ref to hold the LordIconClick component's exposed methods
	const lordIconRef = useRef<LordIconClickHandle>(null);

	// 2. Create a handler that calls the exposed function
	const handleButtonClick = () => {
		lordIconRef.current?.triggerAnimation();
	};

	return (
		<div
			className="bg-orange-50 dark:bg-gray-700 border border-orange-300 dark:border-gray-600 rounded-2xl p-4 flex flex-col h-full"
			key={bible.id}>
			<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
				{bible.name}
			</h5>

			{/* 3. Add the onClick handler to the button div */}
			<div
				onClick={handleButtonClick}
				className="py-4 px-8 text-lg text-orange-700 dark:text-gray-50 rounded-2xl cursor-pointer bg-orange-200 border border-orange-300 hover:bg-orange-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-600 focus:ring-4 focus:ring-orange-300 dark:focus:ring-gray-800 transition-all flex items-center justify-center xl:w-fit mt-auto gap-4">
				{/* 4. Pass the ref to the LordIconClick component */}
				<LordIconClick
					ref={lordIconRef}
					size={40}
					ICON_SRC={LOTTIE_BIBLE_OPEN}
					state="morph-open"
					text=""
					route={`/biblia/libros/${bible?.id}?booksView=Detallada`}
				/>
				Abrir
			</div>
		</div>
	);
};
