import "./bible-chapter.css";
import Link from "next/link";
import { BibleNavigationAndNotes } from "@/components/bible/BibleNavigationAndNotes";
import { ChapterDetails } from "@/components/bible/ChapterDetails";
import { BibleBookType } from "@/models/bibleTypes";
import InLectureBibleSelection from "@/components/bible/InLectureBibleSelection";
import { LordIconHover } from "@/components/animations/lordicon";
import LOTTIE_GRID_PINCH from "@/lotties/grid-pinch.json";
import ClickVerseHint from "@/components/bible/ClickVerseHint";

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
				<div className="max-w-[80ch] mx-auto p-2 xl:px-0">
					<ClickVerseHint />
					<div className="flex flex-row items-center justify-between">
						<Link
							className="rounded-lg border border-blue-100 dark:border-gray-600 bg-blue-700 hover:bg-blue-800 dark:bg-gray-900 dark:hover:bg-gray-800 px-4 h-10 font-bold text-blue-50 dark:text-gray-50 inline-flex items-center transition-all text-xs sm:text-sm md:text-base"
							href={`/biblia/libros/capitulos/${bibleId}/${bookId}`}>
							<LordIconHover
								size={22}
								ICON_SRC={LOTTIE_GRID_PINCH}
								state="hover-pinch"
								text={`Capítulos de ${Book?.name}`}
							/>
						</Link>
						<InLectureBibleSelection ChapterDetails={bibleChapterResponse} />
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