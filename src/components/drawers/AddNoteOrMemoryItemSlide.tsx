import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { useState, useEffect } from "react";
import { parseSid } from "@/helpers";
import { BibleCrudActions } from "@/static";
import AddNoteOrMemorizationForm from "../forms/AddNoteOrMemorizationForm";
import { BibleBookType } from "@/models/bibleTypes";
import { LordIconHover } from "@/components/animations/lordicon";
import LOTTIE_INTUITIVE_HOVER_PINCH from "@/lotties/intuitive-hover-pinch.json";
import LOTTIE_NOTEBOOK_2_HOVER_PINCH from "@/lotties/notebook-2-hover-pinch.json";

export default function AddNoteOrMemorySlide({
	selectedVerses,
	setSelectedVerses,
	bibleId,
	chapterContent,
	isDrawerOpen,
	bibleBook,
	chapterInfo,
	bibleName,
	fetchUserSavedVerses
}: {
	selectedVerses: Set<string>;
	setSelectedVerses: React.Dispatch<React.SetStateAction<Set<string>>>;
	bibleId: string;
	chapterContent: any;
	isDrawerOpen: boolean;
	bibleBook: BibleBookType;
	chapterInfo: any;
	bibleName: string;
	fetchUserSavedVerses: () => Promise<void>;
}) {
	const [apiSelectedVerses, setApiSelectedVerses] = useState<Set<string>>(
		new Set()
	);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [action, setAction] = useState<string | null>(null);

	// get the selectedVerses and sort it from low to high, then set get the lowest and the highest and set it to the apiSelectedVerses
	useEffect(() => {
		// 1. Convert the Set to an array and parse each verse string.
		const parsedVerses = Array.from(selectedVerses)
			.map(parseSid)
			.filter((p) => p !== null); // Remove any items that failed to parse

		// 2. Sort the array numerically based on the 'verse' number.
		parsedVerses.sort((a, b) => a.verse - b.verse);

		// 3. If there are any sorted verses, get the lowest and highest.
		if (parsedVerses.length > 0) {
			const lowestSelectedVerse =
				parsedVerses[0].chapter + ":" + parsedVerses[0].verse;
			const highestSelectedVerse =
				parsedVerses[parsedVerses.length - 1].chapter +
				":" +
				parsedVerses[parsedVerses.length - 1].verse;

			// 4. Update the state with the correct lowest and highest verses.
			// Use a new Set to avoid issues if the highest and lowest are the same.
			setApiSelectedVerses(
				new Set([lowestSelectedVerse, highestSelectedVerse])
			);
		} else {
			// Handle the case where the selection is empty.
			setApiSelectedVerses(new Set());
		}
	}, [selectedVerses]);

	const handleCloseModal = () => {
		// clear the selectedVerses
		setSelectedVerses(new Set());
		// clear the apiSelectedVerses
		setApiSelectedVerses(new Set());
	};

	return (
		<>
			<Drawer
				className="bg-white/50 dark:bg-black/50 backdrop-blur-lg border border-b-sky-200 dark:border-b-gray-600"
				open={isDrawerOpen}
				onClose={() => handleCloseModal()}
				position="top"
				backdrop={false}>
				<DrawerHeader title="" titleIcon={() => <></>} />
				<DrawerItems>
					<p className="text-lg mb-1 uppercase text-center text-black dark:text-white">
						Has seleccionado: {bibleBook.name}{" "}
						{Array.from(apiSelectedVerses)[0]}{" "}
						{Array.from(apiSelectedVerses)[1] &&
							" - " + Array.from(apiSelectedVerses)[1]}
					</p>
					<div className="flex flex-col md:flex-row flex-wrap items-center justify-center mb-4">
						<button
							onClick={() => {
								setOpenModal(true);
								setAction(BibleCrudActions.memorization);
							}}
							className="uppercase my-1 mx-1 inline-block px-4 py-2 text-sm font-medium text-center text-white dark:text-white rounded-2xl cursor-pointer bg-sky-700 hover:bg-sky-800 dark:bg-gray-900 dark:hover:bg-gray-800 border border-sky-100 dark:border-gray-600 focus:ring-4 focus:ring-sky -300  dark:focus:ring-gray-800 transition-all duration-300 ease-in">
							<LordIconHover
								size={22}
								ICON_SRC={LOTTIE_INTUITIVE_HOVER_PINCH}
								state="hover-pinch"
								text="Añadir memorización"
							/>
						</button>
						<button
							onClick={() => {
								setOpenModal(true);
								setAction(BibleCrudActions.note);
							}}
							className="uppercase my-1 mx-1 inline-block px-4 py-2 text-sm font-medium text-center text-white dark:text-white rounded-2xl cursor-pointer bg-sky-700 hover:bg-sky-800 dark:bg-gray-900 dark:hover:bg-gray-800 border border-sky-100 dark:border-gray-600 focus:ring-4 focus:ring-sky -300  dark:focus:ring-gray-800 transition-all duration-300 ease-in">
							<LordIconHover
								size={22}
								ICON_SRC={LOTTIE_NOTEBOOK_2_HOVER_PINCH}
								state="in-reveal"
								text="Añadir nota"
							/>
						</button>
					</div>
				</DrawerItems>
			</Drawer>
			<AddNoteOrMemorizationForm
				bibleId={bibleId}
				passageId={Array.from(apiSelectedVerses)}
				openModal={openModal}
				setOpenModal={setOpenModal}
				action={action}
				chapterContent={chapterContent}
				bibleBook={bibleBook}
				chapterInfo={chapterInfo}
				bibleName={bibleName}
				fetchUserSavedVerses={fetchUserSavedVerses}
			/>
		</>
	);
}
