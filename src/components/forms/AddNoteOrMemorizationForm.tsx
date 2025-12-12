// TODO: Create a feature to PIN functionalities in the home page, for example, if the user uses more often the notes feature, then show that in the home page as a quick access button, or the saved lectures feature and notes and memory lists in the bible section. It will have a config section in the admin panel

"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/authContext";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { BibleCrudActions } from "@/static";
import { useFetchUserLearningLists } from "@/hooks";
import { toast } from "react-hot-toast";
import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { BottomDrawerTheme } from "@/components/theme/index";
import { BibleBookType } from "@/models/bibleTypes";
import { LordIconHover } from "@/components/animations/lordicon/index";
import LOTTIE_BRAIN_HOVER_PINCH from "@/lotties/brain-hover-pinch.json";
import LOTTIE_NOTEBOOK_1_HOVER_PINCH from "@/lotties/notebook-1-hover-pinch.json";
import LOTTIE_PLUS_HOVER_PINCH from "@/lotties/plus-math-hover-pinch.json";
import LOTTIE_FLOPPY_HOVER_PINCH from "@/lotties/floppy-hover.json";
import {
	MemoryItemType,
	NoteOrMemoryListType
} from "@/models/memorizationAndNotesTypes";
import BibleContentBuilder from "@/components/bible/BibleContentBuilder";

