import BibleHeaderSection from "@/components/layout/BibleSection";
import Link from "next/link";
import "./bible-chapter.css";
import { BibleNavigationAndNotes } from "@/components/bible/BibleNavigationAndNotes";

export default async function SingleChapterPage({
	params
}: {
	params: Promise<{ bibleId: string; chapterId: string }>;
}) {

  const { bibleId, chapterId } = await params; // Removed `await` from `params`

	const BibleAPIKey = process.env.BIBLE_API_KEY;

	if (!BibleAPIKey) {
		throw new Error(
			"Bible API Key not found. Please set it in your .env.local file."
		);
	}

	const chapterUrl = `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}`;

	let BibleChapter: any; // Consider defining a proper interface for BibleChapter

	try {
		// Correct way to use `new Promise` with `async/await` inside the executor
		const chaptersRequestResult = await new Promise(async (resolve, reject) => {
			try {
				const response = await fetch(chapterUrl, {
					method: "GET",
					headers: {
						"api-key": BibleAPIKey, // No need for template literal if it's already a string
						Accept: "application/json"
					}
				});

				if (!response.ok) {
					// Attempt to parse a more detailed error message from the response body
					const errorBody = await response.json().catch(() => null);
					const errorMessage =
						errorBody?.message ||
						response.statusText ||
						`HTTP error! Status: ${response.status}`;
					reject(new Error(errorMessage));
					return; // Exit after rejecting
				}

				const data = await response.json();

				resolve(data); // Resolve the promise with the parsed JSON data
			} catch (innerError) {
				// Catch errors from `fetch` itself (e.g., network errors)
				reject(innerError);
			}
		});

		// `chaptersRequestResult` already holds the resolved JSON data
		BibleChapter = chaptersRequestResult;


    console.log(BibleChapter.data);
	} catch (error) {
		// This catch block will now catch errors thrown by the `reject` call inside the Promise,
		// or any unexpected errors during the Promise's execution.
		console.error("Error fetching Bible chapter:", error);
		// Re-throw the error if you want the calling function/component to also handle it
		throw error;
	}

  // TODO: Add notes functionality as a top bar as well as commentary from the API in a new sort of modal

	return (
		<main>
			<section className="w-full dark:bg-gray-900 text-gray-800">
				<div className="max-w-7xl mx-auto py-8 px-2 xl:px-0">
					<Link
						className="rounded-xl border border-orange-400 dark:border-gray-600 bg-orange-100 dark:bg-gray-800 px-5 py-1 font-bold text-orange-700 dark:text-gray-50 inline-flex items-center mb-8"
						href={`/biblia/libros/capitulos/${BibleChapter.data.bibleId}/${BibleChapter.data.bookId}`}>
						<svg
							className="w-6 h-6 text-orange-700 bolder dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24">
							<path
								fillRule="evenodd"
								d="M13.729 5.575c1.304-1.074 3.27-.146 3.27 1.544v9.762c0 1.69-1.966 2.618-3.27 1.544l-5.927-4.881a2 2 0 0 1 0-3.088l5.927-4.88Z"
								clipRule="evenodd"
							/>
						</svg>
						Capítulos de {BibleChapter.data.bookId}
					</Link>
					<BibleHeaderSection section={`${BibleChapter.data.reference}`} />
					<BibleNavigationAndNotes BibleChapterData={BibleChapter.data} />
					<div
						className="bible-chapter max-w-[80ch] mx-auto"
						dangerouslySetInnerHTML={{ __html: BibleChapter.data.content }}
					/>
					<BibleNavigationAndNotes BibleChapterData={BibleChapter.data} />
				</div>
			</section>
		</main>
	);
}
