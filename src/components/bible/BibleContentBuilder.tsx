import React from "react";

export default function buildBibleChapterContent({
	chapterData
}: {
	chapterData: any;
}) {

	return (
		<>
			{/* SECTION A: Handle Section Headings */}
			{/* If the type is 'heading', we simply render an h2 tag */}
			{chapterData.type === "heading" && (
				<h2 key={chapterData.content[0]} id={chapterData.content[0]}>
					{chapterData.content[0]}
				</h2>
			)}

			{/* SECTION B: Handle Verses */}
			{/* If the type is 'verse', we need to parse the mixed content array */}
			{chapterData.type === "verse" && (
				<p key={chapterData.number}>
					{/* Render the Verse Number first */}
					<span
						className="v"
						id={chapterData.number}
						data-number={chapterData.number}>
						{chapterData.number}
					</span>{" "}
					{/* Map through the content array which contains strings and objects */}
					{chapterData.content.map((verse: any, index: number) => {
						// ---------------------------------------------------------
						// STEP 1: Handle Plain Text
						// Most of the bible text comes as simple strings.
						// ---------------------------------------------------------
						if (typeof verse === "string") {
							return <React.Fragment key={index}>{verse}</React.Fragment>;
						}

						// ---------------------------------------------------------
						// STEP 2: Handle Formatting (Line Breaks)
						// If the object has a 'lineBreak' property, render <br />
						// ---------------------------------------------------------
						if (verse && verse.lineBreak) {
							return <br key={index} />;
						}

						// ---------------------------------------------------------
						// STEP 3: Handle Rich Text (Words of Jesus)
						// If the object has a 'text' property, it might be red-letter text.
						// ---------------------------------------------------------
						if (verse && verse?.text) {
							return (
								<span
									className={`${
										verse?.wordsOfJesus
											? "mx-1 text-red-600 dark:text-red-400" // Red letter styling
											: ""
									}`}
									key={index}>
									{verse.text}
								</span>
							);
						}

						// ---------------------------------------------------------
						// STEP 4: Handle Footnotes / References
						// If the object has a 'noteId', it represents a reference marker.
						// ---------------------------------------------------------
						if (verse && verse.hasOwnProperty("noteId")) {
							// Currently rendering an empty span acting as a marker/anchor
							return (
								<span
									key={index}
									className="text-[10px] text-sky-600 dark:text-sky-400 cursor-pointer hover:underline bg-sky-50 dark:bg-gray-800 px-0.5 rounded"
								/>
							);
						}

						// Fallback for unknown types
						return null;
					})}
				</p>
			)}
		</>
	);
}