export default function AddNoteOrMemorizationForm({
	bibleId,
	passageId,
	openModal,
	setOpenModal,
	action,
	chapterContent,
	bibleBook,
	chapterInfo,
	bibleName,
	fetchUserSavedVerses
}: {
	bibleId: string;
	passageId: string[];
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	action: string | null;
	chapterContent: any;
	bibleBook: BibleBookType;
	chapterInfo: any;
	bibleName: string;
	fetchUserSavedVerses: () => Promise<void>;
}) {
	// STATE //
	// user object
	const { user } = useAuthContext();

	// memorization data contains the learning_item information
	const [bibleData, setBibleData] = useState<MemoryItemType | null>(null);

	// user memorization lists to relate to the learning_item
	const [userLearningLists, setUserLearningLists] = useState<
		NoteOrMemoryListType[]
	>([]);

	// memorizartion list the user will select to save the learning_item
	const [selectedLearningList, setSelectedLearningList] = useState<string>("");

	// new memorization list name
	const [newLearningList, setNewLearningList] = useState<{
		name: string;
		description: string;
	}>({
		name: "",
		description: ""
	});

	// state to control the add memorization list form modal
	const [isAddLearningListFormOpen, setIsAddMemorizationListFormOpen] =
		useState<boolean>(false);

	const [userNote, setUserNote] = useState<{
		title: string;
		content: string;
	}>({
		title: "",
		content: ""
	});

	const [titleFieldHasValue, setTitleFieldHasValue] = useState<boolean>(false);
	const [contentFieldHasValue, setContentFieldHasValue] =
		useState<boolean>(false);

	// Effect 1: Set the bible data
	useEffect(() => {
		if (bibleId && passageId && chapterContent && user) {
			// get the initial verse number from the passageId
			const verseFrom = Number(passageId[0]?.split(":")[1]);

			// get the last verse number from the passageId, if there is no last verse, set it to the initial verse number
			const verseTo =
				passageId.length > 1 ? Number(passageId[1]?.split(":")[1]) : verseFrom;

			// get the selected text from the chapterContent based on the verseFrom and verseTo
			const selectedText = chapterContent.filter((verse: any) => {
				let selectedVerses: string[] = [];
				if (
					verse.number &&
					verse.number >= verseFrom &&
					verse.number <= verseTo
				) {
					selectedVerses.push(verse.text);
					return selectedVerses;
				}
			});

			setBibleData({
				id: null,
				bible_name: bibleName,
				bible_book: bibleBook?.name,
				by_user_id: user?.id,
				bible_id: bibleId,
				book_id: bibleBook.id,
				chapter_id: String(chapterInfo.number),
				verse_from: String(verseFrom),
				verse_to: String(verseTo),
				passage_text: selectedText
			});
		}
	}, [passageId]);

	// Effect 2: fetch user memorization lists when user is available
	useEffect(() => {
		if (!user) return;

		if (user) {
			getUserLearningLists();
		}

		return () => {
			setUserLearningLists([]);
		};
	}, [user]);

	// -- HANDLERS -- //
	// fetch user memorization lists
	const getUserLearningLists: () => Promise<string[] | null> = async () => {
		if (!user) return null;

		const responseUserMemorizationLists: any = await useFetchUserLearningLists(
			user?.id
		);

		if (!responseUserMemorizationLists.success) {
			console.error("Error fetching user memorization lists");
			return;
		}

		setUserLearningLists(responseUserMemorizationLists.data);

		return responseUserMemorizationLists;
	};

	// handle form submission
	const onFormSubmission = async (e: React.FormEvent) => {
		if (!user) return;

		e.preventDefault();

		if (!selectedLearningList) {
			toast.error("Debes seleccionar una lista de aprendizaje", {
				duration: 5000
			});

			return;
		}

		try {
			if (action === BibleCrudActions.note) {
				if (!userNote.title || !userNote.content) {
					toast.error("El título y el contenido de la nota son obligatorios.", {
						duration: 5000
					});
					return;
				}

				const notePostRequest = await fetch(
					`/api/user/${user?.id}/memorization`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							selectedLearningList,
							memorizationData: {
								...bibleData,
								name: newLearningList.name,
								description: newLearningList.description,
								note_title: userNote.title,
								note_content: userNote.content
							}
						})
					}
				);

				const notePostResponse = await notePostRequest.json();

				if (notePostResponse.success) {
					// close the modal
					setOpenModal(false);
					// clear the selectedLearningList
					setSelectedLearningList("");
					// clear the bibleData
					setBibleData(null);

					toast.success("Nota guardada correctamente.", {
						duration: 5000
					});
				} else {
					toast.error(notePostResponse.message, {
						duration: 5000
					});

					return;
				}
			}

			if (action === BibleCrudActions.memorization) {
				const memorizationPostRequest = await fetch(
					`/api/user/${user?.id}/memorization`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							selectedLearningList,
							memorizationData: {
								...bibleData,
								name: newLearningList.name,
								description: newLearningList.description,
								note_title: userNote.title,
								note_content: userNote.content
							}
						})
					}
				);

				const memorizationPostResponse = await memorizationPostRequest.json();

				if (memorizationPostResponse.success) {
					// close the modal
					setOpenModal(false);
					// clear the selectedLearningList
					setSelectedLearningList("");
					// clear the bibleData
					setBibleData(null);

					toast.success("Memorización guardada correctamente.", {
						duration: 5000
					});
				} else {
					toast.error(memorizationPostResponse.message, {
						duration: 5000
					});

					return;
				}
			}

			fetchUserSavedVerses();
		} catch (error) {
			console.error(error);
		}
	};

	const handleChangeLearningList = async (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedLearningList(e.target.value);

		// make a request to the learning list to check if the memorization data exists in that list

		// 1. get the list data to use the id
		const listName = e.target.value;

		// filter the userLearningLists to get the list data
		const listData = userLearningLists.filter((list) => list.name === listName);

		const listId = listData[0]?.id;

		const listDataRequest = await fetch(
			`/api/user/${user?.id}/lists/validation/${listId}`,
			{
				method: "POST",
				body: JSON.stringify({
					memorizationData: bibleData
				}),
				headers: {
					"Content-Type": "application/json"
				}
			}
		);

		const listDataResponse = await listDataRequest.json();

		// 2. check if the memorization data exists in that list
		if (listDataResponse.success) {
			console.log(listDataResponse);
			// if it exists, set the note data to the userNote state
			setUserNote({
				title: listDataResponse.data?.title,
				content: listDataResponse.data?.content
			});

			if (listDataResponse.data?.title !== undefined) {
				setTitleFieldHasValue(true);
			} else {
				setTitleFieldHasValue(false);
			}

			if (listDataResponse.data?.content !== undefined) {
				setContentFieldHasValue(true);
			} else {
				setContentFieldHasValue(false);
			}
		} else {
			// if it doesn't exist, clear the userNote state
			setUserNote({
				title: "",
				content: ""
			});

			setTitleFieldHasValue(false);
			setContentFieldHasValue(false);
		}
	};

	return (
		<>
			<Drawer
				className="bg-white/60 dark:bg-black/70 backdrop-blur-lg border border-t-blue-200 dark:border-t-gray-600"
				theme={BottomDrawerTheme}
				open={openModal}
				onClose={() => setOpenModal(false)}
				backdrop={false}
				position="bottom">

				<DrawerHeader
					className="text-black dark:text-white max-w-[80ch] mx-auto py-0 px-2 xl:px-0 border-b border-blue-100 dark:border-gray-600 mb-6"
					title={
						action === BibleCrudActions.note
							? "Escribe Nota Sobre Pasaje"
							: "Añade a Lista de Aprendizaje"
					}
					titleIcon={() => (
						<LordIconHover
							size={32}
							ICON_SRC={
								action === BibleCrudActions.note
									? LOTTIE_BRAIN_HOVER_PINCH
									: LOTTIE_NOTEBOOK_1_HOVER_PINCH
							}
							state="hover-pinch"
							text=""
						/>
					)}
				/>

				<DrawerItems className="overflow-y-auto max-h-[65vh]">
					<div className="max-w-[80ch] mx-auto py-0 px-2 xl:px-0">
						<div className="text-black dark:text-white">
							<h3 className="text-lg mb-1 font-bold">
								{action === BibleCrudActions.note
									? "Añadir nota a pasaje biblico"
									: "Información del pasaje a memorizar"}
							</h3>
							<p className="mb-1">
								<span className="mr-1 font-bold">Biblia:</span>
								{bibleData?.bible_name} ({bibleData?.bible_id})
							</p>
							<p className="mb-2">
								<span className="mr-1 font-bold">Pasaje:</span>
								{bibleData?.bible_book} {bibleData?.chapter_id} {" : "}
								{bibleData?.verse_from}
								{bibleData?.verse_to !== bibleData?.verse_from
									? `-${bibleData?.verse_to}`
									: ""}
							</p>
							{
								<div>
									{bibleData?.passage_text.map(
										(chapterData: any, index: number) => {
											return (
												<BibleContentBuilder
													chapterData={chapterData}
													key={index}
												/>
											);
										}
									)}
								</div>
							}
							<form
								className="max-w-xl  mx-auto pb-6"
								onSubmit={onFormSubmission}>
								<div className="mt-6 mb-2">
									<label
										className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
										htmlFor="memorizationList">
										Selecciona una lista de aprendizaje
									</label>

									<select
										className="p-2 text-sm font-medium text-black dark:text-white rounded-lg cursor-pointer border border-blue-700 focus:ring-4 focus:ring-blue-300 dark:border-gray-600 dark:focus:ring-gray-800 transition-all duration-300 ease-in w-full"
										id="memorizationList"
										value={selectedLearningList || ""}
										onChange={(e) => handleChangeLearningList(e)}>
										<option value="" disabled>
											Selecciona una lista
										</option>

										{userLearningLists.map((list) => (
											<option
												className="text-black dark:text-white"
												key={list?.id}
												value={list?.name}>
												{list?.name}
											</option>
										))}
									</select>
								</div>

								{userLearningLists.length === 0 ? (
									<p className="text-gray-900 dark:text-gray-100 block my-2 w-full">
										Aún no tienes ninguna lista de memorización. Crea una lista
										oprimiendo el botón para poder guardar este pasaje.
									</p>
								) : null}

								<div className="w-full">

									<Button
										className="p-4 text-sm font-medium text-center text-white rounded-lg cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-gray-900 dark:hover:bg-gray-800 border border-blue-100 dark:border-gray-600 dark:focus:ring-gray-800 transition-all duration-300 ease-in mb-2 w-full gap-0.5"
										onClick={() => setIsAddMemorizationListFormOpen(true)}
										type="button">

										<LordIconHover
											size={24}
											ICON_SRC={
												action === BibleCrudActions.note
													? LOTTIE_BRAIN_HOVER_PINCH
													: LOTTIE_PLUS_HOVER_PINCH
											}
											state="hover-pinch"
											text="Crear nueva lista de aprendizaje"></LordIconHover>

									</Button>

									{action === BibleCrudActions.note && (
										<div className="mt-6 mb-2">
											<div className="mb-3">
												<label
													className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
													htmlFor="note_title">
													Título de la nota
												</label>

												{titleFieldHasValue}
												<input
													disabled={titleFieldHasValue}
													type="text"
													className="p-2 text-sm font-medium text-black dark:text-white rounded-lg cursor-pointer border border-blue-700 focus:ring-4 focus:ring-blue-300 dark:border-gray-600 dark:focus:ring-gray-800 transition-all duration-300 ease-in w-full"
													id="note_title"
													value={userNote.title || ""}
													onChange={(e) =>
														setUserNote({
															...userNote,
															title: e.target.value
														})
													}></input>
											</div>

											<div className="mb-3">
												<label
													className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
													htmlFor="note_content">
													Contenido
												</label>

												{contentFieldHasValue}
												<textarea
													disabled={contentFieldHasValue}
													rows={5}
													className="p-2 text-sm font-medium text-black dark:text-white rounded-lg cursor-pointer border border-blue-700 focus:ring-4 focus:ring-blue-300 dark:border-gray-600 dark:focus:ring-gray-800 transition-all duration-300 ease-in w-full"
													id="note_content"
													value={userNote.content || ""}
													onChange={(e) =>
														setUserNote({
															...userNote,
															content: e.target.value
														})
													}
												/>
											</div>
										</div>
									)}

									<Button
										className="p-4 text-sm font-medium text-center text-white dark:text-gray-950 rounded-lg cursor-pointer bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-gray-50 dark:hover:bg-gray-300 dark:focus:ring-gray-800 transition-all duration-300 ease-in w-full gap-0.5"
										type="submit">
										<LordIconHover
											size={24}
											ICON_SRC={LOTTIE_FLOPPY_HOVER_PINCH}
											state="hover-put-in-out"
											text={`Guardar `}></LordIconHover>
										<span className="text-sm md:text-base">
											{action === BibleCrudActions.memorization
												? "pasaje"
												: "pasaje con nota"}
										</span>
									</Button>

								</div>
							</form>
						</div>
					</div>
				</DrawerItems>

			</Drawer>

			<AddNewLearningListForm
				isAddLearningListFormOpen={isAddLearningListFormOpen}
				setIsAddMemorizationListFormOpen={setIsAddMemorizationListFormOpen}
				newLearningList={newLearningList}
				setNewLearningList={setNewLearningList}
				getUserLearningLists={getUserLearningLists}
				userId={user?.id}
			/>
		</>
	);
}

