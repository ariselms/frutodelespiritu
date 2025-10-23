"use client";

import React, { useState, useContext } from "react";
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
	memoryListItems,
  memoryListInfo
}: {
	memoryListItems: MemoryListItem[] | [];
  memoryListInfo: any
}) {

  const { user } = useAuthContext();

  const [deletingItem, setDeletingItem] = useState<{ id: string; bibleId?: string } | null>(null);

  const handleDeletingMemoryItem = async (memoryItemId: string, bibleId: string) => {

      const requestDeleteMemoryItem =
        await fetch(`/api/bible/memorization/${memoryItemId}?userId=${user?.id}&bibleId=${bibleId}`,
        {
          method: "DELETE"
        });

      const responseDeleteMemoryItem = await requestDeleteMemoryItem.json();

      if (responseDeleteMemoryItem.success) {
        console.log(responseDeleteMemoryItem.message)
        memoryListItems?.filter(item => String(item.id) !== memoryItemId)
      }

  };

	if (memoryListItems?.length === 0) {
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
								<p
									key={verse.number}
									className="mb-2 max-w-[80ch] text-sm md:text-base">
									<sup className="font-bold mr-1">{verse.number}</sup>

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
									onClick={() =>
										setDeletingItem({
											id: String(listItem?.id) ?? "",
											bibleId: listItem?.bible_id ?? ""
										})
									}>
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
					{/* === THIS IS THE MISSING PIECE === */}
					{/* It uses .title, which is correct for ArticleType */}
					<p className="text-black dark:text-gray-50 mb-6 text-lg underline underline-offset-4">
						{deletingItem?.bibleId}
					</p>
					{/* ================================== */}
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
                // TODO: Address and endpoint to delete memory_items
                handleDeletingMemoryItem(deletingItem.id, String(deletingItem.bibleId));
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
