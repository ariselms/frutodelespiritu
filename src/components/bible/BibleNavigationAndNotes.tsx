import Link from "next/link";
export function BibleNavigationAndNotes({
	BibleChapterData
}: {
	BibleChapterData: any;
}) {
	const previousChapterParams: string = BibleChapterData.previousChapterApiLink;
	const nextChapterParams = BibleChapterData.nextChapterApiLink;
	// 1. Clean the string by removing '/api/', leading '/', and '.json'
	const cleanedPrevPath =
		previousChapterParams &&
		previousChapterParams.replace(/^\/?api\/|\.json$/g, "");
	const cleanedNextPath =
		nextChapterParams && nextChapterParams.replace(/^\/?api\/|\.json$/g, "");
	// 2. Split the remaining string into an array by the '/'
	const prevParams = cleanedPrevPath && cleanedPrevPath.split("/");
	const nextParams = cleanedNextPath && cleanedNextPath.split("/");

	return (
		<nav className="flex items-center justify-between mb-6 last:mt-6 max-w-[80ch]">
			{previousChapterParams && (
				<Link
					href={`/biblia/libros/capitulos/versiculos/${prevParams[0]}/${prevParams[1]}/${prevParams[2]}`}
					className="rounded-2xl border border-orange-100 dark:border-gray-600 bg-orange-50 hover:bg-orange-100 dark:bg-gray-900 dark:hover:bg-gray-800 px-5 py-1 font-bold text-orange-700 dark:text-gray-50 flex items-center transition-all">
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
					{prevParams[1] !== BibleChapterData?.book?.id && prevParams[1]}{" "}
					{prevParams[2]}
				</Link>
			)}
			<h1 className="max-w-2xl text-3xl font-extrabold tracking-tight leading-none  text-orange-700 dark:text-white">
				{BibleChapterData?.book?.name} {BibleChapterData?.chapter?.number}
			</h1>
			{nextChapterParams && (
				<Link
					href={`/biblia/libros/capitulos/versiculos/${nextParams[0]}/${nextParams[1]}/${nextParams[2]}`}
					className="rounded-2xl border border-orange-300 dark:border-gray-600 bg-orange-50 hover:bg-orange-100 dark:bg-gray-900 dark:hover:bg-gray-800 px-5 py-1 font-bold text-orange-700 dark:text-gray-50 flex items-center transition-all">
					{nextParams[1] !== BibleChapterData?.book?.id && nextParams[1]}{" "}
					{nextParams[2]}
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
