import { BibleCrudActions } from "@/static";
import { useEffect, useState } from "react";
import AddNoteOrMemorization from "@/components/forms/AddNoteOrMemorization";

export default function ModalNotesAndMemorization({
	selectedVerses,
	bibleId,
  chapterContent
}: {
	selectedVerses: Set<string>;
	bibleId: string;
  chapterContent: any
}) {
	const [isExtended, setIsExtended] = useState<string>("h-70 md:h-46 lg:h-50");
	const [apiSelectedVerses, setApiSelectedVerses] = useState<Set<string>>(
		new Set()
	);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [action, setAction] = useState<string | null>(null);

	// A helper function to parse your verse strings.
	// Make sure this is defined in your component or imported.
	const parseSid = (sid: string) => {
		if (!sid) return null; // Handle undefined or null input
		const match = sid.match(/^(.+?)\s(\d+):(\d+)$/);
		if (!match) return null;

		return {
			book: match[1],
			chapter: parseInt(match[2], 10),
			verse: parseInt(match[3], 10),
			original: sid // Keep the original string for later
		};
	};

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
			const lowestSelectedVerse = parsedVerses[0].original;
			const highestSelectedVerse =
				parsedVerses[parsedVerses.length - 1].original;

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

	return (
		<>
			<div
				className={`${isExtended} fixed left-0 right-0 top-0 bg-orange-50 dark:bg-gray-900 text-center text-black dark:text-white z-80 rounded-2xl border border-orange-700 dark:border-gray-600 m-2 overflow-hidden p-1`}>
				<div className="relative w-full h-full mb-4">
					<div className="absolute right-0 top-0 bottom-0 cursor-pointer flex flex-col items-center justify-end">
						{isExtended === "h-70 md:h-46 lg:h-50" ? (
							<svg
								onClick={() => {
									setIsExtended("h-[calc(100vh-16px)]");
								}}
								className="w-10 h-10 text-orange-700 dark:text-white"
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
									d="m8 10 4 4 4-4"
								/>
							</svg>
						) : (
							<svg
								onClick={() => {
									setIsExtended("h-70 md:h-46 lg:h-50");
								}}
								className="w-10 h-10 text-orange-700 dark:text-white"
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
									d="m16 14-4-4-4 4"
								/>
							</svg>
						)}
					</div>
					<p className="text-sm font-bold px-2 pt-2 text-orange-700 dark:text-gray-200 flex items-start justify-start mb-0 text-left">
						<svg
							className="w-5 h-5 me-2"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24">
							<path
								fillRule="evenodd"
								d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
								clipRule="evenodd"
							/>
						</svg>
						<span>
							Expande este panel para ver tus notas bíblicas y listas de
							memorización.
						</span>
					</p>
					<p className="text-sm font-bold px-2 text-orange-700 dark:text-gray-200 flex items-start justify-start mb-3 text-left">
						<svg
							className="w-5 h-5 me-2"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24">
							<path
								fillRule="evenodd"
								d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="">
							Para cerrar el panel, aclara los versos que elejiste oprimiendo el
							versículo nuevamente.
						</span>
					</p>
					<div>
						<p className="text-lg mb-1 uppercase">
							Has seleccionado: {Array.from(apiSelectedVerses)[0]} -{" "}
							{Array.from(apiSelectedVerses)[1]}
						</p>
						<div className="flex flex-col md:flex-row flex-wrap items-center justify-center mb-4">
							<button
								onClick={() => {
									setOpenModal(true);
									setAction(BibleCrudActions.memorization);
								}}
								className="uppercase my-1 mx-1 inline-block p-2 text-sm font-medium text-center text-white dark:text-gray-950 rounded-2xl cursor-pointer bg-orange-700 dark:bg-gray-50 hover:bg-orange-600 dark:hover:bg-gray-300 focus:ring-4 focus:ring-orange-300  dark:focus:ring-gray-800 transition-all duration-300 ease-in">
								Añadir a lista de memorización
							</button>
							<button
								onClick={() => {
									setOpenModal(true);
									setAction(BibleCrudActions.note);
								}}
								className="uppercase my-2 mx-1 inline-block p-2 text-sm font-medium text-center text-white dark:text-gray-950 rounded-2xl cursor-pointer bg-orange-700 dark:bg-gray-50 hover:bg-orange-600 dark:hover:bg-gray-300 focus:ring-4 focus:ring-orange-300  dark:focus:ring-gray-800 transition-all duration-300 ease-in">
								Añadir con nota
							</button>
						</div>
					</div>
				</div>
			</div>
			<AddNoteOrMemorization
				bibleId={bibleId}
				passageId={Array.from(apiSelectedVerses)}
				openModal={openModal}
				setOpenModal={setOpenModal}
				action={action}
        chapterContent={chapterContent}
			/>
		</>
	);
}

// TODO: Pensar como crear un componente para añadir notas y memorizaciones de una manera que se pueda reusar en el lado del cliente y el centro de administración del usuario
