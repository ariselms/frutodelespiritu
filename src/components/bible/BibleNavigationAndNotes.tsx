import Link from "next/link"
import { ChapterType } from "@/models/bibleTypes";

export function BibleNavigationAndNotes({ BibleChapterData }: { BibleChapterData: ChapterType }) {

  return (
		<nav className="flex items-center justify-between mb-4 xl:-mb-10">
			{BibleChapterData.previous && (
				<Link
					href={`/biblia/libros/capitulos/versiculos/${BibleChapterData.bibleId}/${BibleChapterData.previous.id}`}
					className="rounded-xl border border-orange-300 dark:border-gray-600 bg-orange-50 hover:bg-orange-100 dark:bg-gray-900 dark:hover:bg-gray-800 px-5 py-1 font-bold text-orange-700 dark:text-gray-50 flex items-center transition-all">
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
					{BibleChapterData.previous.bookId} {BibleChapterData.previous.number}
				</Link>
			)}

			{BibleChapterData.next && (
				<Link
					href={`/biblia/libros/capitulos/versiculos/${BibleChapterData.bibleId}/${BibleChapterData.next.id}`}
					className="rounded-xl border border-orange-300 dark:border-gray-600 bg-orange-50 hover:bg-orange-100 dark:bg-gray-900 dark:hover:bg-gray-800 px-5 py-1 font-bold text-orange-700 dark:text-gray-50 flex items-center transition-all">
					{BibleChapterData.next.bookId} {BibleChapterData.next.number}
					<svg
						className="w-6 h-6 text-orange-700 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						viewBox="0 0 24 24">
						<path
							fillRule="evenodd"
							d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
							clipRule="evenodd"
						/>
					</svg>
				</Link>
			)}
		</nav>
	);
}