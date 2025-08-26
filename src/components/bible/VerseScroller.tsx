"use client";

import React, { useEffect, useState, useRef } from "react";
import ModalNotesAndMemorization from "@/components/bible/ModalNotesAndMemorization";

interface VerseScrollerProps {
	htmlContent: string;
}

// Helper function to parse a verse SID (e.g., "GEN 2:5")
const parseSid = (sid: string) => {
	const match = sid.match(/^(\w+)\s(\d+):(\d+)$/);
	if (!match) return null; // Return null if the format is incorrect

	return {
		book: match[1],
		chapter: parseInt(match[2], 10),
		verse: parseInt(match[3], 10)
	};
};

export function VerseScroller({ htmlContent }: VerseScrollerProps) {
	const contentRef = useRef<HTMLDivElement>(null);
	const [selectedVerses, setSelectedVerses] = useState<Set<string>>(new Set());
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	// Effect for scrolling to a hash link
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
	}, [htmlContent]);

	// EFFECT 1: Set up the delegated event listener to highlight verses
	useEffect(() => {
		const content = contentRef.current;
		if (!content) return;

		const handleContainerClick = (event: MouseEvent) => {

			const verseSpan = (event.target as Element).closest("span.v");

			if (verseSpan) {

				const verseSid = (verseSpan as HTMLElement).dataset.sid;

				if (verseSid) {

					setSelectedVerses((prevSelected) => {

						const newSelection = new Set(prevSelected);

						// Check if the verse is already selected (this is the REMOVAL path)
						if (newSelection.has(verseSid)) {

							newSelection.delete(verseSid); // First, remove the clicked verse

							// If we have 1 or 0 verses left, there's nothing else to do
							if (newSelection.size <= 1) {
								return newSelection;
							}

							// Parse and sort the remaining verses to find any gaps
							const remainingSids = Array.from(newSelection)
								.map(parseSid)
								.filter((p): p is NonNullable<typeof p> => p !== null);

							// Important: Sort by verse number to check for contiguity
							remainingSids.sort((a, b) => a.verse - b.verse);

							// Find the index of the first verse that breaks the sequence
							let firstGapIndex = -1;

              for (let i = 1; i < remainingSids.length; i++) {
								if (remainingSids[i].verse !== remainingSids[i - 1].verse + 1) {
									firstGapIndex = i; // This is the start of the second "island"
									break;
								}
							}

							// If a gap was found, keep only the first block of verses
							if (firstGapIndex !== -1) {

                const firstBlock = remainingSids.slice(0, firstGapIndex);

                const finalSelection = new Set<string>();

                firstBlock.forEach((p) => {
									const sid = `${p.book} ${p.chapter}:${p.verse}`;
									finalSelection.add(sid);
								});

                return finalSelection;

              }

							// If no gaps were found, the remaining selection is fine
							return newSelection;
						} else {
							// --- This is the ADDING logic, which remains the same ---
							newSelection.add(verseSid);

							setIsDrawerOpen(true);

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
							return newSelection;
						}
					});
				}
			}
		};

		content.addEventListener("click", handleContainerClick);

		return () => {
			content.removeEventListener("click", handleContainerClick);
		};
	}, [htmlContent]);

	// EFFECT 2: Apply visual styles when the selection changes
	useEffect(() => {
		const content = contentRef.current;
		if (!content) return;

		content.querySelectorAll("p").forEach((p) => {
			p.classList.remove("selected-verse", "bg-orange-100", "dark:bg-gray-900");
		});

		if (selectedVerses.size > 0) {
			selectedVerses.forEach((sid) => {
				const verseElement = content.querySelector(`span[data-sid="${sid}"]`);
				if (verseElement && verseElement.parentElement) {
					verseElement.parentElement.classList.add(
						"selected-verse",
						"bg-orange-100",
						"dark:bg-gray-900"
					);
				}
			});
		}
	}, [selectedVerses, htmlContent]);

	// Derive modal visibility from state. This is the key!
	const isModalVisible = selectedVerses.size > 0;

	return (
		<>
			<div
				className="bible-chapter max-w-[80ch] mx-auto"
				ref={contentRef}
				dangerouslySetInnerHTML={{ __html: htmlContent }}
			/>
			{/* Your Modal can go here, using selectedVerses.size > 0 to control visibility */}
			{isModalVisible && (
        <ModalNotesAndMemorization
          selectedVerses={selectedVerses}
          setIsDrawerOpen={setIsDrawerOpen}
        />
			)}
		</>
	);
}
