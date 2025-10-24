"use client";

import React, { useState, useEffect } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionPanel,
	AccordionTitle,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from "flowbite-react";
import { MemoryListItem } from "@/models/memoryListAndItems";
import { useAuthContext } from "@/context/authContext";
import { LordIconHover } from "@/components/animations/lordicon";
import LOTTIE_TRASH_MORPH_TRASH_IN from "@/lotties/trash-bin-morph-trash-in.json";

// --- Type Definitions ---
type VerseTextObject = {
	text: string;
	wordsOfJesus: boolean;
};
type VerseContentItem = string | VerseTextObject;
type Verse = {
	type: "verse";
	number: number;
	content: VerseContentItem[];
};

export function MemoryOrBibleNoteList({
	memoryListItems,
	memoryListInfo
}: {
	memoryListItems: MemoryListItem[] | [];
	memoryListInfo: any;
}) {
	const { user } = useAuthContext();

	// FIX 3: State now holds the full MemoryListItem object or null
	const [deletingItem, setDeletingItem] = useState<MemoryListItem | null>(null);

	const [memoryList, setMemoryList] = useState<MemoryListItem[]>([]);

	// FIX 2: Simplified useEffect to sync prop to state
	useEffect(() => {
		if (memoryListItems !== null) {
			setMemoryList(memoryListItems);
		}
	}, [memoryListItems]); // Only depends on the prop

	const handleDeletingMemoryItem = async (
		memoryItemId: string,
		bibleId: string
	) => {
		try {
			const requestDeleteMemoryItem = await fetch(
				`/api/bible/memorization/${memoryItemId}?userId=${user?.id}&bibleId=${bibleId}`,
				{
					method: "DELETE"
				}
			);

			const responseDeleteMemoryItem = await requestDeleteMemoryItem.json();

			if (responseDeleteMemoryItem.success) {
				// update the local state to trigger a re-render
				setMemoryList((currentList) =>
					currentList.filter((item) => String(item.id) !== memoryItemId)
				);

			} else {
				console.error(
					"Failed to delete item:",
					responseDeleteMemoryItem.message
				);
			}
		} catch (error) {
			console.error(
        "Error during delete request:",
        error
      );
		}
	};

	if (memoryList?.length === 0) {
		return (
			<p className="text-gray-400 dark:text-gray-300 max-w-[80ch]">
				No hay elementos en esta lista. Visita la sección de la biblia y
				comienza a leer para agregar versículos a tu lista de memoria.
			</p>
		);
	}

	return (
		<>
			<Accordion collapseAll>
				{memoryList?.map((listItem: MemoryListItem) => {
					// Safely parse the complex, malformed string
					const getPassageContent = () => {
						if (!listItem.passage_text) return <p>No text available.</p>;

						try {
							const correctedJsonString = `[${listItem.passage_text.slice(
								1,
								-1
							)}]`;
							const verseStrings: string[] = JSON.parse(correctedJsonString);
							const verses: Verse[] = verseStrings.map((str) =>
								JSON.parse(str)
							);

							return verses.map((verse) => (
								<p
									key={verse.number}
									className="mb-2 max-w-[80ch] text-sm md:text-base">
									<sup className="font-bold mr-1">{verse.number}</sup>
									{verse.content.map((item, index) => {
										if (typeof item === "string") {
											return (
												<React.Fragment key={index}>{item} </React.Fragment>
											);
										}
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
							<AccordionTitle className="bg-sky-50 hover:bg-sky-100 border-sky-100 dark:bg-gray-900 dark:hover:bg-gray-950 dark:border-gray-600 cursor-pointer focus:ring-4 focus:ring-sky-200 text-sm md:text-base">
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
								<div
									className="flex items-center justify-end"
									// FIX 3: Pass the entire listItem to state
									onClick={() => setDeletingItem(listItem)}>
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

			{/* Modal for deleting a lecture */}
			<Modal
				className="backdrop-blur-md bg-sky-50/10 dark:bg-gray-950/50"
				show={deletingItem !== null}
				onClose={() => setDeletingItem(null)}
				popup>
				<ModalHeader className="bg-sky-100 dark:bg-gray-800 text-sky-950 dark:text-gray-50 border-b border-sky-200 dark:border-gray-600 p-5">
					Confirma remover versículos
				</ModalHeader>
				<ModalBody className="p-6">
					<p className="text-black dark:text-gray-50 text-lg mb-3">
						¿Estas seguro de remover el/los siguiente(s) versículo(s)?
					</p>

					{/* FIX 3: Display human-readable verse reference */}
					<p className="text-black dark:text-gray-50 mb-6 text-lg underline underline-offset-4">
						{deletingItem?.bible_book} {deletingItem?.chapter_id}:
						{deletingItem?.verse_from}
						{deletingItem?.verse_to !== deletingItem?.verse_from &&
							`-${deletingItem?.verse_to}`}
					</p>

					<p className="text-gray-600 dark:text-gray-400">
						Esta acción removerá la lectura de tu lista de favoritas. Luego de
						oprimir confirmar no se puede deshacer.
					</p>
				</ModalBody>

				<ModalFooter className="border-t-sky-200 dark:border-gray-600 flex items-center justify-end">
					<button
						className="p-2 text-sm font-medium text-center text-sky-50 rounded-2xl cursor-pointer bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 transition-all duration-300 ease-in border border-sky-100 dark:border-gray-600"
						onClick={() => {
							if (deletingItem) {
								// FIX 3: Get ID and bibleId from the state object
								handleDeletingMemoryItem(
									String(deletingItem.id),
									String(deletingItem.bible_id)
								);
								setDeletingItem(null); // Close modal on confirm
							}
						}}>
						Confirmar
					</button>
				</ModalFooter>
			</Modal>
		</>
	);
}
