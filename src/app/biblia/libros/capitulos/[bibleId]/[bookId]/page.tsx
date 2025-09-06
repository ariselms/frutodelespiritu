import BibleHeaderSection from "@/components/layout/BibleSection";
import Link from "next/link";
import { SpanishBibleApiIds } from "@/static";
import { redirect } from "next/navigation";
import { checkIfParamsExistOrSetDefault } from "@/helpers";
import { BibleCheckTypes } from "@/static";

export default async function BibleChaptersPage({
	params
}: {
	params: Promise<{ bibleId: string; bookId: string }>;
}) {
	let { bibleId, bookId } = await params;

  const idExists = checkIfParamsExistOrSetDefault(BibleCheckTypes.BibleTranslation, bibleId);

  if (!idExists) {
    bibleId = SpanishBibleApiIds.ReinaValera1909
    redirect(`/biblia/libros/capitulos/${bibleId}/${bookId}`)
  }

	const bibleInfoRequest = await fetch(
		`https://bible.helloao.org/api/${bibleId}/books.json`
	);

	const bibleInfoResponse = await bibleInfoRequest.json();

	const CurrentBook = await bibleInfoResponse.books.filter(
		(book: any) => book.id === bookId
	)[0];

  let BookChapters;

  if(!CurrentBook || CurrentBook === undefined) {
    redirect(`/biblia/libros/${bibleId}`);
  }

	BookChapters = Array.from(
		{ length: CurrentBook.numberOfChapters },
		// Wrap the object in parentheses for an implicit return
		(_, index) => {
      return {
        id: `${CurrentBook.id}.${index + 1}`, // Enhanced: e.g., "GEN.1"
        bookId: CurrentBook.id,
        number: index + 1
      }
    }
	);


	return (
		<main>
			<section className="w-full dark:bg-gray-800 text-gray-800">
				<div className="max-w-7xl mx-auto py-8 px-2 xl:px-0">
					<BibleHeaderSection section={`Capítulos de ${CurrentBook.name}`} />
					<div
						className="flex items-center justify-center flex-wrap gap-1.5 bg-orange-50 dark:bg-gray-700 border-1 border-orange-300
					dark:border-gray-600 p-4 rounded-2xl transition-all">
						{BookChapters?.map((book: any) => (
							<Link
								key={book.id}
								className="bg-orange-700 hover:bg-orange-800 dark:bg-gray-800 dark:hover:bg-gray-900 text-white font-bold px-8 py-4 rounded-2xl"
								href={`/biblia/libros/capitulos/versiculos/${bibleId}/${book.bookId}/${book.number}`}>
								{book.number}
							</Link>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
