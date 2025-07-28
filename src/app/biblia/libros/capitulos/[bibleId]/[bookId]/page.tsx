import BibleHeaderSection from "@/components/layout/BibleSection";
import Link from "next/link";
export default async function BibleChaptersPage({
	params
}: {
	params: Promise<{ bibleId: string; bookId: string }>;
}) {
  const { bibleId, bookId } = await params;

  const BibleAPIKey = process.env.BIBLE_API_KEY;

  const bookUrl = `https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${bookId}`;
  const chaptersUrl = `https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${bookId}/chapters`;

  let Bible;
  let BookChapters;

  try {

    const bookRequest = await fetch(bookUrl, {
      method: "GET",
      headers: {
        "api-key": `${BibleAPIKey}`,
        Accept: "application/json"
      }
    });

    const chaptersRequest = await fetch(chaptersUrl, {
      method: "GET",
      headers: {
        "api-key": `${BibleAPIKey}`,
        Accept: "application/json"
      }
    });

    if (!bookRequest.ok || !chaptersRequest.ok) {
      const errorData = await chaptersRequest.json();
      console.error(
        `HTTP error! Status: ${chaptersRequest.status} for Bible ID: ${bibleId}`,
        errorData
      );
    }

    const book = await bookRequest.json();
    const chapterResponse = await chaptersRequest.json();

    Bible = book.data;
    BookChapters = chapterResponse.data;

  } catch (error) {
    console.error(
      `Error fetching data for Bible ID: ${bibleId}`,
      error
    );
  }

	return (
		<main>
			<section className="w-full dark:bg-gray-800 text-gray-800">
				<div className="max-w-7xl mx-auto py-8 px-2 xl:px-0">
					<BibleHeaderSection section={`Capítulos de ${Bible.nameLong}`} />
					<div
						className="flex items-center justify-center flex-wrap gap-1.5 bg-orange-50 dark:bg-gray-700 border-1 border-orange-300
					dark:border-gray-600 p-4 rounded-2xl transition-all">
						{BookChapters.map((book: any) => (
							<Link
								key={book.id}
								className="bg-orange-700 hover:bg-orange-800 dark:bg-gray-800 dark:hover:bg-gray-900 text-white font-bold px-8 py-4 rounded-2xl"
								href={`/biblia/libros/capitulos/versiculos/${book.bibleId}/${book.id}`}>
								{book.number}
							</Link>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}