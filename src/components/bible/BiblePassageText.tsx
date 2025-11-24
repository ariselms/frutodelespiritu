import BibleContentBuilder from "@/components/bible/BibleContentBuilder";
import { Verse } from "@/models/memorizationAndNotesTypes";

// TODO: add a prop to indicate if it's being used in memory mode or a regular passage view
export default function BiblePassageText({
	chapterContent,
	mode
} : {
	chapterContent: any;
	mode?: "memory" | "regular";
}) {

	const getPassageContent = () => {

		if (!chapterContent.passage_text) return <p>No text available.</p>;

		try {
			const correctedJsonString = `[${chapterContent.passage_text.slice(
				1,
				-1
			)}]`;

			const verseStrings: string[] = JSON.parse(correctedJsonString);

			const chapterVersicles: Verse[] = verseStrings.map((str) =>
				JSON.parse(str)
			);

			return (
				<>
					<span className="block mb-4 text-black dark:text-gray-300">
						{chapterContent.bible_name.toUpperCase()}
					</span>

					<span className="block mb-4 font-bold text-2xl text-black dark:text-gray-200">
						{chapterContent.bible_book} {chapterContent.chapter_id}:
						{chapterContent.verse_from}{" "}
						{chapterContent.verse_to !== chapterContent.verse_from &&
							`-${chapterContent.verse_to}`}
					</span>

					<div className="max-w-[75%] xl:max-w-[80ch] overflow-auto">
						{chapterVersicles.map((chapterData, index) => (
							<BibleContentBuilder chapterData={chapterData} key={index} />
						))}
					</div>
				</>
			);
		} catch (error) {

			console.error(
				"Failed to parse passage_text: ",
				chapterContent.passage_text,
				error
			);

			return <p className="text-red-500">Error: Could not display verse.</p>;

		}
	};

	return <>{getPassageContent()}</>;
}
