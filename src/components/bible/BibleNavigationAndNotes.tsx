import Link from "next/link"

export function BibleNavigationAndNotes({BibleChapterData}: any) {
  return (
    <nav className="flex items-center justify-between mb-4 xl:-mb-10">
    {BibleChapterData.previous && (
      <Link
        href={`/biblia/libros/capitulos/versiculos/${BibleChapterData.bibleId}/${BibleChapterData.previous.id}`}
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
        {BibleChapterData.previous.bookId}{" "}
        {BibleChapterData.previous.number}
      </Link>
    )}

    {BibleChapterData.next && (
      <Link
        href={`/biblia/libros/capitulos/versiculos/${BibleChapterData.bibleId}/${BibleChapterData.next.id}`}
        className="rounded-xl border border-orange-400 dark:border-gray-600 bg-orange-100 dark:bg-gray-800 px-5 py-1 font-bold text-orange-700 dark:text-gray-50 flex items-center">
        {BibleChapterData.next.bookId} {BibleChapterData.next.number}
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
  )
}