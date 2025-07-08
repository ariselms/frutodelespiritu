"use client"; // This directive marks the component as a Client Component

import React, { useEffect, useRef } from "react";

interface VerseScrollerProps {
	htmlContent: string;
}

export function VerseScroller({ htmlContent }: VerseScrollerProps) {
	// Create a ref to the div that will contain the dangerouslySetInnerHTML content
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

        const targetElement = contentRef.current.querySelectorAll(`[id="${targetId}"]`)[0];

        console.log(targetElement)

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
			}
		}, 100); // A small delay (e.g., 100ms) often helps ensure rendering is complete

		// Cleanup the timeout if the component unmounts or dependencies change
		return () => clearTimeout(timer);
	}, [htmlContent]); // Re-run effect if htmlContent changes (e.g., navigating to a new chapter)

	return (
		<div
			className="bible-chapter max-w-[80ch] mx-auto"
			ref={contentRef} // Attach the ref to the div
			dangerouslySetInnerHTML={{ __html: htmlContent }}
		/>
	);
}
