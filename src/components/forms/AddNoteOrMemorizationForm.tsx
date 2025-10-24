"use client";
import { memo, useEffect, useState } from "react";
import { useAuthContext } from "@/context/authContext";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { BibleCrudActions } from "@/static";
import { useFetchUserMemorizationLists } from "@/hooks";
import {
	MemorizationSubmissionType,
	MemorizationListType
} from "@/models/memorizationTypes";
import { toast } from "react-toastify";
import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { BottomModalTheme } from "@/components/theme/index";
import { BibleBookType } from "@/models/bibleTypes";

export default function AddNoteOrMemorizationForm({
	bibleId,
	passageId,
	openModal,
	setOpenModal,
	action,
	chapterContent,
  bibleBook,
  chapterInfo,
  bibleName
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
}) {

	// user object
	const { user } = useAuthContext();

	// memorization data contains the memory_item information
	const [memorizationData, setMemorizationData] =
		useState<MemorizationSubmissionType | null>(null);

	// user memorization lists to relate to the memory_item
	const [userMemorizationLists, setUserMemorizationLists] = useState<
		MemorizationListType[]
	>([]);

	// memorizartion list the user will select to save the memory_item
	const [selectedMemorizationList, setSelectedMemorizationList] =
		useState<string>("");

  // new memorization list name
  const [newMemorizationList, setNewMemorizationList] = useState<{ name: string; description: string }>({
    name: "",
    description: ""
  });

	// state to control the add memorization list form modal
	const [isAddMemorizationListFormOpen, setIsAddMemorizationListFormOpen] =
		useState<boolean>(false);

	// set the bible data
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

			setMemorizationData({
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

	// fetch user memorization lists
	const getUserMemorizationLists: () => Promise<string[] | null> = async () => {
		if (!user?.id) return null;

		const responseUserMemorizationLists: any =
			await useFetchUserMemorizationLists(user?.id);

		if (!responseUserMemorizationLists.success) {
			console.error("Error fetching user memorization lists");
			return;
		}

		setUserMemorizationLists(responseUserMemorizationLists.data);

		return responseUserMemorizationLists;
	};

	useEffect(() => {
		if (user?.id) {
			getUserMemorizationLists();
		}
	}, [user?.id]);

	const onFormSubmission = async (e: React.FormEvent) => {

    if(!user) return;

		e.preventDefault();

		try {
			if (action === BibleCrudActions.note) {
				//
				// bible_note //
				// id int
				// title string
				// passage_id string
				// bible_id string
				// passage_text string
				// passage_note text
				// by_user_id reference int
				// created_at timestamp now
				// updated_at timestamp now
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
							selectedMemorizationList,
							memorizationData
						})
					}
				);

				const memorizationPostResponse = await memorizationPostRequest.json();

				if (memorizationPostResponse.success) {

					// close the modal
					setOpenModal(false);
					// clear the selectedMemorizationList
					setSelectedMemorizationList("");
					// clear the memorizationData
					setMemorizationData(null);

					toast.success("Memorización guardada correctamente");

				} else {

					toast.error(memorizationPostResponse.message);

					return;
				}
			}

		} catch (error) {

			console.error(error);

		}
	};

	// TODO: pass the getUserMemorizationLists to the AddNewMemorizationListForm component and call it after creating a new list to refresh the lists

	// TODO: when a new memorization item is created show a success message and close all of the modals

	// TODO: upon page load, lookup for any user memorization items to highlight or note the verses that the user has already saved in a memory list

  // TODO: Create a feature to PIN functionalities in the home page, for example, if the user uses more often the notes feature, then show that in the home page as a quick access button, or the saved lectures feature and notes and memory lists in the bible section. It will have a config section in the admin panel

	return (
		<>

			<Drawer
				className="bg-white/50 dark:bg-black/50 backdrop-blur-lg border border-t-sky-200 dark:border-t-gray-600"
				theme={BottomModalTheme}
				open={openModal}
				onClose={() => setOpenModal(false)}
				backdrop={false}
				position="bottom">

				<DrawerHeader
					className="text-black dark:text-white max-w-[80ch] mx-auto py-0 px-2 xl:px-0 border-b border-sky-100 dark:border-gray-600 mb-6"
					title={
						action === BibleCrudActions.note
							? "Escribe un Nota"
							: "Añade a Lista de Memorización"
					}
					titleIcon={() => <></>}
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
								{memorizationData?.bible_name} ({memorizationData?.bible_id})
							</p>

							<p className="mb-2">
								<span className="mr-1 font-bold">Pasaje:</span>
								{memorizationData?.bible_book} {memorizationData?.chapter_id}{" "}
								{" : "}
								{memorizationData?.verse_from}
								{memorizationData?.verse_to !== memorizationData?.verse_from
									? `-${memorizationData?.verse_to}`
									: ""}
							</p>

							{
								<div>
									{memorizationData?.passage_text.map(

										(verse: any, index: number) => {

											if (verse?.number) {

												return (

													<p key={index}>

														<span className="w mr-1.5 font-bold">
															{verse?.number}
														</span>

														{verse?.content.map((text: any, index: number) => {

															if (verse && verse.lineBreak) {
																return <br key={index} />;
															}

															if (typeof text === "string") {
																return (
																	<span key={index} className="w mx-1">
																		{text}
																	</span>
																);
															}

															if (text?.text) {
																return (
																	<span
																		className={`${
																			text?.wordsOfJesus
																				? "mx-1 text-red-600 dark:text-red-400"
																				: ""
																		}`}
																		key={index}>
																		{text?.text}{" "}
																	</span>
																);
															}
														})}
													</p>
												);
											}
										}
									)}
								</div>
							}
							<form
								className="max-w-xl  mx-auto pb-6"
								onSubmit={onFormSubmission}>

								{userMemorizationLists.length > 0 &&

									action === BibleCrudActions.memorization && (

										<div className="mt-6 mb-2">

											<label
												className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
												htmlFor="memorizationList">
												Selecciona una lista de memorización
											</label>

											<select
												className="p-2 text-sm font-medium text-black dark:text-white rounded-2xl cursor-pointer border border-sky-700 focus:ring-4 focus:ring-sky-300 dark:border-gray-600 dark:focus:ring-gray-800 transition-all duration-300 ease-in w-full md:w-3/4"
												id="memorizationList"
												value={selectedMemorizationList || ""}
												onChange={(e) =>
													setSelectedMemorizationList(e.target.value)
												}>

												<option value="" disabled>
													Selecciona una lista
												</option>

												{userMemorizationLists.map((list) => (
													<option
														className="text-black dark:text-white"
														key={list?.id}
														value={list?.name}>
														{list?.name}
													</option>
												))}

											</select>
										</div>
									)}

								{userMemorizationLists.length === 0 ? (
									<p className="text-gray-900 dark:text-gray-100 block my-2 w-full md:w-3/4">
										Aún no tienes ninguna lista de memorización. Crea una lista
										oprimiendo el botón para poder guardar este pasaje.
									</p>
								) : null}

								<div className="w-full md:w-3/4">
									{action === BibleCrudActions.memorization && (
										<Button
                    className="p-4 text-sm font-medium text-center text-white rounded-2xl cursor-pointer bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 dark:bg-gray-900 dark:hover:bg-gray-800 border border-sky-100 dark:border-gray-600 dark:focus:ring-gray-800 transition-all duration-300 ease-in mb-2 w-full"
											onClick={() => setIsAddMemorizationListFormOpen(true)}
											type="button">
											<svg
												className="w-6 h-6 text-sky-50 dark:text-white"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												fill="none"
												viewBox="0 0 24 24">
												<path
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M5 12h14m-7 7V5"
												/>
											</svg>
											Crear nueva lista de memorización
										</Button>
									)}

									{action === BibleCrudActions.memorization &&
										selectedMemorizationList !== "" && (
											<Button
												className="p-4 text-sm font-medium text-center text-white dark:text-gray-950 rounded-2xl cursor-pointer bg-sky-700 hover:bg-sky-600 focus:ring-4 focus:ring-sky-300 dark:bg-gray-50 dark:hover:bg-gray-300 dark:focus:ring-gray-800 transition-all duration-300 ease-in w-full"
												type="submit">
												Guardar{" "}
												{action === BibleCrudActions.memorization
													? "memorización"
													: "nota"}
											</Button>
									)}

								</div>
							</form>
						</div>
					</div>
				</DrawerItems>
			</Drawer>
			<AddNewMemorizationListForm
				isAddMemorizationListFormOpen={isAddMemorizationListFormOpen}
				setIsAddMemorizationListFormOpen={setIsAddMemorizationListFormOpen}
				newMemorizationList={newMemorizationList}
				setNewMemorizationList={setNewMemorizationList}
				getUserMemorizationLists={getUserMemorizationLists}
				userId={user?.id}
			/>
		</>
	);
}

