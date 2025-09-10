"use client"; // This directive marks the component as a Client Component

import React, { useEffect, useRef, useState } from "react";
import ModalNotesAndMemorization from "@/components/bible/ModalNotesAndMemorization";
import { useParams } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { serverBaseUrl } from "@/static";

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

export function ChapterDetails({ ChapterContent }: any) {
	const { user } = useAuthContext();
	const router = useRouter();
	const pathname = usePathname();
	const contentRef = useRef<HTMLDivElement>(null);
	const [selectedVerses, setSelectedVerses] = useState<Set<string>>(new Set());
	const { bibleId, bookId, chapterId } = useParams();

	// Effect for scrolling to a hash link (no changes needed here)
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

	// // EFFECT 1: Set up the delegated event listener with corrected selection logic
	// useEffect(() => {
	// 	const content = contentRef.current;
	// 	if (!content || !ChapterContent || ChapterContent.length === 0) return;

	// 	const firstVerse = ChapterContent.find(
	// 		(item: any) => item.type === "verse"
	// 	);

	// 	if (!firstVerse) return;

	// 	const currentBook = bookId;
	// 	const currentChapter = chapterId;

	// 	const handleContainerClick = (event: MouseEvent) => {
	// 		if (!user) {
	// 			const redirectUrl = serverBaseUrl + pathname;
	// 			toast.warning(
	// 				"Debes iniciar sesión para guardar notas y listas de memorización."
	// 			);
	// 			router.push(`/log?redirectUrl=${redirectUrl}`);
	// 		}
	// 		const verseSpan = (event.target as Element).closest("span.v");
	// 		if (!verseSpan) return;

	// 		const verseNumber = (verseSpan as HTMLElement).dataset.number;
	// 		if (!verseNumber) return;

	// 		const verseSid = `${currentBook} ${currentChapter}:${verseNumber}`;

	// 		setSelectedVerses((prevSelected) => {
	// 			const newSelection = new Set(prevSelected);

	// 			// --- SCENARIO 1: The verse is already selected (TRUNCATE LOGIC) ---
	// 			if (newSelection.has(verseSid)) {
	// 				const parsedSids = Array.from(newSelection)
	// 					.map(parseSid)
	// 					.filter((p): p is NonNullable<typeof p> => p !== null);

	// 				parsedSids.sort((a, b) => a.verse - b.verse);

	// 				const clickedVerseInfo = parseSid(verseSid);
	// 				if (!clickedVerseInfo) return prevSelected;

	// 				const truncateIndex = parsedSids.findIndex(
	// 					(p) => p.verse === clickedVerseInfo.verse
	// 				);

	// 				// *** THE ONLY CHANGE IS HERE ***
	// 				// Keep verses from the beginning *up to (but not including)* the clicked verse.
	// 				const finalSids = parsedSids.slice(0, truncateIndex); // Removed the "+ 1"

	// 				const finalSelectionSet = new Set<string>();
	// 				finalSids.forEach((p) => {
	// 					finalSelectionSet.add(`${p.book} ${p.chapter}:${p.verse}`);
	// 				});

	// 				return finalSelectionSet;
	// 			}

	// 			// --- SCENARIO 2: The verse is new (GAP-FILLING LOGIC) ---
	// 			else {
	// 				newSelection.add(verseSid);

	// 				const parsedSids = Array.from(newSelection)
	// 					.map(parseSid)
	// 					.filter((p): p is NonNullable<typeof p> => p !== null);

	// 				if (parsedSids.length > 1) {
	// 					const first = parsedSids[0];
	// 					const isSameChapter = parsedSids.every(
	// 						(p) => p.book === first.book && p.chapter === first.chapter
	// 					);

	// 					if (isSameChapter) {
	// 						const verseNumbers = parsedSids.map((p) => p.verse);
	// 						const minVerse = Math.min(...verseNumbers);
	// 						const maxVerse = Math.max(...verseNumbers);

	// 						for (let i = minVerse; i <= maxVerse; i++) {
	// 							const gapSid = `${first.book} ${first.chapter}:${i}`;
	// 							newSelection.add(gapSid);
	// 						}
	// 					}
	// 				}
	// 				return newSelection;
	// 			}
	// 		});
	// 	};

	// 	content.addEventListener("click", handleContainerClick);
	// 	return () => {
	// 		content.removeEventListener("click", handleContainerClick);
	// 	};
	// }, [ChapterContent, user]);

	// // EFFECT 2: Apply visual styles (this is correct)
	// useEffect(() => {
	// 	const content = contentRef.current;
	// 	if (!content) return;
	// 	// Cleanup phase
	// 	content.querySelectorAll("mark.verse-highlight").forEach((markElement) => {
	// 		const parent = markElement.parentNode;
	// 		if (parent) {
	// 			while (markElement.firstChild) {
	// 				parent.insertBefore(markElement.firstChild, markElement);
	// 			}
	// 			parent.removeChild(markElement);
	// 		}
	// 	});

	// 	// Application phase
	// 	if (selectedVerses.size > 0) {
	// 		selectedVerses.forEach((sid) => {
	// 			const parsed = parseSid(sid);
	// 			if (!parsed) return;

	// 			const verseNumberSpan = content.querySelector(
	// 				`span[data-number="${parsed.verse}"]`
	// 			);
	// 			if (!verseNumberSpan) return;

	// 			const parentP = verseNumberSpan.parentElement;
	// 			if (!parentP) return;

	// 			const nodesToWrap = [];
	// 			let currentNode = verseNumberSpan.nextSibling;
	// 			while (currentNode) {
	// 				nodesToWrap.push(currentNode);
	// 				currentNode = currentNode.nextSibling;
	// 			}

	// 			if (nodesToWrap.length > 0) {
	// 				const wrapper = document.createElement("mark");
	// 				wrapper.className =
	// 					"verse-highlight bg-orange-100 dark:bg-gray-900 dark:text-gray-100 rounded px-1";

	// 				parentP.insertBefore(wrapper, nodesToWrap[0]);
	// 				nodesToWrap.forEach((node) => wrapper.appendChild(node));
	// 			}
	// 		});
	// 	}
	// }, [selectedVerses, ChapterContent]);

	return (
		<>
			<div className="bible-chapter max-w-[80ch] mx-auto" ref={contentRef}>
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
									// ✅ FIX 1: Specifically handle line break objects
									// If the verse object is a line break, render a <br /> tag.
									if (verse && verse.lineBreak) {
										return <br key={index} />;
									}

									// Handle objects that contain a 'text' property
									if (verse && verse.text) {
										return (
											<span
												className={`${
													verse.wordsOfJesus
														? "mx-1 text-red-600 dark:text-red-400"
														: ""
												}`}
												key={index}>
												{verse.text}
											</span>
										);
									}

									// ✅ FIX 2: Handle simple strings
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
			{selectedVerses.size > 0 && (
				<ModalNotesAndMemorization
					selectedVerses={selectedVerses}
					bibleId={String(bibleId)}
					chapterContent={ChapterContent}
				/>
			)}
		</>
	);
}
