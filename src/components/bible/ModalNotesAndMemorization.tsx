import { useEffect, useState } from "react";

export default function ModalNotesAndMemorization({
	selectedVerses
}: {
	selectedVerses: Set<string>;
}) {
	const [isExtended, setIsExtended] = useState<string>("h-50");
	const [apiSelectedVerses, setApiSelectedVerses] = useState<Set<string>>(
		new Set()
	);

	// get the selectedVerses and sort it from low to high, then set get the lowest and the highest and set it to the apiSelectedVerses
	useEffect(() => {
		// sort the selectedVerses
		const sortedSelectedVerses = Array.from(selectedVerses).sort();
		// select the lowest and the highest
		const lowestSelectedVerse = sortedSelectedVerses[0];
		const highestSelectedVerse =
			sortedSelectedVerses[sortedSelectedVerses.length - 1];
		// assign values to
		setApiSelectedVerses(new Set([lowestSelectedVerse, highestSelectedVerse]));
	}, [selectedVerses]);

	return (
		<div
			className={`${isExtended} fixed left-0 right-0 top-0 bg-orange-100 dark:bg-gray-900 text-center text-black dark:text-white z-80 rounded-2xl border-2 border-orange-700 dark:border-gray-600 m-2 overflow-hidden p-2`}>
			<div className="relative w-full h-full mb-4">
				<div className="absolute right-0 top-0 bottom-0 cursor-pointer flex flex-col items-center justify-end">
					{isExtended === "h-50" ? (
						<svg
							onClick={() => {
								setIsExtended("h-[calc(100vh-16px)]");
							}}
							className="w-12 h-12 text-orange-700 dark:text-white"
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
								setIsExtended("h-50");
							}}
							className="w-12 h-12 text-orange-700 dark:text-white"
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
				<div className="h-full">
					<p className="text-md text-red font-bold px-2 text-red-500 flex items-center justify-center mb-4">
						<svg
							className="w-5 h-5 text-red-500 dark:text-red-400 me-2"
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
						<span className="text-red-500 dark:text-red-400">
							Para cerrar el panel, aclara los versos que elejiste.
						</span>
					</p>
					<p className="text-lg mb-3 uppercase">
						Has seleccionado:{" "}
						{Array.from(apiSelectedVerses).map((verse) => (
							<span key={verse}>{verse} </span>
						))}
					</p>
					<div className="flex flex-col md:flex-row flex-wrap items-center justify-center mb-4">
						<button className="uppercase my-1 mx-1 inline-block p-2 text-sm font-medium text-center text-white dark:text-gray-950 rounded-2xl cursor-pointer bg-orange-700 dark:bg-gray-50 hover:bg-orange-600 dark:hover:bg-gray-300 focus:ring-4 focus:ring-orange-300  dark:focus:ring-gray-800 transition-all duration-300 ease-in">
							Añadir a lista de memorización
						</button>
						<button className="uppercase my-2 mx-1 inline-block p-2 text-sm font-medium text-center text-white dark:text-gray-950 rounded-2xl cursor-pointer bg-orange-700 dark:bg-gray-50 hover:bg-orange-600 dark:hover:bg-gray-300 focus:ring-4 focus:ring-orange-300  dark:focus:ring-gray-800 transition-all duration-300 ease-in">
							Añadir con nota
						</button>
					</div>
					<div>UI for Memorization Collections and Bible Notes</div>
				</div>
			</div>
		</div>
	);
}

// TODO: Pensar como crear un componente para añadir notas y memorizaciones de una manera que se pueda reusar en el lado del cliente y el centro de administración del usuario
