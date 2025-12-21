"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
	BibleDataType,
	BibleBookType,
	ChapterResponse,
	PassageSelection,
	BibleSelectionStep
} from "@/models/bibleTypes";
import { LordIconHover } from "@/components/animations/lordicon";
import { MainLoader } from "@/components/Loaders";
import { useAuthContext } from "@/context/authContext";
import ModalToPromptUserToLogin from "@/components/modals/ModalPromptUserToLogin";
import LOTTIE_BIBLE_HOVER_PINCH from "@/lotties/bible-open.json";
import LOTTIE_WORLD_GLOBE_HOVER_ROLL from "@/lotties/world-globe-hover-roll.json";
import LOTTIE_CHEVRON_LEFT_HOVER_SLIDE from "@/lotties/chevron-left-hover-scale.json";
import LOTTIE_CLOSE_HOVER_WOBBLE from "@/lotties/error-cross-simple-hover-wobble.json";
import LOTTIE_EDIT_HOVER_CIRCLE from "@/lotties/edit-hover-circle.json";
import { usePathname } from "next/navigation";


// --- Main Component ---

export default function BibleEverywhere({
  setPassageSelection
} : {
  setPassageSelection: React.Dispatch<React.SetStateAction<PassageSelection>>
}) {
  // --- STATES ---
  const {user} = useAuthContext();
  const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const [step, setStep] = useState<BibleSelectionStep>("initial");
	const [loading, setLoading] = useState(false);
	const [selection, setSelection] = useState<PassageSelection>({});

	// STATES //
	const [translations, setTranslations] = useState<BibleDataType[]>([]);
	const [books, setBooks] = useState<BibleBookType[]>([]);
	const [availableVerses, setAvailableVerses] = useState<number[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
  const [isModalToPromptUserToLoginOpen, setIsModalToPromptUserToLoginOpen] = useState<boolean>(false);


	// --- API FETCHING FUNCTIONS --- //
	const fetchTranslations = async () => {
		setLoading(true);
		try {
			const res = await fetch(
				"https://bible.helloao.org/api/available_translations.json"
			);
			const data = await res.json();

			// Filter for Spanish translations only
			const spanish = data.translations.filter((sb: any) =>
				sb.language.toLowerCase().includes("spa")
			);

			setTranslations(spanish || []);
		} catch (error) {
			console.error("Failed to fetch translations", error);
		} finally {
			setLoading(false);
		}
	};

	const fetchBooks = async (translationId: string) => {
		setLoading(true);
		try {
			const res = await fetch(
				`https://bible.helloao.org/api/${translationId}/books.json`
			);
			const data = await res.json();
			setBooks(data.books || []);
		} catch (error) {
			console.error("Failed to fetch books", error);
		} finally {
			setLoading(false);
		}
	};

	const fetchChapterAndParseVerses = async (
		translationId: string,
		bookId: string,
		chapter: number
	) => {
		setLoading(true);
		try {
			const res = await fetch(
				`https://bible.helloao.org/api/${translationId}/${bookId}/${chapter}.json`
			);
			const data: ChapterResponse = await res.json();

			// Extract unique verse numbers and text content
			const foundVerses = new Set<number>();

			if (data.chapter && Array.isArray(data.chapter.content)) {
				data.chapter.content.forEach((item: any) => {
					if (item.type === "verse" && item.number) {
						const verseNum = parseInt(item.number.toString(), 10);
						foundVerses.add(verseNum);
					}
				});
			}

			// --- THE FIX IS HERE ---
			// Instead of spreading 'selection', use 'prev' to get the latest state
			setSelection((prev) => ({
				...prev,
				content: data.chapter.content
			}));
			// -----------------------

			// Sort verses numerically
			setAvailableVerses(Array.from(foundVerses).sort((a, b) => a - b));
		} catch (error) {
			console.error("Failed to fetch chapter", error);
		} finally {
			setLoading(false);
		}
	};

	// --- EVENT HANDLERS --- //

	const handleOpen = () => {

    if (!user) {

      setIsModalToPromptUserToLoginOpen(true);

      return;
    }

		setIsOpen(true);
		setStep("translation");
		setSelection({});
		fetchTranslations();
	};

	// Helper to jump to a specific edit step
	const handleEditStep = (targetStep: BibleSelectionStep) => {
		setIsOpen(true);
		setStep(targetStep);

		// If jumping to 'book' or 'verse' steps, ensure we have the data
		// (Data usually persists in state, but this logic ensures specific fetch if needed could go here)
		if (targetStep === "translation") {
			fetchTranslations();
		}
		// 'book' uses 'books' state which persists
		// 'chapter' uses 'selection.book' which persists
		// 'verse' uses 'availableVerses' which persists
	};

	const handleClose = () => {
		setIsOpen(false);
		setStep("initial");
		setSearchQuery("");
	};

	const handleSelectTranslation = (t: BibleDataType) => {
		setSelection({ translation: t });
		setSearchQuery("");
		setStep("book");
		fetchBooks(t.id);
	};

	const handleSelectBook = (b: BibleBookType) => {
		setSelection((prev) => ({
			...prev,
			translation: prev.translation,
			book: b
		}));
		setSearchQuery("");
		setStep("chapter");
	};

	const handleSelectChapter = (c: number) => {
		setSelection((prev) => ({
			...prev,
			chapter: c,
			verses: []
		}));
		setStep("verse");
		if (selection.translation && selection.book) {
			fetchChapterAndParseVerses(
				selection.translation.id,
				selection.book.id,
				c
			);
		}
	};

	const handleSelectVerse = (v: number) => {
		setSelection((prev) => {
			const currentVerses = prev.verses || [];

			// Logic for range selection
			if (currentVerses.length === 0) {
				// Select first verse
				return { ...prev, verses: [v] };
			} else if (currentVerses.length === 1) {
				const start = currentVerses[0];

				// Toggle off if clicking the same verse again
				if (start === v) {
					return { ...prev, verses: [] };
				}

				// Select second verse (creates range)
				const end = v;
				return { ...prev, verses: start < end ? [start, end] : [end, start] };
			} else {
				// Reset and select new start verse if a range already exists
				return { ...prev, verses: [v] };
			}
		});
	};

	const handleConfirmSelection = () => {
		// 1. Calculate the text string ONCE when the user clicks confirm
		const passageText = generateVerseText(selection);

		// 2. Update the state
		setSelection((prev) => ({
			...prev,
			// Assuming you want to store the string in 'content' or a new field like 'passageText'
			// based on your previous code snippet:
			passageText: passageText,
		}));

    setPassageSelection({
      ...selection,
      passageText: passageText
    });

		setStep("complete");
		setIsOpen(false);
	};

	const handleBack = () => {
		setSearchQuery("");
		if (step === "book") setStep("translation");
		if (step === "chapter") setStep("book");
		if (step === "verse") setStep("chapter");
	};

	// --- FILTERING LOGIC --- //
	const filteredTranslations = useMemo(() => {
		if (!searchQuery) return translations;
		const lower = searchQuery.toLowerCase();
		return translations.filter(
			(t) =>
				t.name.toLowerCase().includes(lower) ||
				t.englishName.toLowerCase().includes(lower) ||
				t.id.toLowerCase().includes(lower)
		);
	}, [translations, searchQuery]);

	const filteredBooks = useMemo(() => {
		if (!searchQuery) return books;
		const lower = searchQuery.toLowerCase();
		return books.filter(
			(b) =>
				b.name.toLowerCase().includes(lower) ||
				b.commonName.toLowerCase().includes(lower) ||
				b.id.toLowerCase().includes(lower)
		);
	}, [books, searchQuery]);


	// --- RENDER HELPERS --- //
	// Helper to extract text safely without causing side effects
	const generateVerseText = (currentSelection: PassageSelection) => {
		if (
			!currentSelection.content ||
			!currentSelection.verses ||
			currentSelection.verses.length === 0
		) {
			return "";
		}

		const start = currentSelection.verses[0];
		const end = currentSelection.verses[currentSelection.verses.length - 1];

		// Check if content is array before filtering
		if (!Array.isArray(currentSelection.content)) {
			return typeof currentSelection.content === "string"
				? currentSelection.content
				: "";
		}

		return currentSelection.content
			.filter((item: any) => {
				if (item.type !== "verse") return false;
				const vNum = parseInt(item.number);
				return vNum >= start && vNum <= end;
			})
			.map((item: any) => {
				let text = "";
				if (typeof item.content === "string") {
					text = item.content;
				} else if (Array.isArray(item.content)) {
					text = item.content
						.map((part: any) => {
							if (typeof part === "string") return part;
							if (typeof part === "object" && part.text) return part.text;
							return "";
						})
						.join("");
				}
				return `${item.number} ${text}`;
			})
			.join("\n");
	};

	const renderHeader = (title: string, icon: React.ReactNode) => (
		<div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-gray-600 rounded-t-lg">
			<div className="flex items-center gap-2">
				{step !== "translation" && (
					<button
						onClick={handleBack}
						className="p-1 hover:bg-gray-200 rounded-full transition">
						<LordIconHover
							size={32}
							ICON_SRC={LOTTIE_CHEVRON_LEFT_HOVER_SLIDE}
							state="hover-slide"
							text=""
						/>
					</button>
				)}
				<div className="flex items-center gap-2 text-lg font-semibold">
					{icon}
					<span className="text-gray-900 dark:text-gray-50">{title}</span>
				</div>
			</div>
			<button
				onClick={handleClose}
				className="p-1 hover:bg-gray-200 rounded-full transition cursor-pointer">
				<LordIconHover
					size={32}
					ICON_SRC={LOTTIE_CLOSE_HOVER_WOBBLE}
					state="hover-wobble"
					text=""
				/>
			</button>
		</div>
	);

	const renderSearch = (placeholder: string) => (
		<div className="px-2 py-4  border-b border-slate-200 dark:border-gray-600">
			<div className="relative flex items-center w-full">
				<input
					type="text"
					placeholder={placeholder}
					className="block bg-slate-50 dark:bg-gray-700 w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg  focus:ring-slate-500 focus:border-slate-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500 relative"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					autoFocus
				/>
			</div>
		</div>
	);

	// --- VIEWS --- //
	const renderTranslations = () => (
		<div className="flex flex-col h-full">
			{renderHeader(
				"Selecciona una traducción",
				<LordIconHover
					size={32}
					ICON_SRC={LOTTIE_WORLD_GLOBE_HOVER_ROLL}
					state="hover-roll"
					text=""
				/>
			)}
			{renderSearch("Selecciona una traducción (e.g. RV60, Spanish)...")}
			<div className="flex-1 overflow-y-auto p-2">
				{loading ? (
					<div className="flex justify-center p-8">
						<MainLoader />
					</div>
				) : (
					<div className="grid gap-2 py-2">
						{filteredTranslations.map((t) => (
							<button
								key={t.id}
								onClick={() => handleSelectTranslation(t)}
								className="text-sm bg-slate-700 hover:bg-slate-800 dark:bg-gray-900 dark:hover:bg-gray-800 text-white font-bold p-4 rounded-lg transition-all border dark:border-gray-600 wrap-break-word cursor-pointer flex flex-col items-start justify-center">
								<div className="font-medium text-slate-50 dark:text-gray-200 group-hover:text-slate-700 dark:group-hover:text-gray-200 mb-2">
									{t.name}
								</div>
								<div className="text-xs text-gray-400 flex items-center gap-2">
									<span className="uppercase bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono text-[10px]">
										{t.id}
									</span>
									<span>{t.language === "spa" && "español"}</span>
								</div>
							</button>
						))}
						{filteredTranslations.length === 0 && (
							<div className="text-center p-4 text-gray-500">
								No translations found.
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);

	const renderBooks = () => (
		<div className="flex flex-col h-full ">
			{renderHeader(
				selection.translation?.name || "Selecciona un libro",
				<LordIconHover
					size={32}
					ICON_SRC={LOTTIE_BIBLE_HOVER_PINCH}
					state="hover-pinch"
					text=""
				/>
			)}
			{renderSearch("Buscar libros (e.g. Génesis)...")}
			<div className="flex-1 overflow-y-auto p-2">
				{loading ? (
					<div className="flex justify-center p-8">
						<MainLoader />
					</div>
				) : (
					<div className="grid grid-cols-2 gap-2">
						{filteredBooks.map((b) => (
							<button
								key={b.id}
								onClick={() => handleSelectBook(b)}
								className="text-sm bg-slate-700 hover:bg-slate-800 dark:bg-gray-900 dark:hover:bg-gray-800 text-white font-bold py-2.5 px-0.5 rounded-lg transition-all border dark:border-gray-600 wrap-break-word text-center cursor-pointer">
								<span className="font-medium text-slate-50 dark:text-gray-200 group-hover:text-slate-700 dark:group-hover:text-gray-200">
									{b.name}
								</span>
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);

	const renderChapters = () => (
		<div className="flex flex-col h-full">
			{renderHeader(
				`${selection.book?.name}`,
				<LordIconHover
					size={32}
					ICON_SRC={LOTTIE_BIBLE_HOVER_PINCH}
					state="hover-pinch"
					text=""
				/>
			)}
			<div className="flex-1 overflow-y-auto p-4">
				<h3 className="text-sm font-medium text-black dark:text-gray-200 mb-3 uppercase tracking-wider">
					Selecciona Capíulo
				</h3>
				<div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
					{Array.from(
						{ length: selection.book?.numberOfChapters || 0 },
						(_, i) => i + 1
					).map((num) => (
						<button
							key={num}
							onClick={() => handleSelectChapter(num)}
							className="text-sm bg-slate-700 hover:bg-slate-800 dark:bg-gray-900 dark:hover:bg-gray-800 text-white font-bold p-4 rounded-lg transition-all border dark:border-gray-600 wrap-break-word cursor-pointer flex flex-col items-center justify-center">
							{num}
						</button>
					))}
				</div>
			</div>
		</div>
	);

	const renderVerses = () => {
		// Helper to render mixed content safely
		const getVerseContent = (verseNumber: number) => {
			// 1. Find the actual verse object within the content array
			// We cannot use [index] because verse 1 might be at index 2 (after headers)
			const verseObj = selection.content?.find(
				(item: any) =>
					item.type === "verse" && parseInt(item.number) === verseNumber
			);

			if (!verseObj || !verseObj.content) return "Loading...";

			// 2. If content is just a string, return it
			if (typeof verseObj.content === "string") {
				return verseObj.content;
			}

			// 3. If content is an array, map through it handling both Strings and Objects
			if (Array.isArray(verseObj.content)) {
				return verseObj.content.map((part: any, index: number) => {
					// Case A: It's a plain string
					if (typeof part === "string") {
						return <span key={index}>{part} </span>;
					}
					// Case B: It's an object (e.g., Words of Jesus)
					if (typeof part === "object" && part.text) {
						return (
							<span
								key={index}
								className={
									part.wordsOfJesus ? "text-red-700 dark:text-red-400" : ""
								}>
								{part.text}{" "}
							</span>
						);
					}
					return null;
				});
			}

			return null;
		};

		const isSelected = (v: number) => {
			if (!selection.verses) return false;

			if (selection.verses.length === 1) return selection.verses[0] === v;
			// Range check
			return v >= selection.verses[0] && v <= selection.verses[1];
		};

		return (
			<div className="flex flex-col h-full">
				{renderHeader(
					`${selection.book?.name} ${selection.chapter}`,
					<LordIconHover
						size={32}
						ICON_SRC={LOTTIE_BIBLE_HOVER_PINCH}
						state="hover-pinch"
						text=""
					/>
				)}
				<div className="flex-1 overflow-y-auto p-0">
					{loading ? (
						<div className="flex justify-center p-8">
							<MainLoader />
						</div>
					) : (
						<>
							<div className="p-4 border-b border-slate-200 dark:border-gray-600 flex flex-col items-center flex-wrap sticky top-0 z-10 backdrop-blur-2xl bg-gray-50/60 dark:bg-gray-800/70 rounded-t-lg">
								<h3 className="text-sm font-medium text-black dark:text-gray-200 uppercase tracking-wider mb-1">
									Selección de versículo(s)
								</h3>
								<div className="text-xs text-gray-700 font-medium bg-slate-50 px-2 py-1 rounded mt-1 sm:mt-0">
									{selection.verses?.length
										? selection.verses.length === 1
											? `Versículo ${selection.verses[0]}`
											: `Versículos ${selection.verses[0]} al ${selection.verses[1]}`
										: "Oprime versículo inicial y final"}
								</div>
							</div>
							<div className="flex flex-col">
								{availableVerses.map((num) => {
									const active = isSelected(num);
									return (
										<button
											key={num}
											onClick={() => handleSelectVerse(num)}
											className={`text-left px-4 py-3 border-b border-slate-200 dark:border-gray-600 transition flex gap-3 cursor-pointer
                      ${active ? "bg-slate-50 dark:bg-gray-700" : ""}
                    `}>
											<div
												className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full font-medium text-sm transition
                        ${
													active
														? "bg-slate-700 dark:bg-gray-900 text-slate-50 dark:text-gray-200"
														: "bg-slate-700 dark:bg-gray-900 text-slate-50 dark:text-gray-200"
												}
                      `}>
												{num}
											</div>

											{/* THIS IS THE FIXED PART */}
											<div className="text-sm leading-relaxed text-black dark:text-gray-200">
												{getVerseContent(num)}
											</div>
										</button>
									);
								})}
								{availableVerses.length === 0 && !loading && (
									<div className="text-center text-gray-400 py-8">
										No verses found for this chapter.
									</div>
								)}
							</div>
						</>
					)}
				</div>
				<div className="p-4 border-t border-slate-200 dark:border-gray-600 backdrop-blur-2xl bg-gray-50/60 dark:bg-gray-800/70 rounded-b-lg sticky bottom-0 z-20 text-center">
					<button
						disabled={!selection.verses || selection.verses.length === 0}
						onClick={handleConfirmSelection}
						className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto p-4 text-center dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 cursor-pointer dark:border-gray-600 border border-slate-100 transition-all ">
						Confirmar Selección
					</button>
				</div>
			</div>
		);
	};

	// --- DISPLAY RESULTS --- //
	const formatSelection = () => {
		const verseFrom = selection?.verses && selection?.verses[0];
		const verseTo =
			selection?.verses && selection?.verses[selection?.verses.length - 1];
		const versiclesValue =
			verseFrom !== verseTo ? verseFrom + " - " + verseTo : verseFrom;

		// --- RENDER SELECTION START ---

		let selectedText = generateVerseText(selection);

		// --- RENDER SELECTION END ---

		// Helper component for edit rows
		const EditRow = ({
			label,
			value,
			stepName
		}: {
			label: string;
			value: string | undefined;
			stepName: BibleSelectionStep;
		}) => (
			<div className="flex items-center justify-between border-b border-slate-200 pb-2 last:border-0 last:pb-0">
				<div className="flex flex-col justify-between px-4">
					<span className="text-xs text-gray-800 dark:text-gray-200 font-semibold uppercase">
						{label}
					</span>
					<span className="font-medium text-gray-800 dark:text-gray-200">
						{value}
					</span>
				</div>
				<button
					onClick={() => handleEditStep(stepName)}
					className="p-2 text-slate-700 hover:text-slate-800 dark:text-gray-300 dark:hover:text-gray-200 rounded-full transition cursor-pointer"
					title={`Edit ${label}`}>
					<LordIconHover
						size={32}
						ICON_SRC={LOTTIE_EDIT_HOVER_CIRCLE}
						state="hover-circle"
						text=""
					/>
				</button>
			</div>
		);

		return (
			<div className="p-6 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-600 rounded-lg max-w-md mx-auto w-full">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-lg font-bold text-gray-950 dark:text-gray-200 ">
						Tu selección:
					</h2>
					<button
						onClick={handleOpen}
						className="text-sm text-slate-700 hover:underline dark:text-white dark:underline dark:underline-offset-4 cursor-pointer">
						Reiniciar
					</button>
				</div>

				<div className="flex flex-col gap-3 text-sm font-mono text-gray-600 bg-slate-100 dark:bg-gray-800 py-4">
					<EditRow
						label="Traducción"
						value={selection.translation?.id}
						stepName="translation"
					/>
					<EditRow label="Libro" value={selection.book?.name} stepName="book" />
					<EditRow
						label="Capítulo"
						value={selection.chapter?.toString()}
						stepName="chapter"
					/>
					<EditRow
						label="Versículo(s)"
						value={String(versiclesValue)}
						stepName="verse"
					/>
				</div>

				{selectedText && (
					<div className="mt-4 p-4 bg-slate-50 dark:bg-gray-800 rounded-lg text-sm italic border-l-8 border border-slate-200 dark:border-l-8 dark:border dark:border-gray-600 max-h-60 overflow-y-auto">
						<pre className="whitespace-pre-wrap font-sans font-normal leading-relaxed text-slate-950 dark:text-gray-50">
							{selectedText}
						</pre>
					</div>
				)}

				<div className="pt-10 pb-4 text-center">
					<Link
						href={`/biblia/libros/capitulos/versiculos/${selection.translation?.id}/${selection.book?.id}/${selection.chapter}#${verseFrom}`}
						className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto p-4 text-center dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 cursor-pointer dark:border-gray-600 border border-slate-100 transition-all ">
						Ir al capítulo
					</Link>
				</div>
			</div>
		);
	};

	return (
		<div className="font-sans text-gray-900 flex flex-col items-start justify-start w-full">
			{/* Trigger Button (Only shown if initial or complete) */}
			{!isOpen && (
				<>
					{step === "complete" ? (
						formatSelection()
					) : (
						<button
							onClick={handleOpen}
							className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full p-4 text-center dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 cursor-pointer dark:border-gray-600 border border-slate-100 transition-all">
							<LordIconHover
								size={32}
								ICON_SRC={LOTTIE_BIBLE_HOVER_PINCH}
								state="hover-pinch"
								text={`Selecciona el pasaje bíblico`}
							/>
						</button>
					)}
				</>
			)}

			{/* Modal Overlay */}
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200 backdrop-blur-md bg-slate-50/10 dark:bg-gray-950/50">
					{/* Modal Content */}
					<div className="w-full max-w-lg h-[600px] flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden border border-slate-200 dark:border-gray-600 rounded-lg backdrop-blur-md bg-slate-50/10 dark:bg-gray-950/50">
						{step === "translation" && renderTranslations()}
						{step === "book" && renderBooks()}
						{step === "chapter" && renderChapters()}
						{step === "verse" && renderVerses()}
					</div>
				</div>
			)}

			{isModalToPromptUserToLoginOpen && (
				<ModalToPromptUserToLogin
					isModalToPromptUserToLoginOpen={isModalToPromptUserToLoginOpen}
					setIsModalToPromptUserToLoginOpen={setIsModalToPromptUserToLoginOpen}
					pathname={pathname}
				/>
			)}
		</div>
	);
}
