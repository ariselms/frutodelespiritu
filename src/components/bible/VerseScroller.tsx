"use client";

import React, { useEffect, useState, useRef } from "react";
import ModalNotesAndMemorization from "@/components/bible/ModalNotesAndMemorization";

interface VerseScrollerProps {
	htmlContent: string;
  bibleId: string
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

export function VerseScroller({ htmlContent, bibleId }: VerseScrollerProps) {
	const contentRef = useRef<HTMLDivElement>(null);
	const [selectedVerses, setSelectedVerses] = useState<Set<string>>(new Set());

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

	// EFFECT 2: Apply visual styles by wrapping verse content
	useEffect(() => {
		const content = contentRef.current;
		if (!content) return;

		// --- 1. Cleanup Phase ---
		// Find all previously created highlight wrappers
		content.querySelectorAll("mark.verse-highlight").forEach((markElement) => {
			const parent = markElement.parentNode;
			// Move all children of the mark tag out into the parent
			while (markElement.firstChild) {
				parent?.insertBefore(markElement.firstChild, markElement);
			}
			// Remove the now-empty mark tag
			parent?.removeChild(markElement);
		});

		// --- 2. Application Phase ---
		// If there are selected verses, apply new highlights
		if (selectedVerses.size > 0) {
			selectedVerses.forEach((sid) => {
				const startNode = content.querySelector(`span[data-sid="${sid}"]`);
				if (!startNode) return;

				// Find the parent paragraph to establish boundaries
				const parentP = startNode.closest("p");
				if (!parentP) return;

				// Find all verse spans within this paragraph to find the end boundary
				const allVerseSpansInP = Array.from(parentP.querySelectorAll("span.v"));
				const startIndex = allVerseSpansInP.indexOf(startNode as Element);

				// The end node is the *next* verse span, or null if this is the last one
				const endNode =
					startIndex !== -1 && startIndex < allVerseSpansInP.length - 1
						? allVerseSpansInP[startIndex + 1]
						: null;

				// Collect all the nodes (text, elements) between the start and end span
				const nodesToWrap = [];
				let currentNode = startNode.nextSibling;
				while (currentNode && currentNode !== endNode) {
					nodesToWrap.push(currentNode);
					currentNode = currentNode.nextSibling;
				}

				// If we found nodes to wrap, create a wrapper and move them inside
				if (nodesToWrap.length > 0) {
					const wrapper = document.createElement("mark");
					// Add classes for styling and for easy cleanup later
					wrapper.className =
						"verse-highlight bg-orange-100 dark:bg-gray-900 rounded px-1";

					// Insert the new wrapper right after the starting verse number span
					parentP.insertBefore(wrapper, nodesToWrap[0]);

					// Move each node into the new wrapper
					nodesToWrap.forEach((node) => wrapper.appendChild(node));
				}
			});
		}
	}, [selectedVerses, htmlContent]);

	// Derive modal visibility from state. This is the key!
	const isModalVisible: boolean = selectedVerses.size > 0;

	return (
		<>
			<div
				className="bible-chapter max-w-[80ch] mx-auto"
				ref={contentRef}
				dangerouslySetInnerHTML={{ __html: htmlContent }}
			/>
			{isModalVisible && (
				<ModalNotesAndMemorization
					selectedVerses={selectedVerses}
          bibleId={bibleId}
				/>
			)}
		</>
	);
}
