// TODO: fetch the user memorization lists
// TODO: Add the ability to create a new memorization list
// TODO: Add the ability to add a new memorization to a memorization list

"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/authContext";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { BibleCrudActions } from "@/static";
import { useFetchUserMemorizationLists } from "@/hooks";

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
	type BibleData = {
		by_user_id: string;
		bible_id: string;
		book_id: string;
		chapter_id: string;
		verse_from: string;
		verse_to: string;
		passage_text: string[];
	};

	const { user } = useAuthContext();
	const responseUserMemorizationLists = useFetchUserMemorizationLists(
		user?.id || ""
	);

	const [bibleData, setBibleData] = useState<BibleData | null>(null);
	const [userMemorizationLists, setUserMemorizationLists] = useState<string[]>(
		[]
	);
	const [selectedMemorizationList, setSelectedMemorizationList] = useState<
		string | null
	>(null);
	const [isAddMemorizationListFormOpen, setIsAddMemorizationListFormOpen] =
		useState<boolean>(false);

	// set the bible data
	useEffect(() => {
		if (bibleId && passageId && chapterContent && user) {
			const bookName = passageId[0]?.split(" ")[0];

			const chapterNumber = passageId[0]?.split(":")[0]?.split(" ")[1];

			const verseFrom = Number(passageId[0]?.split(":")[1]);

			const verseTo =
				passageId.length > 1 ? Number(passageId[1]?.split(":")[1]) : verseFrom;

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

  useEffect(() => {
    const getUserMemorizationLists = async () => {

      const responseUserMemorizationLists = await useFetchUserMemorizationLists(
        user?.id || ""
      );

      if (!responseUserMemorizationLists.success) {
        console.error("Error fetching user memorization lists");
        return;
      }

      setUserMemorizationLists(responseUserMemorizationLists.data);

    }

    if (user?.id) {
      getUserMemorizationLists();
    }

  }, [user?.id]);

	const onFormSubmission = (e: React.FormEvent) => {
		e.preventDefault();

		try {
			if (action === BibleCrudActions.note) {
				console.log("TODO: Create endpoints for bible notes.");
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
				// memorization_list //
				// id int
				// name string
				// by_user_id reference int
				// created_at timestamp now
				// updated_at timestamp now
				// many to many memorization_list and users //
				// id int
				// memorization_list_id reference int
				// passage_id string
				// bible_id string
				// passage_text string
				// by_user_id reference int
				// created_at timestamp now
				// updated_at timestamp now
			}
		} catch (error) {
			console.error(error);
		}
	};

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
							<h3 className="text-xl font-medium ">
								{action === BibleCrudActions.note
									? "Añadir nota a pasaje biblico"
									: "Guardar pasaje en lista de memorización"}
							</h3>

							<p className="mb-1">
								<span className="mr-1 font-bold">Biblia:</span>
								{bibleData?.bible_id}
							</p>

							<p className="mb-2">
								<span className="mr-1 font-bold">Pasaje:</span>
								{bibleData?.book_id} {bibleData?.chapter_id}:
								{bibleData?.verse_from}
								{bibleData?.verse_to !== bibleData?.verse_from
									? "-" + bibleData?.verse_to
									: ""}
							</p>

							{
								<div>
									{bibleData?.passage_text.map((verse: any, index: number) => {
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
									})}
								</div>
							}
							<div className="w-full">
								{userMemorizationLists.length > 0 &&
									action === BibleCrudActions.memorization && (
										<select className="p-2 text-sm font-medium text-center text-orange-50 dark:text-gray-950 rounded-2xl cursor-pointer border border-orange-700 focus:ring-4 focus:ring-orange-300 dark:border-gray-50 dark:focus:ring-gray-800 transition-all duration-300 ease-in mb-2">
											{userMemorizationLists.map((list) => (
												<option
													key={list}
													value={list}
													onClick={() => setSelectedMemorizationList(list)}>
													{list}
												</option>
											))}
										</select>
									)}
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
											selectedMemorizationList === null) ||
										!bibleData?.passage_text
									}
									className="p-4 text-sm font-medium text-center text-white dark:text-gray-950 rounded-2xl cursor-pointer bg-orange-700 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 dark:bg-gray-50 dark:hover:bg-gray-300 dark:focus:ring-gray-800 transition-all duration-300 ease-in"
									type="submit">
									Guardar{" "}
									{action === BibleCrudActions.note
										? "nota sobre pasaje"
										: "memorización"}
								</Button>
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
      />
		</>
	);
}

const AddNewMemorizationListForm = ({
	isAddMemorizationListFormOpen,
	setIsAddMemorizationListFormOpen
}: {
	isAddMemorizationListFormOpen: boolean;
	setIsAddMemorizationListFormOpen: React.Dispatch<
		React.SetStateAction<boolean>
	>;
}) => {
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
				<form>
					<div className="text-black dark:text-white space-y-6">
						<h3 className="text-xl font-medium ">
							Añade una lista de memorización
						</h3>
						<input
							type="text"
							className="block w-full px-2 py-4 text-sm text-gray-900 border border-orange-300 rounded-2xl bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500"
							placeholder="Nombre de la lista de memorización"
							required
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
