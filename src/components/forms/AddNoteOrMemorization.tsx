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
import {toast} from "react-toastify"

export default function AddNoteOrMemorization({
	bibleId,
	passageId,
	openModal,
	setOpenModal,
	action,
	chapterContent
}: {
	bibleId: string;
	passageId: string[];
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	action: string | null;
	chapterContent: any;
}) {
  // user object
	const { user } = useAuthContext();

  // memorization data contains the memory_item information
	const [memorizationData, setMemorizationData] =
		useState<MemorizationSubmissionType | null>(null);

  // user memorization lists to relate to the memory_item
	const [userMemorizationLists, setUserMemorizationLists] = useState<MemorizationListType[]>([]);

  // memorizartion list the user will select to save the memory_item
  const [selectedMemorizationList, setSelectedMemorizationList] =
			useState<string>("");

  // new memorization list name
	const [newMemorizationList, setNewMemorizationList] = useState<string>("");

  // state to control the add memorization list form modal
	const [isAddMemorizationListFormOpen, setIsAddMemorizationListFormOpen] =
		useState<boolean>(false);

	// set the bible data
	useEffect(() => {
		if (bibleId && passageId && chapterContent && user) {

      // get the book name from the passageId
			const bookName = passageId[0]?.split(" ")[0];

      // get the chapter number from the passageId
			const chapterNumber = passageId[0]?.split(":")[0]?.split(" ")[1];

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
				by_user_id: user?.id,
				bible_id: bibleId,
				book_id: bookName,
				chapter_id: chapterNumber,
				verse_from: String(verseFrom),
				verse_to: String(verseTo),
				passage_text: selectedText
			});
		}
	}, [passageId]);

  // fetch user memorization lists
	const getUserMemorizationLists: () => Promise<string[] | null> = async () => {

    if(!user?.id) return null;

		const responseUserMemorizationLists: any = await useFetchUserMemorizationLists(
			user?.id
		);

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
		e.preventDefault();

		try {
			if (action === BibleCrudActions.note) {
				// console.log("TODO: Create endpoints for bible notes.");
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

        console.log(memorizationPostResponse);

				if (memorizationPostResponse.success) {
					console.log(memorizationPostResponse.message);
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

	return (
		<>
			<Modal
				className="z-90"
				show={openModal}
				size="2xl"
				onClose={() => setOpenModal(false)}
				popup>
				<ModalHeader />
				<ModalBody>
					<form onSubmit={onFormSubmission}>
						<div className="text-black dark:text-white space-y-6">
							<h3 className="text-xl font-medium mb-1">
								{action === BibleCrudActions.note
									? "Añadir nota a pasaje biblico"
									: "Guardar pasaje en lista de memorización"}
							</h3>
							{userMemorizationLists.length > 0 &&
								action === BibleCrudActions.memorization && (
									<>
										<label
											htmlFor="memorizationList"
											className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
											Selecciona una lista de memorización
										</label>
										<select
											className="p-2 text-sm font-medium text-black dark:text-white rounded-2xl cursor-pointer border border-orange-700 focus:ring-4 focus:ring-orange-300 dark:border-gray-50 dark:focus:ring-gray-800 transition-all duration-300 ease-in w-full md:w-1/2"
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
									</>
								)}

							<p className="mb-1">
								<span className="mr-1 font-bold">Biblia:</span>
								{memorizationData?.bible_id}
							</p>

							<p className="mb-2">
								<span className="mr-1 font-bold">Pasaje:</span>
								{memorizationData?.book_id} {memorizationData?.chapter_id}:
								{memorizationData?.verse_from}
								{memorizationData?.verse_to !== memorizationData?.verse_from
									? "-" + memorizationData?.verse_to
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
																	<span key={index} className="w">
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
																		{text?.text}
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
							<div className="w-full">
								{action === BibleCrudActions.memorization && (
									<Button
										onClick={() => setIsAddMemorizationListFormOpen(true)}
										type="button"
										className="p-4 text-sm font-medium text-center text-orange-50 dark:text-gray-950 rounded-2xl cursor-pointer bg-orange-700 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 dark:bg-gray-50 dark:hover:bg-gray-300 dark:focus:ring-gray-800 transition-all duration-300 ease-in mb-2">
										<svg
											className="w-6 h-6 text-orange-50 dark:text-black"
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
								<Button
									disabled={
										(action === BibleCrudActions.memorization &&
											selectedMemorizationList === "") ||
										!memorizationData?.passage_text
									}
									className="p-4 text-sm font-medium text-center text-white dark:text-gray-950 rounded-2xl cursor-pointer bg-orange-700 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 dark:bg-gray-50 dark:hover:bg-gray-300 dark:focus:ring-gray-800 transition-all duration-300 ease-in"
									type="submit">
									Guardar{" "}
									{action === BibleCrudActions.note
										? "nota sobre pasaje"
										: "memorización"}
								</Button>
								{BibleCrudActions.memorization && " ✔️"}
								{memorizationData?.passage_text && " ✔️"}
								{selectedMemorizationList && " ✔️"}
								{selectedMemorizationList}
							</div>
							<small className="text-gray-900 dark:text-gray-100 block mt-2">
								{userMemorizationLists.length === 0
									? "Aún no tienes ninguna lista de memorización. Crea una lista oprimiendo el botón para poder guardar este pasaje."
									: ""}
							</small>
						</div>
					</form>
				</ModalBody>
			</Modal>
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
	newMemorizationList: string;
	setNewMemorizationList: React.Dispatch<React.SetStateAction<string>>;
	getUserMemorizationLists: () => Promise<string[] | null>;
	userId: string | undefined;
}) => {
	const handleNewMemorizationListSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		console.log("Creating new memorization list:", newMemorizationList);

		const memorizationDataToSubmit = {
			by_user_id: String(userId),
			name: newMemorizationList,
			description: "This is about the new testament"
		};

		const memorizationPostRequest = await fetch(
			`/api/user/${userId}/memorization`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(memorizationDataToSubmit)
			}
		);

		const memorizationPostResponse = await memorizationPostRequest.json();

		if (memorizationPostResponse.success) {
			console.log(memorizationPostResponse.message);
		} else {
			console.error(
				"Error creating new memorization list:",
				memorizationPostResponse.message
			);
		}
	};

	return (
		<Modal
			className="z-90"
			show={isAddMemorizationListFormOpen}
			size="xl"
			onClose={() => {
				setIsAddMemorizationListFormOpen(false);
			}}
			popup>
			<ModalHeader />
			<ModalBody>
				<form onSubmit={handleNewMemorizationListSubmit}>
					<div className="text-black dark:text-white space-y-6">
						<h3 className="text-xl font-medium ">
							Añade una lista de memorización
						</h3>
						<input
							type="text"
							className="block w-full px-2 py-4 text-sm text-gray-900 border border-orange-100 rounded-2xl bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500"
							placeholder="Nombre de la lista de memorización"
							required
							value={newMemorizationList}
							onChange={(e) => setNewMemorizationList(e.target.value)}
						/>
						<div className="w-full flex justify-end gap-2">
							<Button
								onClick={() => setIsAddMemorizationListFormOpen(false)}
								color="gray"
								className="p-4 text-sm font-medium text-center text-white dark:text-gray-950 rounded-2xl cursor-pointer bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 dark:bg-gray-50 dark:hover:bg-gray-300 dark:focus:ring-gray-800 transition-all duration-300 ease-in"
								type="button">
								Cancelar
							</Button>
							<Button
								className="p-4 text-sm font-medium text-center text-white dark:text-gray-950 rounded-2xl cursor-pointer bg-orange-700 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 dark:bg-gray-50 dark:hover:bg-gray-300 dark:focus:ring-gray-800 transition-all duration-300 ease-in"
								type="submit">
								Guardar lista
							</Button>
						</div>
					</div>
				</form>
			</ModalBody>
		</Modal>
	);
};
