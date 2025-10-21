import "./bible-chapter.css";
import Link from "next/link";
import { BibleNavigationAndNotes } from "@/components/bible/BibleNavigationAndNotes";
import { ChapterDetails } from "@/components/bible/ChapterDetails";
import { BibleBookType } from "@/models/bibleTypes";
import InLectureBibleSelection from "@/components/bible/InLectureBibleSelection";

export default async function SingleChapterPage({
	params
}: {
	params: Promise<{ bibleId: string; bookId: string; chapterId: string }>;
}) {
	const { bibleId, bookId, chapterId } = await params;

	const bibleChapterRequest = await fetch(
		`https://bible.helloao.org/api/${bibleId}/${bookId}/${chapterId}.json`
	);

	const bibleChapterResponse = await bibleChapterRequest.json();

	const Book: BibleBookType = bibleChapterResponse.book;

	const Chapter = bibleChapterResponse.chapter;

  const Translation = bibleChapterResponse.translation;

	return (
		<main>
			<section className="w-full dark:bg-gray-800 text-gray-800 pb-4">
				<div className="max-w-[80ch] mx-auto py-8 px-2 xl:px-0">
					<div className="flex flex-row items-center justify-between mb-8">
						<Link
							className="rounded-2xl border border-sky-100 dark:border-gray-600 bg-sky-700 hover:bg-sky-800 dark:bg-gray-900 dark:hover:bg-gray-800 px-4 h-10 font-bold text-sky-50 dark:text-gray-50 inline-flex items-center transition-all text-xs sm:text-sm md:text-base"
							href={`/biblia/libros/capitulos/${bibleId}/${bookId}`}>
							<svg
								className="w-6 h-6 text-sky-50 bolder dark:text-white mr-2"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								viewBox="0 0 24 24">
								<path
									fillRule="evenodd"
									d="M4.857 3A1.857 1.857 0 0 0 3 4.857v4.286C3 10.169 3.831 11 4.857 11h4.286A1.857 1.857 0 0 0 11 9.143V4.857A1.857 1.857 0 0 0 9.143 3H4.857Zm10 0A1.857 1.857 0 0 0 13 4.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 9.143V4.857A1.857 1.857 0 0 0 19.143 3h-4.286Zm-10 10A1.857 1.857 0 0 0 3 14.857v4.286C3 20.169 3.831 21 4.857 21h4.286A1.857 1.857 0 0 0 11 19.143v-4.286A1.857 1.857 0 0 0 9.143 13H4.857Zm10 0A1.857 1.857 0 0 0 13 14.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 19.143v-4.286A1.857 1.857 0 0 0 19.143 13h-4.286Z"
									clipRule="evenodd"
								/>
							</svg>
							Capítulos de {Book?.name}
						</Link>
						<InLectureBibleSelection chapterDetails={bibleChapterResponse} />
					</div>
					<BibleNavigationAndNotes BibleChapterData={bibleChapterResponse} />
					<ChapterDetails
            BibleName={Translation.name}
            ChapterInfo={Chapter}
            ChapterContent={Chapter.content}
            Book={Book}
          />
					<BibleNavigationAndNotes BibleChapterData={bibleChapterResponse} />
				</div>
			</section>
		</main>
	);
}

export async function generateMetadata({
	params
}: {
	params: Promise<{ bibleId: string; bookId: string; chapterId: string }>;
}) {
	const { bibleId, bookId, chapterId } = await params;

	const bibleChapterRequest = await fetch(
		`https://bible.helloao.org/api/${bibleId}/${bookId}/${chapterId}.json`
	);

	const bibleChapterResponse = await bibleChapterRequest.json();

	const Book: BibleBookType = bibleChapterResponse.book;

	const Chapter: any = bibleChapterResponse.chapter;

	return {
		title: `${Book.name} ${Chapter.number} | Lee la biblia en Fruto del Espíritu`,
		description: `${Book.name} ${Chapter.number} | Capítulo completo. Descúbre mucho más en el nuevo y rediseñado Fruto del Espíritu.`,
		keywords: [
			`Capítulo completo de ${Book.name} ${Chapter.number}`,
			`Versículos del libro de ${Book.name} ${Chapter.number}`,
			`${Book.name} ${Chapter.number}`
		],
		robots: {
			index: true,
			follow: true
		},
		openGraph: {
			title: `${Book.name} ${Chapter.number} | Lee la biblia en Fruto del Espíritu`,
			description: `${Book.name} ${Chapter.number} | Capítulo completo. Descúbre mucho más en el nuevo y rediseñado Fruto del Espíritu.`,
			url: `https://frutodelespiritu.com/biblia/libros/capitulos/versiculos/${bibleId}/${bookId}/${chapterId}`,
			siteName: "Fruto del Espíritu",
			type: "website",
			locale: "es_US",
			images: [
				{
					url: "https://frutodelespiritu.com/images/logo.png",
					alt: "Fruto del Espíritu"
				}
			]
		}
	};
}