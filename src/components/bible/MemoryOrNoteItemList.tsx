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
import { MemoryItemType } from "@/models/memorizationAndNotesTypes";
import { useAuthContext } from "@/context/authContext";
import { toast } from "react-hot-toast";
import Link from "next/link";
import BiblePassageText from "@/components/bible/BiblePassageText";
import TextEditor from "@/components/bible/TextEditor";
import styles from "@/components/admin/react-admin-styles.module.css";

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

	// TODO: make this function reusable to also delete memory item in bible reading modal when the user click the selected saved verses
	const handleDeletingMemoryOrNoteItem = async (
		memoryOrNoteItem: MemoryItemType,
		bibleId: string
	) => {
		try {
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

				toast.success("Elemento de aprendizaje eliminado correctamente.", {
					duration: 5000
				});
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
			if (memoryOrNoteItem.title === "" || memoryOrNoteItem.content === "") {
				toast.error("El título y contenido de la nota son requeridos.", {
					duration: 5000
				});

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

				toast.success("Elemento de aprendizaje actualizado correctamente.", {
					duration: 5000
				});
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
					<Link className="text-slate-700 hover:text-slate-800" href="/biblia">
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
					return (
						<AccordionPanel key={listItem.id}>
							<AccordionTitle className="bg-slate-700 hover:bg-slate-800 border-slate-100 dark:bg-gray-900 dark:hover:bg-gray-950 dark:border-gray-600 cursor-pointer focus:ring-4 focus:ring-slate-200 text-sm md:text-base">
								<p className="text-slate-50 hover:text-slate-100 dark:text-gray-50 dark:hover:text-gray-100">
									{listItem.bible_book} {listItem.chapter_id}:
									{listItem.verse_from}
									{listItem.verse_to !== listItem.verse_from &&
										`-${listItem.verse_to}`}{" "}
								</p>
								<p className="text-sm text-slate-100 dark:text-gray-400">
									Biblia {listItem.bible_name}
								</p>
							</AccordionTitle>
							<AccordionContent className="text-gray-500 dark:text-gray-100 dark:bg-gray-800">
								<BiblePassageText chapterContent={listItem} />
								{/* For notes only */}
								{listItem.hasOwnProperty("title") &&
									listItem.hasOwnProperty("content") && (
										<form className="max-w-2xl mt-6">
											<div className="mb-2">
												<label
													className="text-sm font-medium text-gray-900 dark:text-white"
													data-testid="flowbite-label"
													htmlFor="title">
													Título de la nota
												</label>
												<input
													className="block w-full px-2 py-4 text-sm text-gray-900 border border-slate-100 rounded-lg bg-slate-50 focus:ring-slate-500 focus:border-slate-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-slate-500 dark:focus-visible:outline-gray-500"
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
												<div className={styles.ReactAdminContainer}>
													<TextEditor
														disabled={false}
														value={listItem.content || ""}
                            onChange={(value: string) =>
                              handleInputChange(
                              listItem.id,
                              "content",
                              value
                              )
                            }
													/>
												</div>
											</div>
											<div className="flex items-center flex-wrap gap-4 mt-6 mb-4">
												<button
													type="button"
													className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-2xl text-sm sm:w-auto p-4 text-center dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 cursor-pointer dark:border-gray-600 border border-slate-100 transition-all w-full"
													// FIX 3: Pass the entire listItem to state
													onClick={() =>
														handleUpdateMemoryOrNoteItem(listItem)
													}>
													Actualizar
												</button>
												<Link
													href={`/biblia/libros/capitulos/versiculos/${listItem.bible_id}/${listItem.book_id}/${listItem.chapter_id}/#${listItem.verse_from}`}
													type="button"
													className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-2xl text-sm sm:w-auto p-4 text-center dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 cursor-pointer dark:border-gray-600 border border-slate-100 transition-all w-full">
													Ir al capítulo
												</Link>
												<button
													type="button"
													className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-2xl text-sm w-full sm:w-auto p-4 text-center dark:bg-red-900 dark:hover:bg-red-800 dark:focus:ring-red-800 cursor-pointer dark:border-red-600 border border-red-100 transition-all"
													onClick={() => setDeletingMemoryOrNoteItem(listItem)}>
													Eliminar
												</button>
											</div>
										</form>
									)}
							</AccordionContent>
						</AccordionPanel>
					);
				})}
			</Accordion>

			{/* TODO: Refactor this modal  */}
			{/* Modal for deleting a lecture */}
			<Modal
				className="backdrop-blur-md bg-slate-50/10 dark:bg-gray-950/50"
				show={deletingMemoryOrNoteItem !== null}
				onClose={() => setDeletingMemoryOrNoteItem(null)}
				popup>
				<ModalHeader className="bg-slate-100 dark:bg-gray-800 text-slate-950 dark:text-gray-50 border-b border-slate-200 dark:border-gray-600 p-5">
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

				<ModalFooter className="border-t-slate-200 dark:border-gray-600 flex items-center justify-end">
					<button
						className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto p-4 text-center dark:bg-gray-900 dark:hover:bg-gray-800 dark:border dark:border-gray-600 dark:focus:ring-800 cursor-pointer transition-all mt-4"
						onClick={() => {
							if (deletingMemoryOrNoteItem) {
								// Get ID and bibleId from the state object
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
