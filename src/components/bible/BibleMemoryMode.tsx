"use client";

import React, { useState } from "react";
import { LordIconRevealOnLoad } from "@/components/animations/lordicon";
import LOTTIE_BRAIN_IN_REVEAL from "@/lotties/brain-in-reveal.json";
import {
	Navigation,
	Pagination,
	Scrollbar,
	A11y,
	EffectFade
} from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import 'swiper/css/effect-fade';
import BiblePassageText from "@/components/bible/BiblePassageText";

export default function BibleMemoryMode({
	bibleData
}: {
	bibleData: string[];
}) {
	const [openMemoryModeMode, setOpenBibleMode] = useState(false);

	if (openMemoryModeMode) {
		return (
			<>
				{bibleData.length > 0 && (
					<button
						onClick={() => setOpenBibleMode(false)}
						className="absolute right-8 top-8 text-red-500 dark:text-red-400 z-60 text-xl cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-800 rounded-full h-10 w-10 flex items-center justify-center">
						X
					</button>
				)}
				<section className="fixed inset-0 z-50 h-[100vh] w-screen backdrop-blur-md bg-blue-50/50 dark:bg-gray-950/50 m-auto">
					<Swiper
						className="h-full w-full bg-transparent --swiper-navigation-size:32px"
						// install Swiper modules
						modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
						spaceBetween={0}
						slidesPerView={1}
						navigation
            pagination={{ clickable: true }}
						scrollbar={{ draggable: false }}
            >
						{bibleData.map((item) => (
							<SwiperSlide className="flex h-full items-center justify-center dark:text-white">
								<BibleMemoryCard bibleDataItem={item} />
							</SwiperSlide>
						))}
					</Swiper>
				</section>
			</>
		);
	}

	return (
		<button
			onClick={() => setOpenBibleMode(true)}
			className="relative flex items-center">
			<span className="bg-blue-700 hover:bg-blue-800 dark:bg-gray-900 dark:hover:bg-gray-950 border dark:border-gray-600 px-3 py-2 text-white rounded-tl-2xl rounded-bl-2xl cursor-pointer">
				MODO DE MEMORIZACIÓN
			</span>
			<LordIconRevealOnLoad
				size={48}
				ICON_SRC={LOTTIE_BRAIN_IN_REVEAL}
				state="in-reveal"
				text=""
			/>
		</button>
	);
}

export function BibleMemoryCard({ bibleDataItem }: { bibleDataItem: any }) {
	const [showText, setShowText] = useState(false);

	return (
		<div className="h-full flex flex-col items-center justify-center dark:text-white py-10">
			{!showText ? (
				<div className="flex flex-col items-center justify-center">
					<h4>{bibleDataItem.bible_name.toUpperCase()}</h4>

					<p className="font-bold text-2xl">
						{bibleDataItem.bible_book} {bibleDataItem.chapter_id}:
						{bibleDataItem.verse_from}{" "}
						{bibleDataItem.verse_to !== bibleDataItem.verse_from &&
							`-${bibleDataItem.verse_to}`}
					</p>
				</div>
			) : (
				<BiblePassageText chapterContent={bibleDataItem} />
			)}

			<button
				className="bg-blue-700 hover:bg-blue-800 dark:bg-gray-900 dark:hover:bg-gray-950 border dark:border-gray-600 px-3 py-2 text-white rounded-lg cursor-pointer mt-16"
				onClick={() => setShowText(!showText)}>
				{showText ? "Ocultar" : "Mostrar"}
			</button>
		</div>
	);
}
