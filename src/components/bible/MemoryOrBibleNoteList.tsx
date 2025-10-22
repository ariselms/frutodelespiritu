"use client";

import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionPanel,
	AccordionTitle
} from "flowbite-react";
import { MemoryListItem } from "@/models/memoryListAndItems";
import { LordIconHover } from "@/components/animations/lordicon";
import LOTTIE_TRASH_MORPH_TRASH_IN from "@/lotties/trash-bin-morph-trash-in.json";

// --- New Type Definitions ---
// Describes the new object that can appear in the content array
type VerseTextObject = {
	text: string;
	wordsOfJesus: boolean;
};

// The content array can hold strings or the object above
type VerseContentItem = string | VerseTextObject;

// The main verse object, updated to use the new content type
type Verse = {
	type: "verse";
	number: number;
	content: VerseContentItem[];
};

export function MemoryOrBibleNoteList({
	memoryListItems
}: {
	memoryListItems: MemoryListItem[] | [];
}) {

	if (memoryListItems?.length === 0) {
		return (
			<p className="text-black dark:text-gray-200 max-w-[80ch]">
				No hay elementos en esta lista. Visita la sección de la biblia y
				comienza a leer para agregar elementos a tu memoria o notas de la
				biblia.
			</p>
		);
	}

	return (
		<>
			<Accordion collapseAll>
				{memoryListItems?.map((listItem: MemoryListItem) => {

					// Safely parse the complex, malformed string
					const getPassageContent = () => {
						if (!listItem.passage_text) return <p>No text available.</p>;

						try {
							// 1. Fix the string: replace outer {} with [] (Same as before)
							const correctedJsonString = `[${listItem.passage_text.slice(
								1,
								-1
							)}]`;

							// 2. Parse the corrected string into an array of strings (Same as before)
							const verseStrings: string[] = JSON.parse(correctedJsonString);

							// 3. Parse each string in the array into a verse object (Same as before)
							// This now uses our new `Verse` type
							const verses: Verse[] = verseStrings.map((str) =>
								JSON.parse(str)
							);

							// --- 4. UPDATED RENDERING LOGIC ---
							// Render each verse object in a separate paragraph
							return verses.map((verse) => (
								<p key={verse.number} className="mb-2 max-w-[80ch] text-sm md:text-base">
									<sup className="font-bold mr-1">
										{verse.number}
									</sup>

									{/*
									 * Loop over the verse.content array.
									 * Each 'item' can be a string or an object.
									 */}
									{verse.content.map((item, index) => {
										// Check if the item is a plain string
										if (typeof item === "string") {
											// Render the string directly.
											// We use a React.Fragment to provide a key.
											return (
												<React.Fragment key={index}>{item} </React.Fragment>
											);
										}

										// Otherwise, it's an object.
										// Render its 'text' property and apply conditional styling.
										return (
											<span
												key={index}
												className={
													item.wordsOfJesus
														? "text-red-600 dark:text-red-400 text-sm md:text-base"
														: ""
												}>
												{item.text}{" "}
											</span>
										);
									})}
								</p>
							));
						} catch (error) {
							console.error(
								"Failed to parse passage_text:",
								listItem.passage_text,
								error
							);
							return (
								<p className="text-red-500">Error: Could not display verse.</p>
							);
						}
					};

					return (
						<AccordionPanel key={listItem.id}>
							<AccordionTitle className="bg-sky-50 hover:bg-sky-100 border-sky-100 dark:bg-gray-900 dark:border-gray-600 cursor-pointer focus:ring-4 focus:ring-sky-200 text-sm md:text-base">
								<span className="text-sky-700 hover:text-sky-800 dark:text-gray-100 dark:hover:text-gray-800">
									{listItem.bible_book} {listItem.chapter_id}:
									{listItem.verse_from}
									{listItem.verse_to !== listItem.verse_from &&
										`-${listItem.verse_to}`}{" "}
								</span>
								<div>{listItem.bible_name}</div>
							</AccordionTitle>
							<AccordionContent className="text-gray-500 dark:text-gray-100 dark:bg-gray-800">
								{getPassageContent()}
								<div className="flex items-center justify-end">
									<LordIconHover
										size={24}
										ICON_SRC={LOTTIE_TRASH_MORPH_TRASH_IN}
										state="morph-trash-in"
										text="Eliminar"
									/>
								</div>
							</AccordionContent>
						</AccordionPanel>
					);
				})}
			</Accordion>
		</>
	);
}
