"use client";

import Link from "next/link";
import { isActive } from "@/helpers";
import { useParams, usePathname } from "next/navigation";

export default function BibleHeader() {

  const params = useParams();
  const pathname = usePathname();

  // bible id, chapter id
	const { bibleId, bookId, chapterId } = params;

	return (
		<header className="bg-orange-50 dark:bg-gray-900 border-b-4 dark:border-b-3 border-orange-700 dark:border-gray-800">
			<nav className="max-w-5xl mx-auto flex items-end justify-center gap-1 md:gap-2 lg:gap-4 pt-8 text-orange-50 dark:text-gray-300">
				<Link
					className={`${
						isActive(pathname, "/biblia") &&
						"bg-orange-700 dark:bg-gray-800 px-4 py-2 rounded-t-xl dark:text-gray-50"
					} px-4 py-2 bg-gray-500 rounded-t-xl text-white dark:text-gray-50 text-xs md:text-base min-h-20 sm:min-h-16 lg:min-h-12 flex items-end`}
					href="/biblia">
					Versiones de la Biblia
				</Link>
				{bibleId && (
					<Link
						className={`${
							isActive(pathname, `/biblia/libros/${bibleId}`) &&
							"bg-orange-700 dark:bg-gray-800 px-4 py-2 rounded-t-xl dark:text-gray-50"
						} px-4 py-2 bg-gray-500 rounded-t-xl text-white dark:text-gray-50 text-xs md:text-base min-h-20 sm:min-h-16 lg:min-h-12  flex items-end`}
						href={`/biblia/libros/${bibleId}`}>
						Libros
					</Link>
				)}
				{bookId && (
					<Link
						className={`${
							isActive(
								pathname,
								`/biblia/libros/capitulos/${bibleId}/${bookId}`
							) &&
							"bg-orange-700 dark:bg-gray-800 px-4 py-2 rounded-t-xl dark:text-gray-50"
						} px-4 py-2 bg-gray-500 rounded-t-xl text-white dark:text-gray-50 text-xs md:text-base min-h-20 sm:min-h-16 lg:min-h-12  flex items-end`}
						href={`/biblia/libros/capitulos/${bibleId}/${bookId}`}>
						Capítulos
					</Link>
				)}
				{chapterId && (
					<Link
						className={`${
							isActive(
								pathname,
								`/biblia/libros/capitulos/versiculos/${bibleId}/${chapterId}`
							) &&
							"bg-orange-700 dark:bg-gray-800 px-4 py-2 rounded-t-xl dark:text-gray-50"
						} px-4 py-2 bg-gray-500 rounded-t-xl text-white dark:text-gray-50 text-xs md:text-base min-h-20 sm:min-h-16 lg:min-h-12  flex items-end`}
						href={`/biblia/libros/capitulos/versiculos/${bibleId}/${chapterId}`}>
						Lectura
					</Link>
				)}
				<Link
					className={`${
						isActive(pathname, "/biblia/buscar") &&
						"bg-orange-700 dark:bg-gray-800 px-4 py-2 rounded-t-xl dark:text-gray-50"
					} px-4 py-2 bg-gray-500 rounded-t-xl text-white dark:text-gray-50 text-xs md:text-base min-h-20 sm:min-h-16 lg:min-h-12  flex items-end`}
					href="/biblia/buscar">
					Buscar en la Biblia
				</Link>
				{/* TODO: if the user is signed in, show notes */}
			</nav>
		</header>
	);
}