const AddNewMemorizationListForm = ({
	isAddMemorizationListFormOpen,
	setIsAddMemorizationListFormOpen,
	newMemorizationList,
	setNewMemorizationList,
	getUserMemorizationLists,
	userId
}: {
	isAddMemorizationListFormOpen: boolean;
	setIsAddMemorizationListFormOpen: React.Dispatch<
		React.SetStateAction<boolean>
	>;
	newMemorizationList: { name: string; description: string };
	setNewMemorizationList: React.Dispatch<React.SetStateAction<{ name: string; description: string }>>;
	getUserMemorizationLists: () => Promise<string[] | null>;
	userId: string | undefined;
}) => {
	const handleNewMemorizationListSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		const memorizationDataToSubmit = {
			by_user_id: String(userId),
			name: newMemorizationList.name,
			description: newMemorizationList.description
		};

		const memorizationPostRequest = await fetch(
			`/api/user/${userId}/memorization?userId=${userId}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					selectedMemorizationList: "",
					memorizationData: memorizationDataToSubmit
				})
			}
		);

		const memorizationPostResponse = await memorizationPostRequest.json();

		if (memorizationPostResponse.success) {

			setIsAddMemorizationListFormOpen(false);
			setNewMemorizationList({ name: "", description: "" });
			getUserMemorizationLists();

		} else {
			console.error(
				"Error creating new memorization list:",
				memorizationPostResponse.message
			);
		}
	};

	return (
		<Modal
			show={isAddMemorizationListFormOpen}
			size="xl"
			onClose={() => {
				setIsAddMemorizationListFormOpen(false);
			}}
			popup>
			<div className="bg-white dark:bg-gray-800 rounded-2xl border border-sky-200 dark:border-gray-600">
				<ModalHeader />
				<ModalBody>
					<form onSubmit={handleNewMemorizationListSubmit}>
						<div className="text-black dark:text-white space-y-2">
							<h3 className="text-lg font-medium ">
								Crea lista de memorización
							</h3>
							<input
								type="text"
								className="block w-full px-2 py-4 text-sm text-gray-900 border border-sky-100 rounded-2xl bg-sky-50 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-sky-500 dark:focus-visible:outline-gray-500"
								placeholder="Nombre"
								required
								value={newMemorizationList.name}
								onChange={(e) => setNewMemorizationList({ ...newMemorizationList, name: e.target.value })}
							/>

							<input
								type="text"
								className="block w-full px-2 py-4 text-sm text-gray-900 border border-sky-100 rounded-2xl bg-sky-50 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-sky-500 dark:focus-visible:outline-gray-500"
								placeholder="Descripción"
								required
								value={newMemorizationList.description}
								onChange={(e) => setNewMemorizationList({ ...newMemorizationList, description: e.target.value })}
							/>

							<div className="w-full flex justify-end gap-2 mt-4">
								<Button
									onClick={() => setIsAddMemorizationListFormOpen(false)}
									color="gray"
									className="p-4 text-sm font-medium text-center text-white dark:text-white rounded-2xl cursor-pointer bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 transition-all duration-300 border border-sky-100 dark:border-gray-600 ease-in"
									type="button">
									Cancelar
								</Button>
								<Button
									className="p-4 text-sm font-medium text-center text-white dark:text-white rounded-2xl cursor-pointer bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 transition-all duration-300 border border-sky-100 dark:border-gray-600 ease-in"
									type="submit">
									Guardar lista
								</Button>
							</div>
						</div>
					</form>
				</ModalBody>
			</div>
		</Modal>
	);
};