const AddNewLearningListForm = ({
	isAddLearningListFormOpen,
	setIsAddMemorizationListFormOpen,
	newLearningList,
	setNewLearningList,
	getUserLearningLists,
	userId
}: {
	isAddLearningListFormOpen: boolean;
	setIsAddMemorizationListFormOpen: React.Dispatch<
		React.SetStateAction<boolean>
	>;
	newLearningList: { name: string; description: string };
	setNewLearningList: React.Dispatch<
		React.SetStateAction<{ name: string; description: string }>
	>;
	getUserLearningLists: () => Promise<string[] | null>;
	userId: string | undefined;
}) => {
	const handleNewMemorizationListSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		try {
			e.preventDefault();

			const memorizationDataToSubmit = {
				bible_name: "", // full bible version name
				bible_id: "", // bible id (abbreviation)
				by_user_id: String(userId),
				bible_book: "", // bible book name
				book_id: "", // book id (abbreviation)
				chapter_id: "",
				verse_from: "",
				verse_to: "",
				passage_text: "",
				name: newLearningList.name,
				description: newLearningList.description
			};

			const learningListPostRequest = await fetch(
				`/api/user/${userId}/memorization?userId=${userId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						selectedLearningList: "",
						memorizationData: memorizationDataToSubmit
					})
				}
			);

			const memorizationPostResponse = await learningListPostRequest.json();

			if (memorizationPostResponse.success) {
				setIsAddMemorizationListFormOpen(false);

				setNewLearningList({ name: "", description: "" });

				getUserLearningLists();

				toast.success(memorizationPostResponse.message, {
					duration: 5000
				});

			} else {

				toast.error(memorizationPostResponse.message, {
					duration: 5000
				});

			}
		} catch (error) {

			console.error("Error creating new memorization list:", error);

    }
	};

	return (
		<Modal
			className="backdrop-blur-md bg-blue-50/10 dark:bg-gray-950/50"
			show={isAddLearningListFormOpen}
			size="xl"
			onClose={() => {
				setIsAddMemorizationListFormOpen(false);
			}}
			dismissible
			popup>
			<div className="bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-gray-600">
				<ModalHeader className="bg-blue-100 dark:bg-gray-800 text-blue-950 dark:text-gray-50 border-b border-blue-200 dark:border-gray-600 p-5">
					Crea lista de memorización
				</ModalHeader>
				<ModalBody className="p-6">
					<form onSubmit={handleNewMemorizationListSubmit}>
						<div className="text-black dark:text-white space-y-2">
							<h3 className="text-lg font-medium ">
								Crea lista de memorización
							</h3>
							<input
								type="text"
								className="block w-full px-2 py-4 text-sm text-gray-900 border border-blue-100 rounded-lg bg-blue-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-blue-500 dark:focus-visible:outline-gray-500"
								placeholder="Nombre"
								required
								value={newLearningList.name}
								onChange={(e) =>
									setNewLearningList({
										...newLearningList,
										name: e.target.value
									})
								}
							/>

							<input
								type="text"
								className="block w-full px-2 py-4 text-sm text-gray-900 border border-blue-100 rounded-lg bg-blue-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-blue-500 dark:focus-visible:outline-gray-500"
								placeholder="Descripción"
								required
								value={newLearningList.description}
								onChange={(e) =>
									setNewLearningList({
										...newLearningList,
										description: e.target.value
									})
								}
							/>
						</div>
						<div className="w-full flex justify-end gap-2 mt-4 border-t-blue-200 dark:border-gray-600">
							<Button
								onClick={() => setIsAddMemorizationListFormOpen(false)}
								color="gray"
								className="p-4 text-sm font-medium text-center text-white dark:text-white rounded-lg cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 transition-all duration-300 border border-blue-100 dark:border-gray-600 ease-in"
								type="button">
								Cancelar
							</Button>
							<Button
								className="p-4 text-sm font-medium text-center text-white dark:text-white rounded-lg cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 transition-all duration-300 border border-blue-100 dark:border-gray-600 ease-in"
								type="submit">
								Guardar lista
							</Button>
						</div>
					</form>
				</ModalBody>
			</div>
		</Modal>
	);
};
