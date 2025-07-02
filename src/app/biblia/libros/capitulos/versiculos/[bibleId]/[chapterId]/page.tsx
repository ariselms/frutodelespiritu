import BibleHeaderSection from "@/components/layout/BibleSection";

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

	return (
		<main>
			<section className="w-full dark:bg-gray-900 text-gray-800">
				<div className="max-w-7xl mx-auto py-16 px-2 xl:px-0">
					<BibleHeaderSection
						section={`Leyendo ${BibleChapter.data.reference}`}
					/>
					<nav className="flex items-center justify-between px-4">
						<button className=" rounded-xl border border-orange-200 dark:border-gray-700 bg-orange-100 px-5 py-1 font-bold">
							{BibleChapter.data.previous.bookId}{" "}
							{BibleChapter.data.previous.number}
						</button>

						<button className=" rounded-xl border border-orange-200 dark:border-gray-700 bg-orange-100 px-5 py-1 font-bold">
							{BibleChapter.data.next.number} {BibleChapter.data.next.bookId}
						</button>
					</nav>
					<div
						className="max-w-[80ch] mx-auto"
						dangerouslySetInnerHTML={{ __html: BibleChapter.data.content }}
					/>
				</div>
			</section>
		</main>
	);
}