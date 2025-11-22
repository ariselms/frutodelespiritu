"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import { toast } from "react-toastify";
import { serverBaseUrl } from "@/static";
import { useRouter, usePathname } from "next/navigation";
import AddNoteOrMemoryItem from "@/components/drawers/AddNoteOrMemoryItemSlide";
import { BibleBookType } from "@/models/bibleTypes";
import Link from "next/link";
import FINGERPRINT_SECURITY_LOTTIE from "@/lotties/fingerprint-security-hover-wrong.json";
import { LordIconHover } from "@/components/animations/lordicon";
import {
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader
} from "flowbite-react";


// Helper function to parse a "Book Chapter:Verse" string
const parseSid = (sid: string) => {
	const match = sid.match(/^(.+?)\s(\d+):(\d+)$/);
	if (!match) return null;

	return {
		book: match[1],
		chapter: parseInt(match[2], 10),
		verse: parseInt(match[3], 10)
	};
};

export function ChapterDetails({ ChapterContent, Book, ChapterInfo, BibleName } : { ChapterContent: any[]; Book: BibleBookType; ChapterInfo: any, BibleName: string}) {
	const { user } = useAuthContext();
	const router = useRouter();
	const pathname = usePathname();
	const contentRef = useRef<HTMLDivElement>(null);
	const [selectedVerses, setSelectedVerses] = useState<Set<string>>(new Set());
	const { bibleId, bookId, chapterId } = useParams();
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	// EFFECT 1: Effect for scrolling to a hash link if present in the URL
	useEffect(() => {
		const timer = setTimeout(() => {
			const hash = window.location.hash;

			if (hash && contentRef.current) {
				const targetId = hash.substring(1);

				const targetElement = contentRef.current.querySelector(
					`[id="${targetId}"]`
				);

				if (targetElement) {
					targetElement.scrollIntoView({ behavior: "smooth" });
				}
			}
		}, 100);

		return () => clearTimeout(timer);
	}, [ChapterContent]);

	// EFFECT 2: Set up the delegated event listener with corrected selection logic
	useEffect(() => {
		const content = contentRef.current;

		if (!content || !ChapterContent || ChapterContent.length === 0) return;

		const firstVerse = ChapterContent.find(
			(item: any) => item.type === "verse"
		);

		if (!firstVerse) return;

		const currentBook = bookId;

		const currentChapter = chapterId;

		const handleContainerClick = (event: MouseEvent) => {
			// Update the following to use a modal instead of redirecting the user right away
			if (!user) {
				setIsModalOpen(true);

				return;
			}

			const verseSpan = (event.target as Element).closest("span.v");

			if (!verseSpan) return;

			const verseNumber = (verseSpan as HTMLElement).dataset.number;

			if (!verseNumber) return;

			const verseSid = `${currentBook} ${currentChapter}:${verseNumber}`;

			setSelectedVerses((prevSelected) => {
				const newSelection = new Set(prevSelected);

				// --- SCENARIO 1: The verse is already selected (TRUNCATE LOGIC) ---
				if (newSelection.has(verseSid)) {
					const parsedSids = Array.from(newSelection)
						.map(parseSid)
						.filter((p): p is NonNullable<typeof p> => p !== null);

					parsedSids.sort((a, b) => a.verse - b.verse);

					const clickedVerseInfo = parseSid(verseSid);

					if (!clickedVerseInfo) return prevSelected;

					const truncateIndex = parsedSids.findIndex(
						(p) => p.verse === clickedVerseInfo.verse
					);

					// Keep verses from the beginning *up to (but not including)* the clicked verse.
					const finalSids = parsedSids.slice(0, truncateIndex); // Removed the "+ 1"

					const finalSelectionSet = new Set<string>();

					finalSids.forEach((p) => {
						finalSelectionSet.add(`${p.book} ${p.chapter}:${p.verse}`);
					});

					setIsDrawerOpen(true);

					return finalSelectionSet;
				}

				// --- SCENARIO 2: The verse is new (GAP-FILLING LOGIC) ---
				else {
					newSelection.add(verseSid);

					const parsedSids = Array.from(newSelection)
						.map(parseSid)
						.filter((p): p is NonNullable<typeof p> => p !== null);

					if (parsedSids.length > 1) {
						const first = parsedSids[0];
						const isSameChapter = parsedSids.every(
							(p) => p.book === first.book && p.chapter === first.chapter
						);

						if (isSameChapter) {
							const verseNumbers = parsedSids.map((p) => p.verse);
							const minVerse = Math.min(...verseNumbers);
							const maxVerse = Math.max(...verseNumbers);

							for (let i = minVerse; i <= maxVerse; i++) {
								const gapSid = `${first.book} ${first.chapter}:${i}`;
								newSelection.add(gapSid);
							}
						}
					}

					setIsDrawerOpen(true);

					return newSelection;
				}
			});
		};

		content.addEventListener("click", handleContainerClick);

		return () => {
			content.removeEventListener("click", handleContainerClick);
		};
	}, [ChapterContent, user]);

	// EFFECT 3: Apply visual styles upon selection changes
	useEffect(() => {
		const content = contentRef.current;

		if (!content) return;

		// Cleanup phase
		content.querySelectorAll("mark.verse-highlight").forEach((markElement) => {
			const parent = markElement.parentNode;

			if (parent) {
				while (markElement.firstChild) {
					parent.insertBefore(markElement.firstChild, markElement);
				}
				parent.removeChild(markElement);
			}
		});

		// Application phase
		if (selectedVerses.size > 0) {
			selectedVerses.forEach((sid) => {
				const parsed = parseSid(sid);

				if (!parsed) return;

				const verseNumberSpan = content.querySelector(
					`span[data-number="${parsed.verse}"]`
				);

				if (!verseNumberSpan) return;

				const parentP = verseNumberSpan.parentElement;

				if (!parentP) return;

				const nodesToWrap = [];

				let currentNode = verseNumberSpan.nextSibling;

				while (currentNode) {
					nodesToWrap.push(currentNode);
					currentNode = currentNode.nextSibling;
				}

				if (nodesToWrap.length > 0) {
					const wrapper = document.createElement("mark");

					wrapper.className =
						"verse-highlight bg-orange-100 dark:bg-gray-900 dark:text-gray-100 rounded px-1";

					parentP.insertBefore(wrapper, nodesToWrap[0]);

					nodesToWrap.forEach((node) => wrapper.appendChild(node));
				}
			});
		}
	}, [selectedVerses, ChapterContent]);

	// EFFECT 4: On Load, Create a function that fetches global notes and memorization items for the current chapter and pre-select verses accordingly, if any, to display a brain icon next to the last verse of the individual selection. For example, if the user has notes in the chapter for verses 2, 3, 4, 5, and 8, then verses 2-5 should be selected and verse 5 should have a brain icon next to it. Verse 8 should be selected and have a brain icon next to it as well.
	// STEP 1: Fetch user notes and memorization items for the current chapter
	// STEP 2: Parse the response to identify verses with notes or memorization items
	// STEP 3: Update the selectedVerses state to include these verses
	// STEP 4: Ensure that the last verse in each contiguous selection has a brain icon next to it
	// NOTE: Each verse looks like that. The chapter number is in the span data-number attribute.
	// <p><span class="v" id="7" data-number="7">7</span> <span>Cuando vio que muchos fariseos y saduceos acudían a su bautismo, les dijo: ¡Generación de víboras! ¿Quién les enseñó a huir de la ira que viene?</span></p>
	// Consider to also on load, check for the chapter and if there are any popular verses, kind of give it a highlight or a different color to indicate that those verses are popular among users, this will encourage users to read those verses and engage more with the content as well as use the save note or memory list feature.
	// Consider to work with the API and how to fetch the most popular verses by selecting the verses with the most notes or memorization items across all users for that specific chapter.

	return (
		<>
			<div className="bible-chapter max-w-[80ch] mx-auto my-4" ref={contentRef}>
				{ChapterContent.map((content: any) => {
					if (content.type === "heading") {
						return (
							<h2 key={content.content[0]} id={content.content[0]}>
								{content.content[0]}
							</h2>
						);
					}

					if (content.type === "verse") {
						return (
							<p key={content.number}>
								<span
									className="v"
									id={content.number}
									data-number={content.number}>
									{content.number}
								</span>{" "}
								{content.content.map((verse: any, index: number) => {
									// Specifically handle line break objects
									// If the verse object is a line break, render a <br /> tag.
									if (verse && verse.lineBreak) {
										return <br key={index} />;
									}

									// Handle objects that contain a 'text' property
									if (verse && verse?.text) {
										return (
											<span
												className={`${
													verse?.wordsOfJesus
														? "mx-1 text-red-600 dark:text-red-400"
														: ""
												}`}
												key={index}>
												{verse.text}
											</span>
										);
									}

									// Handle simple strings
									// Check if 'verse' is a string before trying to render it.
									if (typeof verse === "string") {
										return <span key={index}>{verse}</span>;
									}

									// Ignore any other types of objects (like those with noteId)
									return null;
								})}
							</p>
						);
					}

					return null;
				})}
			</div>

			{/* Prompt from the top to ask the user to use the selected versicles for notes or memorization */}
			{selectedVerses.size > 0 && (
				<>
					<AddNoteOrMemoryItem
						bibleBook={Book}
						selectedVerses={selectedVerses}
						setSelectedVerses={setSelectedVerses}
						bibleId={String(bibleId)}
						chapterContent={ChapterContent}
						isDrawerOpen={isDrawerOpen}
						chapterInfo={ChapterInfo}
						bibleName={BibleName}
					/>
				</>
			)}

			{/* Modal to inform the user to log in to use the feature */}
			<Modal
				className="backdrop-blur-md bg-sky-50/10 dark:bg-gray-950/50"
				dismissible
				show={isModalOpen}
				onClose={() => setIsModalOpen(false)}>
				<ModalHeader className="bg-sky-100 dark:bg-gray-800 text-sky-950 dark:text-gray-50 border-b border-sky-200 dark:border-gray-600 p-5">
					¿Cómo guardar versículos en listas de aprendizaje o tomar notas?
				</ModalHeader>
				<ModalBody>
					<div className="space-y-6">
						<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
							Cuando oprimes en un versículo, notarás que puedes hacer una
							selección de los versículos que desees. Una vez seleccionados,
							podrás añadirlos a tus listas de aprendizaje para memorizarlos o
							para tomar notas sobre ellos.
						</p>
						<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
							Si eso es lo que quieres, debes iniciar sesión, todo lo que
							necesitas es tu correo electrónico. Si no, puedes simplemente
							cerrar esta ventana.
						</p>
					</div>
				</ModalBody>
				<ModalFooter className="border-t-sky-200 dark:border-gray-600 flex items-center justify-end">
					<Link
						className="p-2 text-sm font-medium text-center text-sky-50 rounded-2xl cursor-pointer bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 transition-all duration-300 ease-in border border-sky-100 dark:border-gray-600 flex items-center gap-2"
						href={`/log?${new URLSearchParams({
							redirectUrl: serverBaseUrl + pathname
						}).toString()}`}>
						<LordIconHover
              size={32}
              ICON_SRC={FINGERPRINT_SECURITY_LOTTIE}
              state="hover-pinch"
              text="Iniciar sesión"
            />
					</Link>
				</ModalFooter>
			</Modal>
		</>
	);
}
