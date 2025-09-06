// TODO: fetch the user memorization lists
// TODO: Add the ability to create a new memorization list
// TODO: Add the ability to add a new memorization to a memorization list

"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/authContext";
import {
	Button,
	Checkbox,
	Label,
	Modal,
	ModalBody,
	ModalHeader,
	TextInput
} from "flowbite-react";
import { BibleCrudActions } from "@/static";

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
	const { user } = useAuthContext();
	type BibleData = {
		by_user_id: string;
		bible_id: string;
		book_id: string;
		chapter_id: string;
		verse_from: string;
		verse_to: string;
    passage_text: string[];
	};

	const [bibleData, setBibleData] = useState<BibleData | null>(null);

	useEffect(() => {
		if (bibleId && passageId && chapterContent && user) {

			const bookName = passageId[0]?.split(" ")[0];

			const chapterNumber = passageId[0]?.split(":")[0]?.split(" ")[1];

			const verseFrom = Number(passageId[0]?.split(":")[0]?.split(" ")[1]);

			const verseTo =
				passageId.length > 1
					? Number(passageId[1].split(":")[1]?.split(" ")[0])
					: verseFrom;

			const selectedText = chapterContent.filter((verse: any) => {
        let selectedVerses: string[] = [];
				if (verse.number && verse.number >= verseFrom && verse.number <= verseTo) {
          selectedVerses.push(verse.text);
          return selectedVerses;
				}
			});

      // console.log("selectedText", selectedText);

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
    console.log(passageId);
	}, [passageId]);

	// bibleData structure //
	// bibleData.by_user_id: string;
	// bibleData.bible_id: string;
	// bibleData.book_id: string;
	// bibleData.chapter_id: string;
	// bibleData.verse_from: string;
	// bibleData.verse_to: string;
	// bibleData.passage_text: string;

	function onCloseModal() {
		setOpenModal(false);
	}

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
				console.log(bibleData?.passage_text);
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
		<Modal
			className="z-90"
			show={openModal}
			size="lg"
			onClose={onCloseModal}
			popup>
			<ModalHeader />
			<ModalBody>
				<form onSubmit={onFormSubmission}>
					<div className="space-y-6">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							{action === BibleCrudActions.note
								? "Añadir nota a pasaje biblico"
								: "Guardar pasaje en lista de memorización"}
						</h3>

						<p className="mb-1">Biblia: {bibleData?.bible_id}</p>

						<p>
							Pasaje:
							{bibleData?.book_id} {bibleData?.chapter_id}:
							{bibleData?.verse_from}{" "}
							{bibleData?.verse_to !== bibleData?.verse_from
								? "- " + bibleData?.verse_to
								: ""}
						</p>

						{
							<div>
								{bibleData?.passage_text.map((verse: any, index: number) => {
									if (verse.number) {
										return (
											<p key={index}>
												{verse.content.map((text: any, index: number) => {
													return (
														<span key={index} className="w">
															{verse.number} {text}
														</span>
													);
												})}
											</p>
										);
									}
								})}
							</div>
						}
						<div className="w-full">
							<Button
								className="p-4 text-sm font-medium text-center text-white dark:text-gray-950 rounded-2xl cursor-pointer bg-orange-700 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 dark:bg-gray-50 dark:hover:bg-gray-300 dark:focus:ring-gray-800 transition-all duration-300 ease-in"
								type="submit">
								Guardar{" "}
								{action === BibleCrudActions.note
									? "nota sobre pasaje"
									: "memorización"}
							</Button>
						</div>
					</div>
				</form>
			</ModalBody>
		</Modal>
	);
}
