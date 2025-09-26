"use client"; // This directive marks the component as a Client Component

import React, { useEffect, useRef, useState } from "react";
import ModalNotesAndMemorization from "@/components/bible/ModalNotesAndMemorization";
import { useParams } from "next/navigation";

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
