import BibleHeaderSection from "@/components/layout/BibleSection";
import Link from "next/link";
import "./bible-chapter.css";

export default async function SingleChapterPage({
	params
}: {
	params: Promise<{ bibleId: string; chapterId: string }>;
}) {

  const { bibleId, chapterId } = await params;

  const BibleAPIKey = process.env.BIBLE_API_KEY;

  const chapterUrl = `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}`;

  let BibleChapter;

  try {

    const chaptersRequest = await fetch(chapterUrl, {
      method: "GET",
      headers: {
        "api-key": `${BibleAPIKey}`,
        Accept: "application/json"
      }
    });

    if (!chaptersRequest.ok) {
      throw new Error(`HTTP error! Status: ${chaptersRequest.status}`);
    }

    BibleChapter = await chaptersRequest.json();

  } catch (error) {
    console.error(error);
  }

  // TODO: Add notes functionality as a top bar as well as commentary from the API in a new sort of modal

	return (
		<main>
			<section className="w-full dark:bg-gray-900 text-gray-800">
				<div className="max-w-7xl mx-auto py-16 px-2 xl:px-0">
					<BibleHeaderSection
						section={`Leyendo ${BibleChapter.data.reference}`}
					/>
					<nav className="flex items-center justify-between">
						{BibleChapter.data.previous && (
							<Link
								href={`/biblia/libros/capitulos/versiculos/${BibleChapter.data.bibleId}/${BibleChapter.data.previous.id}`}
								className="rounded-xl border border-orange-400 dark:border-gray-600 bg-orange-100 dark:bg-gray-800 px-5 py-1 font-bold text-orange-700 dark:text-gray-50 flex items-center">
								<svg
									className="w-6 h-6 text-orange-700 dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="none"
									viewBox="0 0 24 24">
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m15 19-7-7 7-7"
									/>
								</svg>
								{BibleChapter.data.previous.bookId}{" "}
								{BibleChapter.data.previous.number}
							</Link>
						)}

						{BibleChapter.data.next && (
							<Link
								href={`/biblia/libros/capitulos/versiculos/${BibleChapter.data.bibleId}/${BibleChapter.data.next.id}`}
								className="rounded-xl border border-orange-400 dark:border-gray-600 bg-orange-100 dark:bg-gray-800 px-5 py-1 font-bold text-orange-700 dark:text-gray-50 flex items-center">
								{BibleChapter.data.next.bookId} {BibleChapter.data.next.number}
								<svg
									className="w-6 h-6 text-orange-700 dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="none"
									viewBox="0 0 24 24">
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m9 5 7 7-7 7"
									/>
								</svg>
							</Link>
						)}
					</nav>
					<div
						className="bible-chapter max-w-[80ch] mx-auto"
						dangerouslySetInnerHTML={{ __html: BibleChapter.data.content }}
					/>
				</div>
			</section>
		</main>
	);
}