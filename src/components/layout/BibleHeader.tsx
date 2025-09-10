"use client";

import Link from "next/link";
import { isActive } from "@/helpers";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";

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
						"bg-orange-700 dark:bg-gray-800 px-4 py-2 rounded-t-2xl dark:text-gray-50"
					} px-4 py-2 bg-gray-500 rounded-t-2xl text-white dark:text-gray-50 text-sm md:text-base min-h-20 sm:min-h-16 lg:min-h-12 flex flex-col text-center items-center justify-around`}
					href="/biblia">
					<Image
						alt="Logo"
						width={100}
						height={100}
						src="/images/animated/static-bible-books.png"
						className="w-8 h-8 mr-0"
					/>
					Traducciones
				</Link>
				{bibleId && (
					<Link
						className={`${
							isActive(pathname, `/biblia/libros/${bibleId}`) &&
							"bg-orange-700 dark:bg-gray-800 px-4 py-2 rounded-t-2xl dark:text-gray-50"
						} px-4 py-2 bg-gray-500 rounded-t-2xl text-white dark:text-gray-50 text-sm md:text-base min-h-20 sm:min-h-16 lg:min-h-12 flex flex-col text-center items-center justify-around`}
						href={`/biblia/libros/${bibleId}`}>
						<Image
							alt="Logo"
							width={100}
							height={100}
							src="/images/animated/static-books.png"
							className="w-8 h-8 mr-0"
						/>
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
							"bg-orange-700 dark:bg-gray-800 px-4 py-2 rounded-t-2xl dark:text-gray-50"
						} px-4 py-2 bg-gray-500 rounded-t-2xl text-white dark:text-gray-50 text-sm md:text-base min-h-20 sm:min-h-16 lg:min-h-12 flex flex-col text-center items-center justify-around`}
						href={`/biblia/libros/capitulos/${bibleId}/${bookId}`}>
						<Image
							alt="Logo"
							width={100}
							height={100}
							src="/images/animated/static-chapters.png"
							className="w-8 h-8 mr-0"
						/>
						Capítulos
					</Link>
				)}
				{chapterId && (
					<Link
						className={`${
							isActive(
								pathname,
								`/biblia/libros/capitulos/versiculos/${bibleId}/${bookId}/${chapterId}`
							) &&
							"bg-orange-700 dark:bg-gray-800 px-4 py-2 rounded-t-2xl dark:text-gray-50"
						} px-4 py-2 bg-gray-500 rounded-t-2xl text-white dark:text-gray-50 text-sm md:text-base min-h-20 sm:min-h-16 lg:min-h-12 flex flex-col text-center items-center justify-around`}
						href={`/biblia/libros/capitulos/versiculos/${bibleId}/${bookId}/${chapterId}`}>
						<Image
							alt="Logo"
							width={100}
							height={100}
							src="/images/animated/static-reading.png"
							className="w-8 h-8 mr-0"
						/>
						Lectura
					</Link>
				)}
				{bibleId && (
					<Link
						className={`${
							isActive(pathname, `biblia/${bibleId}/buscar`) &&
							"bg-orange-700 dark:bg-gray-800 px-4 py-2 rounded-t-2xl dark:text-gray-50"
						} px-4 py-2 bg-gray-500 rounded-t-2xl text-white dark:text-gray-50 text-sm md:text-base min-h-20 sm:min-h-16 lg:min-h-12 flex flex-col text-center items-center justify-around`}
						href={`/biblia/${bibleId}/buscar`}>
						<Image
							alt="Logo"
							width={100}
							height={100}
							src="/images/animated/static-bible-search.png"
							className="w-8 h-8 mr-0"
						/>
						Buscar
					</Link>
				)}
			</nav>
		</header>
	);
}
