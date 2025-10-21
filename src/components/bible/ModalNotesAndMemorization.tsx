import { BibleCrudActions } from "@/static";
import { useEffect, useState } from "react";
import AddNoteOrMemorizationForm from "@/components/forms/AddNoteOrMemorizationForm";
import { parseSid } from "@/helpers";
// TODO: DELETE THIS FILE IF IT IS NOT BEING USED
export default function ModalNotesAndMemorization({
	selectedVerses,
	setSelectedVerses,
	bibleId,
	chapterContent
}: {
	selectedVerses: Set<string>;
	setSelectedVerses: React.Dispatch<React.SetStateAction<Set<string>>>;
	bibleId: string;
	chapterContent: any;
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

	const handleCloseModal = () => {
		// clear the selectedVerses
		setSelectedVerses(new Set());
		// clear the apiSelectedVerses
		setApiSelectedVerses(new Set());
	};

	return (
		<div className="fixed left-0 right-0 top-0 z-20 flex justify-center">
			<div
				className={`h-70 md:h-46 lg:h-50 w-full max-w-4xl bg-orange-50 dark:bg-gray-900 text-center text-black dark:text-white z-80 rounded-2xl border border-orange-700 dark:border-gray-600 m-2 overflow-hidden p-1 relative`}>
				<button
					onClick={handleCloseModal}
					className="absolute right-4 top-3 cursor-pointer z-90 flex items-center text-sm">
					<svg
						className="w-6 h-6 text-gray-800 dark:text-white mr-1"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						viewBox="0 0 24 24">
						<path
							fillRule="evenodd"
							d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
							clipRule="evenodd"
						/>
					</svg>
					Cancelar
				</button>

				<div className="relative w-full h-full mb-4 flex flex-col justify-center">
					<div>
						<p className="text-lg mb-1 uppercase">
							Has seleccionado: {Array.from(apiSelectedVerses)[0]}{" "}
							{Array.from(apiSelectedVerses)[1] &&
								" - " + Array.from(apiSelectedVerses)[1]}
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
			<AddNoteOrMemorizationForm
				bibleId={bibleId}
				passageId={Array.from(apiSelectedVerses)}
				openModal={openModal}
				setOpenModal={setOpenModal}
				action={action}
				chapterContent={chapterContent}
			/>
		</div>
	);
}

// TODO: Pensar como crear un componente para añadir notas y memorizaciones de una manera que se pueda reusar en el lado del cliente y el centro de administración del usuario
