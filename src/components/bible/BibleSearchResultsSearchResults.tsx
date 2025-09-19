import Link from "next/link";
import { SearchResultType } from "@/models/bibleTypes";

export function BibleSearchResultList({
	results = [],
  bibleId
}: {
	results: SearchResultType[];
  bibleId: string
}) {

	return (
		<section className="bg-white dark:bg-gray-800 py-8 sm:py-16">
			<div className="mx-auto max-w-7xl">
				<>
					{results?.length > 0 && (
						<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">
							Resultados de la búsqueda:
						</h2>
					)}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{results?.map((result, index) => (
							<SearchResultItem key={index} result={result} bibleId={bibleId} />
						))}
					</div>
				</>
			</div>
		</section>
	);
}

export const SearchResultItem = ({ result, bibleId }: { result: any; bibleId: string }) => {
	const bibleVerseParts = result.id.split(".");
  const bookId = bibleVerseParts[0];
  const chapterId = bibleVerseParts[1];
  const verseId = bibleVerseParts[2];

	return (
		<div className="bg-orange-50 dark:bg-gray-700 border border-orange-100 dark:border-gray-600 rounded-2xl p-4 flex flex-col justify-between">
			<div>
				<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
					{result.reference}
				</h3>
				<p className="text-gray-600 dark:text-gray-300">{result.text}</p>
			</div>
			<Link
				href={`/biblia/libros/capitulos/versiculos/${bibleId}/${bookId}/${chapterId}#${verseId}`}
				className="inline-block text-center rounded-2xl text-orange-700 dark:text-gray-100 bg-orange-200 dark:bg-gray-800 px-4 py-2 border border-orange-100 dark:border-gray-600 mt-8">
				Leer contexto
			</Link>
		</div>
	);
};

// http://localhost:3000/biblia/libros/capitulos/versiculos/592420522e16049f-01/EXO.32
