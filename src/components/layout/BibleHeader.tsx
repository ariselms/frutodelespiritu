"use client";

import Link from "next/link";
import { isActive } from "@/helpers";
import { useParams, usePathname } from "next/navigation";

export default function BibleHeader() {

  const params = useParams();
  const pathname = usePathname();

  // bible id, chapter id
	const { bibleId, bookId, chapterId } = params;

  console.log(bibleId, bookId, chapterId);

	return (
		<header className="bg-orange-200 dark:bg-gray-800 border-b-2 dark:border-b-3 border-orange-500 dark:border-gray-900">
			<div className="max-w-5xl mx-auto flex items-end justify-center gap-1 md:gap-2 lg:gap-4 pt-8 text-orange-50 dark:text-gray-300">
				<Link
					className={`${
						isActive(pathname, "/biblia") &&
						"bg-orange-500 dark:bg-gray-900 px-4 py-2 rounded-t-xl dark:text-gray-50"
					} px-4 py-2 bg-gray-500 rounded-t-xl text-white dark:text-gray-50 text-xs md:text-base`}
					href="/biblia">
					Versiones de la Biblia
				</Link>
				{bibleId && (
					<Link
						className={`${
							isActive(pathname, `/biblia/libros/${bibleId}`) &&
							"bg-orange-500 dark:bg-gray-900 px-4 py-2 rounded-t-xl dark:text-gray-50"
						} px-4 py-2 bg-gray-500 rounded-t-xl text-white dark:text-gray-50 text-xs md:text-base`}
						href={`/biblia/libros/${bibleId}`}>
						Libros
					</Link>
				)}
				{(bookId || chapterId) && (
					<Link
						className={`${
							isActive(
								pathname,
								chapterId
									? `/biblia/libros/capitulos/versiculos/${bibleId}/${chapterId}`
									: `/biblia/libros/capitulos/${bibleId}/${bookId}`
							) &&
							"bg-orange-500 dark:bg-gray-900 px-4 py-2 rounded-t-xl dark:text-gray-50"
						} px-4 py-2 bg-gray-500 rounded-t-xl text-white dark:text-gray-50 text-xs md:text-base`}
						href={`${
							chapterId
								? `/biblia/libros/capitulos/versiculos/${bibleId}/${chapterId}`
								: `/biblia/libros/capitulos/${bibleId}/${bookId}`
						}`}>
						{chapterId ? "Versiculos" : "Capítulos"}
					</Link>
				)}
				<Link
					className={`${
						isActive(pathname, "/biblia/buscar") &&
						"bg-orange-500 dark:bg-gray-900 px-4 py-2 rounded-t-xl dark:text-gray-50"
					} px-4 py-2 bg-gray-500 rounded-t-xl text-white dark:text-gray-50 text-xs md:text-base`}
					href="/biblia/buscar">
					Buscar por palabras claves
				</Link>
				<Link
					className={`${
						isActive(pathname, "/biblia/buscar/pasaje") &&
						"bg-orange-500 dark:bg-gray-900 px-4 py-2 rounded-t-xl dark:text-gray-50"
					} px-4 py-2 bg-gray-500 rounded-t-xl text-white dark:text-gray-50 text-xs md:text-base`}
					href="/biblia/buscar/pasaje">
					Buscar por pasajes
				</Link>
				{/* TODO: if the user is signed in, show notes */}
			</div>
		</header>
	);
}
