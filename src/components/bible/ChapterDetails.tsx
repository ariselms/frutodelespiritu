"use client"; // This directive marks the component as a Client Component

import React, { useEffect, useRef } from "react";

export function ChapterDetails({ ChapterContent }: any) {
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// This effect runs after the component has mounted and htmlContent is rendered.
		// We use a timeout to ensure the browser has fully painted the content
		// and the scroll target is definitely available in the DOM.
		const timer = setTimeout(() => {
			// Get the hash from the URL (e.g., "#9")
			const hash = window.location.hash;

			if (hash && contentRef.current) {
				// Remove the '#' prefix to get the actual ID (e.g., "9")
				const targetId = hash.substring(1);

				const targetElement = contentRef.current.querySelectorAll(
					`[id="${targetId}"]`
				)[0];

				if (targetElement) {
					targetElement.scrollIntoView({ behavior: "smooth" });
				}
			}
		}, 100); // A small delay (e.g., 100ms) often helps ensure rendering is complete

		// Cleanup the timeout if the component unmounts or dependencies change
		return () => clearTimeout(timer);
	}, [ChapterContent]); // Re-run effect if htmlContent changes (e.g., navigating to a new chapter)

	// TODO: Completar la versión de buscar de la biblia

return (
	<>
		<div className="bible-chapter max-w-[80ch] mx-auto" ref={contentRef}>
			{ChapterContent.map((chapter: any) => {
				if (chapter.type === "heading") {
					return (
						<h2 key={chapter.content[0]} id={chapter.content[0]}>
							{chapter.content[0]}
						</h2>
					);
				}
				if (chapter.type === "verse") {
					return (
						<p key={chapter.number}>
							<span
								className="v"
								id={chapter.number}
								data-number={chapter.number}>
								{chapter.number}
							</span>{" "}
							{chapter.content.map((verse: any, index: number) => {
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
	</>
);
}
