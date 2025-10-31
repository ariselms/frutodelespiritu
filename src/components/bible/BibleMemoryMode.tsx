"use client";

import React, { useState } from "react";
import { LordIconRevealOnLoad } from "@/components/animations/lordicon";
import LOTTIE_BRAIN_IN_REVEAL from "@/lotties/brain-in-reveal.json";
import { Verse } from "@/models/memorizationAndNotesTypes";
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
						className="absolute right-8 top-8 text-red-500 dark:text-red-400 z-60 text-xl cursor-pointer hover:bg-sky-100 dark:hover:bg-gray-800 rounded-full h-10 w-10 flex items-center justify-center">
						X
					</button>
				)}
				<section className="fixed inset-0 z-50 h-screen w-screen backdrop-blur-md bg-sky-50/50 dark:bg-gray-950/50">
					<Swiper
						className="h-full w-full bg-transparent --swiper-navigation-size:32px"
						// install Swiper modules
						modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
						spaceBetween={0}
						slidesPerView={1}
						navigation
            pagination={{ clickable: true }}
						scrollbar={{ draggable: false }}
						// onSwiper={(swiper) => console.log("")}
						// onSlideChange={() => console.log("")}
            >
						{bibleData.map((item, index) => (
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
			<span className="bg-sky-700 hover:bg-sky-800 dark:bg-gray-900 dark:hover:bg-gray-950 border dark:border-gray-600 px-3 py-2 text-white rounded-tl-2xl rounded-bl-2xl cursor-pointer">
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
				<BiblePassageText listItem={bibleDataItem} />
			)}

			<button
				className="bg-sky-700 hover:bg-sky-800 dark:bg-gray-900 dark:hover:bg-gray-950 border dark:border-gray-600 px-3 py-2 text-white rounded-2xl cursor-pointer mt-16"
				onClick={() => setShowText(!showText)}>
				{showText ? "Ocultar" : "Mostrar"}
			</button>
		</div>
	);
}

export function BiblePassageText({ listItem }: { listItem: any }) {
	const getPassageContent = () => {
		if (!listItem.passage_text) return <p>No text available.</p>;

		try {
			const correctedJsonString = `[${listItem.passage_text.slice(1, -1)}]`;

			const verseStrings: string[] = JSON.parse(correctedJsonString);

			const verses: Verse[] = verseStrings.map((str) => JSON.parse(str));

			return (
				<>
					<span className="block mb-8">
						{listItem.bible_name.toUpperCase()}
					</span>

					<span className="block mb-4 font-bold text-2xl">
						{listItem.bible_book} {listItem.chapter_id}:{listItem.verse_from}{" "}
						{listItem.verse_to !== listItem.verse_from &&
							`-${listItem.verse_to}`}
					</span>

					<div className="max-w-[75%] xl:max-w-[80ch] overflow-auto">
						{verses.map((verse) => (
							<p
								key={verse.number}
								className="text-lg md:text-xl text-gray-700 dark:text-gray-200">
								<sup className="font-bold mr-1">{verse.number}</sup>

								{verse.content.map((item, index) => {
									if (typeof item === "string") {
										return <React.Fragment key={index}>{item} </React.Fragment>;
									}

									return (
										<span
											key={index}
											className={
												item.wordsOfJesus
													? "text-red-600 dark:text-red-400"
													: ""
											}>
											{item.text}
										</span>
									);
								})}
							</p>
						))}
					</div>
				</>
			);
		} catch (error) {
			console.error(
				"Failed to parse passage_text:",
				listItem.passage_text,
				error
			);
			return <p className="text-red-500">Error: Could not display verse.</p>;
		}
	};

	return <>{getPassageContent()}</>;
}
