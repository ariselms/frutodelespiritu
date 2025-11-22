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
import { MemoryItemType, Verse } from "@/models/memorizationAndNotesTypes";
import { useAuthContext } from "@/context/authContext";
import { LordIconHover } from "@/components/animations/lordicon";
import LOTTIE_TRASH_MORPH_TRASH_IN from "@/lotties/trash-bin-morph-trash-in.json";
import LOTTIE_EDIT_DOCUMENT_HOVER_PINCH from "@/lotties/edit-document-hover-pinch.json";
import Link from "next/link";
import { toast } from "react-toastify";

export default function MemoryOrNoteItemList({
	memoryOrNoteListItems
}: {
	memoryOrNoteListItems: MemoryItemType[] | null;
}) {
	const { user } = useAuthContext();

	// add state to track the item being deleted using the id and name
	const [deletingMemoryOrNoteItem, setDeletingMemoryOrNoteItem] =
		useState<MemoryItemType | null>(null);

	// add state to the memory or note list
	const [memoryOrNoteList, setMemoryOrNoteList] = useState<MemoryItemType[]>(
		[]
	);

	// simplified useEffect to sync prop to state
	useEffect(() => {
		if (memoryOrNoteListItems !== null) {
			setMemoryOrNoteList(memoryOrNoteListItems);
		}
	}, [memoryOrNoteListItems]); // Only depends on the prop

	const handleDeletingMemoryOrNoteItem = async (
		memoryOrNoteItem: MemoryItemType,
		bibleId: string
	) => {
		try {
			if (memoryOrNoteItem.title !== "" && memoryOrNoteItem.content !== "") {
				return;
			}

			const requestDeleteMemoryItem = await fetch(
				`/api/bible/memorization/${memoryOrNoteItem.id}?userId=${user?.id}&bibleId=${bibleId}`,
				{
					method: "DELETE"
				}
			);

			const responseDeleteMemoryItem = await requestDeleteMemoryItem.json();

			if (responseDeleteMemoryItem.success) {
				// update the local state to trigger a re-render
				setMemoryOrNoteList((currentList) =>
					currentList.filter(
						(item) => String(item.id) !== String(memoryOrNoteItem.id)
					)
				);
			} else {
				console.error(
					"Failed to delete item:",
					responseDeleteMemoryItem.message
				);
			}
		} catch (error) {
			console.error("Error during delete request:", error);
		}
	};

	const handleUpdateMemoryOrNoteItem = async (
		memoryOrNoteItem: MemoryItemType
	) => {
		try {

			if (
        memoryOrNoteItem.title === "" ||
        memoryOrNoteItem.content === ""
      )
      {
				toast.warning("El título y contenido de la nota son requeridos.");
				return;
			}

			const requestUpdateMemoryItem = await fetch(
				`/api/user/${user?.id}/memorization/item/${memoryOrNoteItem.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(memoryOrNoteItem)
				}
			);

			const responseUpdateMemoryItem = await requestUpdateMemoryItem.json();

			if (responseUpdateMemoryItem.success) {
				// update the local state to trigger a re-render
				setMemoryOrNoteList((currentList) =>
					currentList.map((item) =>
						String(item.id) === String(memoryOrNoteItem.id)
							? { ...item, ...memoryOrNoteItem }
							: item
					)
				);

        toast.success("Elemento de aprendizaje actualizado correctamente.");

			} else {
				console.error(
					"Failed to update item:",
					responseUpdateMemoryItem.message
				);
			}
		} catch (error) {
			console.error("Error during update request:", error);
		}
	};

	const handleInputChange = (
		id: number | null,
		field: keyof MemoryItemType,
		value: string
	) => {
		setMemoryOrNoteList((currentList) =>
			currentList.map((item) => {
				// Find the item by ID
				if (String(item.id) === String(id)) {
					// Return a new object with the updated field
					return { ...item, [field]: value };
				}
				// Return the unchanged item
				return item;
			})
		);
	};

	if (memoryOrNoteList?.length === 0) {
		return (
			<div className="max-w-[80ch] py-10 px-2">
				<p className="text-gray-500 dark:text-gray-300 mb-3">
					No hay elementos en esta lista. Visita la sección de la biblia, elije
					una traducción y comienza a leer para agregar versículos a tu lista de
					aprendizaje. Las listas de aprendizaje ayudan a recordar y comprender
					el contenido de la biblia.
				</p>
				<p>
					<Link className="text-sky-700 hover:text-sky-800" href="/biblia">
						Abrir biblias disponibles 📖
					</Link>
				</p>
			</div>
		);
	}

	return (
		<>
			<Accordion collapseAll>
				{memoryOrNoteList?.map((listItem: MemoryItemType) => {
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
									className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-2 max-w-[80ch]">
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
														? "text-red-600 dark:text-red-400"
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
							<AccordionTitle className="bg-sky-700 hover:bg-sky-800 border-sky-100 dark:bg-gray-900 dark:hover:bg-gray-950 dark:border-gray-600 cursor-pointer focus:ring-4 focus:ring-sky-200 text-sm md:text-base">
								<p className="text-sky-50 hover:text-sky-100 dark:text-gray-50 dark:hover:text-gray-100">
									{listItem.bible_book} {listItem.chapter_id}:
									{listItem.verse_from}
									{listItem.verse_to !== listItem.verse_from &&
										`-${listItem.verse_to}`}{" "}
								</p>
								<p className="text-sm text-sky-100 dark:text-gray-400">
									Biblia {listItem.bible_name}
								</p>
							</AccordionTitle>
							<AccordionContent className="text-gray-500 dark:text-gray-100 dark:bg-gray-800">
								{getPassageContent()}
								{/* For notes only */}
								{listItem.hasOwnProperty("title") &&
									listItem.hasOwnProperty("content") && (
										<form className="max-w-2xl">
											<div className="mb-2">
												<label
													className="text-sm font-medium text-gray-900 dark:text-white"
													data-testid="flowbite-label"
													htmlFor="title">
													Título de la nota
												</label>
												<input
													className="block w-full px-2 py-4 text-sm text-gray-900 border border-sky-100 rounded-2xl bg-sky-50 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-sky-500 dark:focus-visible:outline-gray-500"
													id="title"
													type="text"
													value={listItem.title || ""}
													onChange={(e) =>
														handleInputChange(
															listItem.id,
															"title",
															e.target.value
														)
													}
													name="title"
												/>
											</div>
											<div>
												<label
													className="text-sm font-medium text-gray-900 dark:text-white"
													data-testid="flowbite-label"
													htmlFor="content">
													Contenido
												</label>
												<textarea
													className="block w-full px-2 py-4 text-sm text-gray-900 border border-sky-100 rounded-2xl bg-sky-50 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-sky-500 dark:focus-visible:outline-gray-500"
													id="content"
													rows={4}
													value={listItem.content || ""}
													onChange={(e) =>
														handleInputChange(
															listItem.id,
															"content",
															e.target.value
														)
													}
													name="content"
												/>
											</div>
											<div
												className="items-center justify-start inline-block mt-5 mr-6 px-2 py-1 rounded-2xl border-2 border-sky-500 dark:border-gray-600 text-gray-700 dark:text-gray-100 bg-sky-50 dark:bg-gray-800 font-bold cursor-pointer"
												// FIX 3: Pass the entire listItem to state
												onClick={() => handleUpdateMemoryOrNoteItem(listItem)}>
												<LordIconHover
													size={24}
													ICON_SRC={LOTTIE_EDIT_DOCUMENT_HOVER_PINCH}
													state="hover-pinch"
													text="Actualizar"
												/>
											</div>
										</form>
									)}

								<div
									className="items-center justify-start inline-block mt-5 px-2 py-1 rounded-2xl border-2 border-red-500 text-red-500 bg-red-50/90 font-bold cursor-pointer"
									// FIX 3: Pass the entire listItem to state
									onClick={() => setDeletingMemoryOrNoteItem(listItem)}>
									<LordIconHover
										size={24}
										ICON_SRC={LOTTIE_TRASH_MORPH_TRASH_IN}
										state="morph-trash-out"
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
				show={deletingMemoryOrNoteItem !== null}
				onClose={() => setDeletingMemoryOrNoteItem(null)}
				popup>
				<ModalHeader className="bg-sky-100 dark:bg-gray-800 text-sky-950 dark:text-gray-50 border-b border-sky-200 dark:border-gray-600 p-5">
					Confirma remover versículos
				</ModalHeader>

				<ModalBody className="p-6">
					<p className="text-black dark:text-gray-50 text-xl mb-3">
						¿Estas seguro de remover lo siguiente?
					</p>

					{deletingMemoryOrNoteItem?.hasOwnProperty("title") &&
						deletingMemoryOrNoteItem?.hasOwnProperty("content") && (
							<p className="text-black dark:text-gray-50 mb-4 text-md underline underline-offset-4">
								Nota: {deletingMemoryOrNoteItem.title}
							</p>
						)}

					{/* Display human-readable verse reference */}
					<p className="text-black dark:text-gray-50 mb-6 text-md underline underline-offset-4">
						Versículo(s): {deletingMemoryOrNoteItem?.bible_book}{" "}
						{deletingMemoryOrNoteItem?.chapter_id}:
						{deletingMemoryOrNoteItem?.verse_from}
						{deletingMemoryOrNoteItem?.verse_to !==
							deletingMemoryOrNoteItem?.verse_from &&
							`-${deletingMemoryOrNoteItem?.verse_to}`}
					</p>

					<p className="text-gray-600 dark:text-gray-300">
						Esta acción removerá este contenido de la lista. Luego de oprimir
						confirmar no se puede deshacer.
					</p>
				</ModalBody>

				<ModalFooter className="border-t-sky-200 dark:border-gray-600 flex items-center justify-end">
					<button
						className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-2xl text-sm w-full sm:w-auto p-4 text-center dark:bg-gray-900 dark:hover:bg-gray-800 dark:border dark:border-gray-600 dark:focus:ring-800 cursor-pointer transition-all mt-4"
						onClick={() => {
							if (deletingMemoryOrNoteItem) {
								// FIX 3: Get ID and bibleId from the state object
								handleDeletingMemoryOrNoteItem(
									deletingMemoryOrNoteItem,
									String(deletingMemoryOrNoteItem.bible_id)
								);
								setDeletingMemoryOrNoteItem(null); // Close modal on confirm
							}
						}}>
						Confirmar
					</button>
				</ModalFooter>
			</Modal>
		</>
	);
}
